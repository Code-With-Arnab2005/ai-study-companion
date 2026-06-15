
import { createClient } from "@supabase/supabase-js";
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


        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY!
        );

        const { data: doc, error: doc_error } = await supabase
            .from("documents")
            .select("doc_url, is_public")
            .eq("id", doc_id)
            .single();

        if (doc_error) {
            return NextResponse.json(
                {
                    success: false,
                    message: doc_error.message ?? "Something went wrong"
                },
                { status: 500 }
            )
        }

        // check if the document is public or not
        if (!doc.is_public) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document is private"
                },
                { status: 403 }
            );
        }

        const { data: signedUrlData, error } = await supabase.storage
            .from("documents")
            .createSignedUrl(String(doc.doc_url), 60 * 60) // 1 hour

        if (error) {
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
                data: signedUrlData.signedUrl
            },
            { status: 200 }
        )
    } catch (err: any) {
        console.error("Create Signed URL Route Error:", err?.message || err);
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