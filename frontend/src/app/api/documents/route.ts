import { createClient } from "@/lib/supabase/server";
import axios from "../../../lib/axios";
import { NextRequest, NextResponse } from "next/server";

const getToken = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("getToken Function Error: ", error.message);
    return null;
  }
  return data.session?.access_token;
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken();
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Acess Token is missing",
      });
    }
    
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "5";

    const res = await axios.get(`/get-paginated-documents?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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
    console.error("Documents Route Error:", err?.message || err);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}