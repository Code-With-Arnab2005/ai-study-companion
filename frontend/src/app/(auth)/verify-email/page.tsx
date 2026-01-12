"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const router = useRouter();

    const resendEmail = async () => {
        // try {
        //     const { error } = await supabase.auth.resend({
        //         type: "signup",
        //         email;
        //     })
        // } catch (error) {
        //     toast.error("Something went wrong, please try again later");
        // }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100 px-4">
            <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow px-8 py-10 text-center">

                {/* Icon */}
                <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-2xl">
                    📧
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Verify your email
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                    We’ve sent a verification link to your email address.
                    Please check your inbox and click the link to activate your account.
                </p>

                {/* Info box */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-800 mb-6">
                    Didn’t receive the email?
                    Check your spam folder or resend the verification email.
                </div>

                {/* Primary action */}
                <button
                    onClick={resendEmail}
                    className="w-full py-2.5 rounded-lg bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition hover:cursor-pointer"
                >
                    Resend verification email
                </button>

                {/* Secondary action */}
                <Link
                    href={"/login"}
                    className="mt-4 text-sm text-indigo-700 hover:underline"
                >
                    Back to login
                </Link>

                {/* Status text */}
                <p className="mt-6 text-xs text-gray-500">
                    Waiting for email verification…
                </p>

            </div>
        </main>
    );
}
