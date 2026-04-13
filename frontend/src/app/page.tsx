"use client";
import Loader from "@/components/Loader";
import { getCurrentUser } from "@/lib/actions/auth-actions";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async() => {
    try {
      const {data, error} = await supabase.auth.getUser();
      if(error){
        toast.error(error.message);
        setUser(null);
      } else {
        setUser(data.user)
      }
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if(loading) return <Loader />
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100">
      <div className="max-w-3xl px-6 text-center text-gray-900">
        {/* App Name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          AI Study Companion
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Organize your subjects, store notes & PDFs, and use AI to summarize,
          revise, and understand concepts more effectively.
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-300 rounded-xl p-5 shadow">
            📚
            <span className="block mt-3 font-semibold text-gray-800">
              Subject-wise Notes & PDFs
            </span>
          </div>

          <div className="bg-white border border-gray-300 rounded-xl p-5 shadow">
            🤖
            <span className="block mt-3 font-semibold text-gray-800">
              AI-powered Summaries
            </span>
          </div>

          <div className="bg-white border border-gray-300 rounded-xl p-5 shadow">
            ⚡
            <span className="block mt-3 font-semibold text-gray-800">
              Smart & Fast Revision
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-3 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-8 py-3 rounded-lg border border-indigo-700 text-indigo-700 font-semibold hover:bg-indigo-200 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
        {user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition"
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}