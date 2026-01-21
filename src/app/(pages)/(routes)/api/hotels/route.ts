import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const rating = searchParams.get("rating");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");

    const filters: {rating?: {gte?: number}; pricePerNight?: {gte?: number; lte?: number;}} [] = [];

    if (rating) {
        filters.push({rating: {gte: Number(rating)}});
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
        const hotels = await prismadb.hotel.findMany({
            where: filters.length === 0 ? {} : {
                AND: filters,
            }, 
            include: {
                rooms: true,
            },
        });
        return NextResponse.json(hotels, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
