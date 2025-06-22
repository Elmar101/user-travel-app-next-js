"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IHotel } from '../models'

const filterSchema = z.object({
    rating: z.string().optional(),
    priceMin: z.string().optional(),
    priceMax: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;


const HotelList = () => {
    const [hotels, setHotels] = useState<IHotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const form = useForm<FilterValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            rating: "",
            priceMin: "",
            priceMax: "",
        },
    });

    const fetchHotels = (filters: FilterValues = {}) => {
        setLoading(true);
        setError(false);
        let url = "/api/hotels";
        const params = new URLSearchParams();

        if (filters.rating) params.append("rating", filters.rating);
        if (filters.priceMin) params.append("priceMin", filters.priceMin);
        if (filters.priceMax) params.append("priceMax", filters.priceMax);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setHotels(data);
                setLoading(false);
            })
            .catch((err) => {
                
                setError(true);
                setLoading(false);
            });

    }


    useEffect(() => {
        fetchHotels();
    }, []);


    function onSubmit(values: FilterValues) {
        fetchHotels(values);
    }


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Hotels</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 4.5"
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

            {!loading && !error && hotels.length ===0 &&(
                 <div className="text-center text-blue-500 font-semibold">
          No hotels found.
          </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotels.map((hotel) => (
                        <Card key={hotel.id} className="shadow-md">
                            <CardHeader>
                                <img
                                    src={hotel.photos[0]}
                                    alt={hotel.name}
                                    className="w-full h-48 object-cover rounded"
                                />
                                <CardTitle className="text-lg font-semibold mt-2">{hotel.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-gray-700">{hotel.rating} *</p>

                                <p className="text-gray-700">{hotel.description}</p>
                                <p className="text-sm text-gray-500">{hotel.location}</p>
                                <p className="text-lg font-bold">${hotel.pricePerNight} / night</p>
                            </CardContent>
                        </Card>

                    ))}
                </div>
            )}




        </div>
    )
}

export default HotelList