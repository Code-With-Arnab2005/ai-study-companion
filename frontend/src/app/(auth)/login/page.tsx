"use client";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/supabase/client";
import { LoginError } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginError>({});

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const newErrors: LoginError = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!password.trim() || password.length < 6) {
            newErrors.password = "Password should be min 6 characters long";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0){
            setLoading(false);
            return;
        }
        
        //login with supabase
        try {
            const { data, error } = await supabase.auth.signInWithPassword({email, password});
            if(error){
                toast.error(error.message);
                return;
            }
            toast.success("Login successfully");
            router.push("/dashboard");
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
                    Welcome Back
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Login to continue your study workspace
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

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Button */}
                    {loading ? <Spinner /> : (
                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition"
                        >
                            Login
                        </button>
                    )}
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-indigo-700 font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
}
