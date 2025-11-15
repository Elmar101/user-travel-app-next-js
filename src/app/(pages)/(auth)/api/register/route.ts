import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, username, password, firstName, lastName } = body;

    if (!email || !username || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const existingUser = await prismadb.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with provided email or username already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        username,
        photo: "",
        firstName,
        lastName,
        hashedPassword, // Save hashed password in the database
      },
    });

    return NextResponse.json(user || {}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
