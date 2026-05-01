import { createClient } from "@/lib/supabase/server";
import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/lib/getToken";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken(req);
        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Acess Token is missing",
            });
        }

        const res = await axios.get(
            "/get-documents-by-filtered-types",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (!res.data.success) {
            return NextResponse.json({
                success: false,
                message: res.data.message
            })
        }

        return NextResponse.json({
            success: true,
            message: res.data.message,
            data: res.data.data
        })
    } catch (err: any) {
        console.error("Documents Route Error:", err?.message || err);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            }
        );
    }
}