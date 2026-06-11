import { getToken } from "@/lib/getToken";
import axios from "../../../../lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken(req);
        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Acess Token is missing",
            });
        }

        const { searchParams } = new URL(req.url);
        const link_id = searchParams.get("link_id") || null

        const { link_name, url, description } = await req.json();

        const res = await axios.post(
            `/update-link-by-id?id=${link_id}`,
            {
                link_name,
                url,
                description
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (!res.data.success) {
            return NextResponse.json({
                success: false,
                message: res.data.message,
            });
        }
        return NextResponse.json({
            success: true,
            message: res.data.message,
            data: res.data.data,
        });

    } catch (err: any) {
        console.error("Update Link Route Error:", err?.message || err);
        console.log(err?.response?.data?.message ?? "Something went wrong");

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}