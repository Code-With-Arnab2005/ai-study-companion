import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const doc_id = searchParams.get("id") || null;

        if (!doc_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document Id not found"
                },
                { status: 400 }
            )
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from("documents")
            .select("*")
            .eq("id", doc_id)
            .single();

        if (error) {
            console.log("supabase error: ", error);
            return NextResponse.json(
                {
                    success: false,
                    message: error.message ?? "Something went wrong"
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "Document Fetched Successfully",
                data: data
            },
            { status: 200 }
        )
    } catch (err: any) {
        console.error("Get Document By ID Route Error:", err?.message || err);
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