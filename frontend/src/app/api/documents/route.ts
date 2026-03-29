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
  console.log("getToken: ", data);
  return data.session?.access_token;
}

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    console.log("fetching");
    // const res = await fetch(`${url}/api/get-documents-by-filtered-types`);
    // const data = await res.json();

    const token = await getToken();
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Acess Token is missing",
      });
    }

    const res = await axios.get(`/get-documents-by-filtered-types`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("documents route:", res.data);

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