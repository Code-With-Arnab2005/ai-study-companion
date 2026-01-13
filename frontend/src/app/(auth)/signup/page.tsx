"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SignupError, User } from "@/types";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { createClient } from "@/lib/supabase/client";
import { createUser, userExitsts } from "@/lib/actions/auth-actions";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState<SignupError>({});

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const newErrors: SignupError = {};

        if (!fullname.trim()) {
            newErrors.fullname = "Fullname is required";
        }
        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!course) {
            newErrors.course = "Course is required";
        }
        if (!password.trim() || password.length < 6) {
            newErrors.password = "Password should be min 6 characters long";
        } else if (password !== confirmPassword) {
            newErrors.password = "Password didnot match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0){
            setLoading(false);
            return;
        }

        //signup with supabase
        try {
            //first signup the user using supabase auth, then create user account using the auth.uid()
            const isUserExist = await userExitsts(email);
            if(isUserExist){
                toast.error("User already exists, please try another email");
            }
            
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            });
            if (error) {
                toast.error(error.message);
                return;
            }
            
            // store into users table
            const id = data.user?.id;
            if (!id) {
                toast.error("Failed to get user ID");
                return;
            }
            
            const res = await createUser({ id, fullname, email, course });
            if(!res?.data){
                toast.error("Something went wrong, please try again later");
                return;
            }
            if(!res.data.success){
                toast.error(res.data.message);
                return;
            }
            toast.success("Signed up successfully, Please verify your email");
            router.push("/verify-email");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 py-8">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow px-8 py-6">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                    Join AI Study Companion
                </h1>
                <p className="text-gray-600 text-center mb-6 text-sm">
                    Create a new account
                </p>

                {/* Form */}
                <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                    {/* Fullname */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 text-black"
                        />
                        {errors.fullname && (
                            <p className="text-sm text-red-600 mt-1">{errors.fullname}</p>
                        )}
                    </div>

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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 text-black"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course
                        </label>
                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 text-black"
                        >
                            <option value="" disabled>
                                Select your program
                            </option>
                            <option value="btech">B.Tech</option>
                            <option value="bca">BCA</option>
                            <option value="mca">MCA</option>
                            <option value="mba">MBA</option>
                            <option value="bsc">B.Sc</option>
                            <option value="msc">M.Sc</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.course && (
                            <p className="text-sm text-red-600 mt-1">{errors.course}</p>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 text-black"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 text-black"
                        />
                    </div>

                    {/* Button */}
                    {loading ? <Spinner /> : (
                        <button
                            type="submit"
                            className="w-full mt-2 py-2.5 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition"
                        >
                            Sign Up
                        </button>
                    )}
                </form>

                {/* Footer */}
                <div className="mt-5 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-indigo-700 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
}
