import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");

    const filters: {name?: string; pricePerNight?: {gte?: number; lte?: number;}} []= [];

    if (name) {
        filters.push({name});
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

    

    try {
        const trips = await prismadb.trip.findMany({
            where: filters.length === 0 ? {} : {
                AND: filters,
            }, 
            include: {
                tripHotels: true,
            },
        });
        return NextResponse.json(trips, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
