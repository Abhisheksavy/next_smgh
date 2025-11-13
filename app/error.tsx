"use client";
import Link from "next/link";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#006980]/10 via-gray-50 to-white px-6">
      <div className="max-w-md w-full text-center bg-white/90 backdrop-blur-md shadow-xl rounded-3xl p-10 border border-gray-100">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Something Went Wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We ran into an unexpected error. Please try again or head back home.
        </p>

        {/* Dev Mode Error Details */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
            <p className="text-xs font-mono text-gray-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex-1 sm:flex-none px-6 py-3 bg-[#006980] hover:bg-[#00586a] text-white font-medium rounded-lg transition-all"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-all"
          >
            Back to Home
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-400 mt-8">
          If the problem continues, please contact support.
        </p>
      </div>
    </main>
  );
};

export default Error;
