import { getToken } from "@/lib/getToken";
import { NextRequest, NextResponse } from "next/server";
import axios from "../../../../lib/axios";

export async function DELETE(req: NextRequest) {
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

        const { searchParams } = new URL(req.url);
        const link_id = searchParams.get("link_id") || null;

        const res = await axios.delete(
            `delete-link-by-id?link_id=${link_id}`,
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
        console.error("Delete Link Route Error:", err?.message || err);
        console.error("Response:", err?.response?.data);

        return NextResponse.json(
            {
                success: false,
                message: err?.response?.data ?? "Something went wrong",
            },
            { status: 500 }
        );
    }
}