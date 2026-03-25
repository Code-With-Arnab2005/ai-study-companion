"use client";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/supabase/client";
import { updatePasswordError } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function updatePasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<updatePasswordError>({});

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleAuth = async () => {
            // const { data: authencated }= await supabase.auth.getSession();
            // if(authencated.session) return;

            const hash = window.location.hash;

            if (!hash) return;

            const params = new URLSearchParams(hash.substring(1));

            const access_token = params.get("access_token");
            const refresh_token = params.get("refresh_token");

            if (access_token && refresh_token) {
                await supabase.auth.setSession({
                    access_token,
                    refresh_token,
                });
            }
        };

        handleAuth();
    }, []);

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const newErrors: updatePasswordError = {};

        if (!password.trim()) {
            newErrors.password = "Email is required";
        }

        if(!confirmPassword.trim()){
            newErrors.confirmPassword = "Please confirm your password";
        }

        if(confirmPassword !== password){
            toast.error("Passwords did not match");
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            return;
        }

        // update password
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: password
            })
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Password updated successfully");
                router.push("/dashboard");
            }
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
                    Update Password
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    update your password
                </p>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Button */}
                    {loading ? <Spinner /> : (
                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition"
                        >
                            Update Password
                        </button>
                    )}
                </form>
            </div>
        </main>
    );
}
