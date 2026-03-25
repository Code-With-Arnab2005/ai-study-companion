"use client";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { Spinner } from "@/components/ui/spinner";
import { sendMail } from "@/lib/actions/auth-actions";
import { createClient } from "@/lib/supabase/client";
import { forgotPasswordError, LoginError, updatePasswordError } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function updatePasswordPage() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<forgotPasswordError>({});

    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const [seconds, setSeconds] = useState<number>(15);

    const router = useRouter();

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (!cooldown) return;

        if (seconds === 0) {
            setCooldown(false);
            return;
        }

        const interval = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown, seconds]);

    const handleSubmit = async (e: any) => {
        setLoading(true);
        setCooldown(true);
        setSeconds(15);

        e.preventDefault();
        const newErrors: forgotPasswordError = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            setCooldown(false);
            return;
        }

        // redirect to update-password page
        try {
            const res = await sendMail(email);
            if (!res?.data) {
                toast.error("Something went wrong, please try again later");
                return;
            }
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            }
            toast.success("Please check your mail");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow p-8">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    Forgot Password
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Enter your mail id
                </p>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        disabled={cooldown}
                        type="submit"
                        className={`${cooldown ? "cursor-not-allowed bg-indigo-800" : "bg-indigo-700 hover:bg-indigo-800"} w-full py-2.5 rounded-lg  text-white font-semibold transition`}
                    >
                        {loading ? <Spinner className="w-full"/>
                            : cooldown ? `${formatTime(seconds)}`
                                : "Send Mail"
                        }
                    </button>
                </form>
            </div>
        </main>
    );
}
