import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Sign in — JobAI" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <Image src="/logo.png" width={36} height={36} alt="JobAI" className="rounded-xl" />
          <span className="font-bold text-2xl text-gray-900 dark:text-white">JobAI</span>
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Sign in to see your job matches
          </p>
          <LoginForm />
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-brand font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
