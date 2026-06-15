import { NextRequest, NextResponse } from "next/server";
import axios from "../../../../lib/axios";
import { getToken } from "@/lib/getToken";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
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
        const id = searchParams.get("id") || null;
        const is_public = searchParams.get("is_public") == "true";

        if(!id){
            return NextResponse.json({
                success: false,
                message: "Document ID not found"
            }, { status: 400 });
        }

        const supbase = await createClient();

        const { error } = await supbase
            .from("documents")
            .update({ is_public: !is_public })
            .eq("id", id)

        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Visibility Change for this document"
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("Change Visibility Route Error:", err?.message || err);
        console.error("Response:", err?.response?.data);

        return NextResponse.json(
            {
                success: false,
                message: err?.response?.data?.message || err?.message || "Something went wrong",
            },
            { status: 500 }
        );
    }
}