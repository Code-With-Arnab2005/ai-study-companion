"use client";
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // 🚨 Prevent hydration mismatch
    // if (!mounted) return null;
    // const { resolvedTheme } = useTheme();
    // const isDark = resolvedTheme === "dark";

    return (
        <main 
            // className={`
            //     min-h-screen mt-15
            //     ${isDark 
            //         ? "text-white" 
            //         : "bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 [&_p]:text-gray-600 [&_h1]:text-gray-900"}
            // `}
            className="min-h-screen mt-15 [background:var(--background)] text-foreground"
        >
            <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                {children}
            </section>
        </main>
    )
}

export default PageWrapper;
