"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, DollarSign, Users, X } from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const filterSchema = z.object({
  name: z.string().optional(),
  priceMin: z.string().optional(),
  priceMax: z.string().optional(),
  seats: z.string().optional(),
  dateRange: z.object({
    from: z.union([z.date(), z.undefined()]),
    to: z.union([z.date(), z.undefined()]).optional(),
  }),
});

export type FilterValues = z.infer<typeof filterSchema>;

function DatePickerWithRange({ date, setDate }: { date: DateRange; setDate: (date: DateRange) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date.from ?? new Date()}
          selected={date}
          onSelect={(range) => setDate(range || { from: undefined, to: undefined })}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

export default function RentacarFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: searchParams.get("name") ?? "",
      seats: searchParams.get("seats") ?? "",
      priceMin: searchParams.get("priceMin") ?? "",
      priceMax: searchParams.get("priceMax") ?? "",
      dateRange: {
        from: searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined,
        to: searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined,
      },
    },
  });

  function onSubmit(values: FilterValues) {
    const params = new URLSearchParams();
    if (values.name?.trim()) params.set("name", values.name.trim());
    if (values.priceMin?.trim()) params.set("priceMin", values.priceMin.trim());
    if (values.priceMax?.trim()) params.set("priceMax", values.priceMax.trim());
    if (values.seats && values.seats !== "0") params.set("seats", values.seats);
    if (values.dateRange.from) params.set("startDate", format(values.dateRange.from, "yyyy-MM-dd"));
    if (values.dateRange.to) params.set("endDate", format(values.dateRange.to, "yyyy-MM-dd"));
    router.push(`/rent-a-cars?${params.toString()}`);
  }

  function onClear() {
    form.reset({
      name: "",
      seats: "",
      priceMin: "",
      priceMax: "",
      dateRange: { from: undefined, to: undefined },
    });
    router.push("/rent-a-cars");
  }

  return (
    <Card className="p-4 md:p-6 shadow-sm border border-gray-200/60">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Filter</h3>
        <Button type="button" variant="outline" size="sm" onClick={onClear} className="gap-2">
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Name (search) */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                  <FormControl>
                    <Input
                      placeholder="e.g., Corolla"
                      className="pl-9"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price Min */}
          <FormField
            control={form.control}
            name="priceMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Min</FormLabel>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="min"
                      className="pl-9"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price Max */}
          <FormField
            control={form.control}
            name="priceMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Max</FormLabel>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="max"
                      className="pl-9"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Seats */}
          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seats</FormLabel>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="pl-9">
                        <SelectValue placeholder="choose seats" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Bütün</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Date Range */}
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    date={field.value as DateRange}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Actions */}
          <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-end gap-2 mt-2">
            <Button type="button" variant="outline" onClick={onClear}>
              Clear
            </Button>
            <Button type="submit" className="bg-gray-950 hover:bg-gray-800 text-white">
              Apply Filters
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}