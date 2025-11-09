"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from 'next/navigation'
import { ITrip } from '../../hotels/models'

const filterSchema = z.object({
name: z.string().min(3, "At least 3 chars").or(z.literal("")).optional(),

    priceMin: z.string().optional(),
    priceMax: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;


const TripList = () => {
    const [trips, setTrips] = useState<ITrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const form = useForm<FilterValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            name: "",
            priceMin: "",
            priceMax: "",
        },
    });

    const fetchTrips = (filters: FilterValues = {}) => {
        setLoading(true);
        setError(false);
        let url = "/api/trips";
        const params = new URLSearchParams();

        if (filters.name) params.append("name", filters.name);
        if (filters.priceMin) params.append("priceMin", filters.priceMin);
        if (filters.priceMax) params.append("priceMax", filters.priceMax);

        url += "?" + params.toString();

        

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setTrips(data);
                setLoading(false);
            })
            .catch((err) => {
                
                setError(true);
                setLoading(false);
            });

    }


   useEffect(() => {
        const filters: FilterValues = {
            name: searchParams.get("name") || "",
            priceMin: searchParams.get("priceMin") || "",
            priceMax: searchParams.get("priceMax") || "",
          };
        form.reset(filters);
        fetchTrips(filters);
    }, [searchParams]);


    function onSubmit(values: FilterValues) {
        const params = new URLSearchParams();
        if (values.name) params.set("name", values.name);
        if (values.priceMin) params.set("priceMin", values.priceMin);
        if (values.priceMax) params.set("priceMax", values.priceMax);

        router.push(`/trips?${params.toString()}`);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Trips</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priceMin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price Min</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Minimum price"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priceMax"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price Max</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Maximum price"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <Button type="submit" className='bg-gray-950 hover:bg-gray-800 cursor-pointer text-white'>Submit</Button>
                </form>
            </Form>
            {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <Skeleton key={index} className='h-72 w-full rounded-lg bg-gray-100' />
                                ))}
                            </div>
                        )}

            {error && (
                <div className="text-center text-red-500 font-semibold">
                    Something went wrong
                </div>
            )}

            {!loading && !error && trips.length ===0 &&(
                 <div className="text-center text-blue-500 font-semibold">
          No trips found.
          </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trips.map((trip) => (
                        <Card key={trip.id} className="shadow-md">
                            <CardHeader>
                                <img
                                    src={trip.photos[0]}
                                    alt={trip.name}
                                    className="w-full h-48 object-cover rounded"
                                />
                                <CardTitle className="text-lg font-semibold mt-2">{trip.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-gray-700">Price: {trip.totalPrice} {trip.currency}</p>

                                <p className="text-gray-700">Hotels: {trip?.tripHotels?.map((hotel) => hotel.hotelName).join(", ")}</p>
                                <p className="text-sm text-gray-500">{trip.location}</p>
                            </CardContent>
                        </Card>

                    ))}
                </div>
            )}




        </div>
    )
}

export default TripList