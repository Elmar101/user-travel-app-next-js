import { prismadb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const rating = searchParams.get("rating");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");

    try {
        const hotels = await prismadb.hotel.findMany({
            include: {
                rooms: true,
            },
        });
        return NextResponse.json(hotels, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
