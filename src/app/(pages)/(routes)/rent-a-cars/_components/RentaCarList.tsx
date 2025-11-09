"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useRentaCarStore } from "@/store/rent-a-car-store/rentaCarStore";
import RentacarFilter, { FilterValues } from "./RentacarFilter";

const RentaCarList = () => {
  const { cars, loading, error, fetchCars } = useRentaCarStore();

  const searchParams = useSearchParams();

  useEffect(() => {
    const filters: FilterValues = {
      name: searchParams.get("name") || "",
      seats: searchParams.get("seats") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
      dateRange: { from: undefined, to: undefined },
    };

    const queryParams: Record<string, string> = {
      name: filters.name || "",
      seats: filters.seats || "",
      priceMin: filters.priceMin || "",
      priceMax: filters.priceMax || "",
      dateFrom: filters.dateRange.from ? filters.dateRange.from.toISOString() : "",
      dateTo: filters.dateRange.to ? filters.dateRange.to.toISOString() : "",
    };
    fetchCars(queryParams);
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rent a Car </h1>

      <RentacarFilter />
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-72 w-full rounded-lg bg-gray-100"
            />
          ))}
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 font-semibold">
          Something went wrong
        </div>
      )}

      {!loading && !error && cars.length === 0 && (
        <div className="text-center text-blue-500 font-semibold">
          No cars found.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <Card key={car.id} className="shadow-md">
              <CardHeader>
                <img
                  src={car.photos[0]}
                  alt={car.name}
                  className="w-full h-62 object-cover rounded"
                />
                <CardTitle className="text-lg font-semibold mt-2">
                  {car.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Price Per Day: {car.pricePerDay}
                  {car?.currency}{" "}
                </p>

                <p className="text-gray-700">Model: {car?.model}</p>
                <p className="text-sm text-gray-500">Brand: {car.brand}</p>
                <p className="text-sm text-gray-500">
                  Fuel Type: {car.fuelType}
                </p>
                <p className="text-sm text-gray-500">Seats: {car.seats}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentaCarList;
