import { getToken } from "@/lib/getToken";
import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken(req);
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Acess Token is missing",
                },
                { status: 400 }
            );
        }

        const res = await axios.get(
            "/get-count-of-subjects",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )

        if (!res.data.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: res.data.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: res.data.message,
                data: res.data.count,
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("Subjects Count Route Error:", err?.message || err);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}