import Link from "next/link";
import { Brain, CheckCircle2, XCircle } from "lucide-react";

export const metadata = { title: "Verify email — JobAI" };

interface Props {
  searchParams: { error?: string; email?: string };
}

export default function VerifyPage({ searchParams }: Props) {
  const isError = !!searchParams.error;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl text-gray-900 dark:text-white">JobAI</span>
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
          {isError ? (
            <>
              <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Link expired</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                This verification link has expired or already been used.
              </p>
              <Link
                href="/login"
                className="inline-block bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
              >
                Try again
              </Link>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                We sent a sign-in link to
              </p>
              {searchParams.email && (
                <p className="font-semibold text-gray-800 dark:text-white mb-6">
                  {searchParams.email}
                </p>
              )}
              <p className="text-xs text-gray-400">
                Didn&apos;t get it? Check spam or{" "}
                <Link href="/login" className="text-brand hover:underline">
                  try again
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
