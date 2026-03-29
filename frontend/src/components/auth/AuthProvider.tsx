"use client";
import { createClient } from '@/lib/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = createClient();
    const router = useRouter();
    const pathname = usePathname();

    const authRoutes = ["/login", "/signup", "/verify-email", "/forgot-password"];
    const publicRoutes = ["/update-password", "/"];
    const isPublicRoute = publicRoutes.some(route => pathname === route);
    const isAuthRoute = authRoutes.some(route => pathname === route);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log(session?.access_token)
            if(isAuthRoute && session?.user){
                router.push("/dashboard");
            } else if(!isPublicRoute && !session?.user){
                router.push("/login");
            }
        })

        return () => {
            listener.subscription.unsubscribe();
        }
    }, [])

    return (
        <>{children}</>
    )
}

export default AuthProvider;
