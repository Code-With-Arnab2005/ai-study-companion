import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const getToken = async (req: NextRequest) => {
    // Try Authorization Header for Postman / API Clients
    const authHeader = req.headers.get("authorization");

    if(authHeader && authHeader.startsWith("Bearer ")){
        const token = authHeader.split(" ")[1];
        return token;
    }

    // Fallback to Supabase session (Browser)
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("getToken Function Error: ", error.message);
        return null;
    }
    return data.session?.access_token;
}