export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      {/* Spinner */}
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute h-12 w-12 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-blue-600 animate-spin" />
      </div>

      {/* Loading text */}
      <p className="mt-6 text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide animate-pulse">
        Preparing your experience...
      </p>

      {/* Shimmer progress bar */}
      <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 relative">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"></div>
      </div>

      {/* Inline keyframes for shimmer (server-safe) */}
      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}
