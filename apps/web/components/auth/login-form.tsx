"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res?.error) setError("Failed to send code. Try again.");
      else setOtpSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/verify?email=${encodeURIComponent(email)}&token=${otp}`);
  };

  if (otpSent) {
    return (
      <form onSubmit={handleOtpVerify} className="space-y-3">
        <p className="text-sm text-jhp-gray">
          Code sent to <span className="font-medium text-jhp-black">{email}</span>
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          maxLength={6}
          required
          autoFocus
          className="w-full text-center tracking-[0.5em] py-3 border border-gray-200 rounded-xl text-lg font-mono text-jhp-black focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
        />
        <button
          type="submit"
          disabled={otp.length < 6}
          className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
        >
          Verify & Sign in
        </button>
        <button
          type="button"
          onClick={() => { setOtpSent(false); setOtp(""); }}
          className="w-full text-sm text-jhp-gray hover:text-jhp-black transition-colors"
        >
          ← Try a different email
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleEmailOtp} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-jhp-black mb-1.5">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jhp-gray" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-jhp-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand hover:bg-brand-hover text-white py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Send one-time code
      </button>
    </form>
  );
}
