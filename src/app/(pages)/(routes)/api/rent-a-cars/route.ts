import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const seats = searchParams.get("seats");
    ('seats', seats);
    
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    ('priceMin', priceMin);
    ('priceMax', priceMax);


    const filters: {name?: string; seats?: {equals?: number}; pricePerNight?: {gte?: number; lte?: number;}} []= [];
 
    if (name) {
        filters.push({name});
    }
    if (seats) {
        filters.push({seats: {equals: Number(seats)}});
    }
    
    if (priceMin || priceMax) {
        const priceFilter: {gte?: number; lte?: number} = {};

        if (priceMin) {
            priceFilter.gte = Number(priceMin);
        }

        if (priceMax) {
            priceFilter.lte = Number(priceMax);
        }
        filters.push({pricePerNight: priceFilter});
    }
   ('filters', filters);
    try {
        const trips = await prismadb.rentaCar.findMany({
            where: filters.length === 0 ? {} : {
                AND: filters,
            }, 
            include: {
                regionLinks: {
                    include: {
                        region: true,
                    },
                },
            },
        });
        return NextResponse.json(trips, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
