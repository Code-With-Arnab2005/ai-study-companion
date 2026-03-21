"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SignupError } from "@/types";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createUser } from "@/lib/actions/auth-actions";
import { Spinner } from "@/components/ui/spinner";

export default function CompleteProfilePage() {
    const [id, setId] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

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

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            return;
        }

        //signup with supabase
        try {
            // store into users table
            const res = await createUser({ id, fullname, email, course });
            if (!res?.data) {
                toast.error("Something went wrong, please try again later");
                return;
            }
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            }
            toast.success("Profile Completed successfully");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchUserIdAndEmail = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            toast.error(error.message);
            return;
        }

        const id = data.user?.id;
        const email = data.user.email;

        if (!id || !email) {
            toast.error("Failed to get user ID");
            return;
        }

        setId(id);
        setEmail(email);
    }

    useEffect(() => {
        fetchUserIdAndEmail();
    }, [])

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 py-8">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow px-8 py-6">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                    Welcome to AI Study Companion
                </h1>
                <p className="text-gray-600 text-center mb-6 text-sm">
                    Complete your profile
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
                            disabled={true}
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

                    {/* Button */}
                    {loading ? <Spinner /> : (
                        <button
                            type="submit"
                            className="w-full mt-2 py-2.5 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition"
                        >
                            Complete
                        </button>
                    )}
                </form>
            </div>
        </main>
    );
}
