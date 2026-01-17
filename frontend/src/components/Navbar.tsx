"use client";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import toast from "react-hot-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";

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
                        href="/ai-sessions"
                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                    >
                        AI Session
                    </a>
                </nav>

                {/* Dropdown menu */}
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-gray-800 hover:cursor-pointer">
                            <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                                A
                            </div>
                            Arnab
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-48 min-w-48 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg p-1"
                    >
                        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-gray-500">
                            My Account
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="bg-gray-200 my-1" />

                        <Link href={`/profile`}>
                            <DropdownMenuItem className="px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-indigo-600 transition">
                                Profile
                            </DropdownMenuItem>
                        </Link>

                        <Link href={`/dashboard`}>
                            <DropdownMenuItem className="px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-indigo-600 transition">
                                Dashboard
                            </DropdownMenuItem>
                        </Link>

                        <Link href={`/subjects`}>
                            <DropdownMenuItem className="px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-indigo-600 transition">
                                Subjects
                            </DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator className="bg-gray-200 my-1" />

                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="px-3 py-2 rounded-lg text-sm text-red-600 cursor-pointer hover:bg-red-50 transition"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Navbar;