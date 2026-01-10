"use client";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import toast from "react-hot-toast";

const Navbar = () => {
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success("Logout successful");
    }
    return (
        <header className="w-full fixed top-0 bg-white border-b border-gray-200 px-8 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Left: Logo + Brand */}
                <Link href={"/"}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                            AI
                        </div>
                        <span className="text-xl font-semibold text-gray-900">
                            AI Study Companion
                        </span>
                    </div>
                </Link>

                {/* Center: Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="/dashboard"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                    >
                        Dashboard
                    </a>
                    <a
                        href="/subjects"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                    >
                        Subjects
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                    >
                        Progress
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                    >
                        Resources
                    </a>
                </nav>

                {/* Right: User Profile */}
                <div className="flex items-center gap-3">
                    <Link href={"/profile"}>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
                            <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                                A
                            </div>
                            <span className="text-sm text-gray-800 font-medium">
                                Arnab
                            </span>
                        </div>
                    </Link>

                    <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;