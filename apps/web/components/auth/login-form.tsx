"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setLoading("google");
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleLinkedIn = async () => {
    setLoading("linkedin");
    await signIn("linkedin", { callbackUrl: "/dashboard" });
  };

  const handleEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    setError("");
    try {
      const res = await signIn("nodemailer", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res?.error) { setError("Failed to send OTP. Try again."); }
      else { setOtpSent(true); }
    } finally {
      setLoading(null);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("otp");
    router.push(`/verify?email=${encodeURIComponent(email)}&token=${otp}`);
  };

  return (
    <div className="space-y-4">
      {/* Social logins */}
      <button
        onClick={handleGoogle}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {loading === "google" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        Continue with Google
      </button>

      <button
        onClick={handleLinkedIn}
        disabled={!!loading}
        className="w-full flex items-center justify-center gap-3 bg-[#0A66C2] hover:bg-[#004182] rounded-xl py-3 text-sm font-medium text-white transition-colors disabled:opacity-50"
      >
        {loading === "linkedin" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )}
        Continue with LinkedIn
      </button>

      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs text-gray-400">or continue with email</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {!otpSent ? (
        <form onSubmit={handleEmailOtp} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={!!loading}
            className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading === "email" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerify} className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the 6-digit code sent to <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span>
          </p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            required
            className="w-full text-center tracking-[0.5em] py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-lg font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
          <button
            type="submit"
            disabled={otp.length < 6 || loading === "otp"}
            className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading === "otp" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Verify & Sign in
          </button>
          <button
            type="button"
            onClick={() => setOtpSent(false)}
            className="w-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← Back
          </button>
        </form>
      )}
    </div>
  );
}
