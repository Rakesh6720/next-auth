import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        // check if email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email
            }
        });

        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "User with this email already exists."
            },
                { status: 409 });
        }

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username
            }
        });

        if (existingUserByUsername) {
            return NextResponse.json({
                user: null,
                message: "User with this username already exists."
            }, { status: 409 })
        }

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password
            }
        });

    } catch (err) {

    }
}