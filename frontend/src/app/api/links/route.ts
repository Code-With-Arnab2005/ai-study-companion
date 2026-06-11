import { createClient } from "@/lib/supabase/server";
import axios from "../../../lib/axios";
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

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "5";
    const timeRange = searchParams.get("timeRange") || "ALL";
    const searchFilter = searchParams.get("searchFilter") || "";
    
    const res = await axios.get(
      `/get-all-paginated-links?page=${page}&limit=${limit}&timeRange=${timeRange}&searchFilter=${searchFilter}`,
      {
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
    console.error("Links Route Error:", err?.message || err);
    console.log(err?.response?.message ?? "Something went wrong");

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}