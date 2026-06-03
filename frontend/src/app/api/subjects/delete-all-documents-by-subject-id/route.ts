import { getToken } from "@/lib/getToken";
import axios from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

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
        const subject_id = searchParams.get("subject_id") || null;

        const res = await axios.delete(
            `delete-documents-by-subject-id?subject_id=${subject_id}`,
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
        console.error("Delete All Documents Route Error:", err?.message || err);
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