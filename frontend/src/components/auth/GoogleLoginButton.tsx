import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";

const GoogleLoginButton = () => {

    const supabase = createClient();
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/auth/callback`,
            },
        })
    }

    return (
        <Button
            onClick={handleGoogleLogin}
            className="mt-5 hover:cursor-pointer w-full flex items-center justify-center gap-3 rounded-lg border border-slate-300
             bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm
             hover:bg-slate-50 active:bg-slate-100 transition
             focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
            {/* Google SVG */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.04 6.24C12.47 13.27 17.77 9.5 24 9.5z"
                />
                <path
                    fill="#4285F4"
                    d="M46.5 24.5c0-1.57-.14-3.09-.4-4.5H24v8.51h12.7c-.55 2.96-2.2 5.47-4.68 7.18l7.16 5.55C43.44 37.36 46.5 31.42 46.5 24.5z"
                />
                <path
                    fill="#FBBC05"
                    d="M10.6 28.46A14.5 14.5 0 019.5 24c0-1.55.27-3.05.77-4.46l-8.04-6.24A23.99 23.99 0 000 24c0 3.87.93 7.52 2.56 10.78l8.04-6.32z"
                />
                <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.92-2.14 15.9-5.76l-7.16-5.55c-1.99 1.34-4.53 2.13-8.74 2.13-6.23 0-11.53-3.77-13.4-9.04l-8.04 6.32C6.51 42.62 14.62 48 24 48z"
                />
            </svg>

            Continue with Google
        </Button>

    )
}

export default GoogleLoginButton;
