// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#006980] text-white text-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-teal-400/30 blur-3xl rounded-full"></div>
      </div>

      {/* 404 Title */}
      <h1 className="text-[120px] md:text-[160px] font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-teal-300 select-none drop-shadow-lg">
        404
      </h1>

      {/* Message */}
      <p className="mt-4 text-2xl font-light text-white/80">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="mt-2 text-white/50 max-w-md">
        It may have been moved, deleted, or you might have mistyped the link.
      </p>

      {/* Back Home Button */}
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-white text-[#006980] font-semibold px-8 py-3 text-lg shadow-md transition-all duration-300 hover:bg-opacity-90 hover:scale-105"
      >
        Go Back Home
      </Link>

      {/* Decorative underline */}
      <div className="mt-12 w-24 h-[2px] bg-white/40 rounded-full"></div>
    </main>
  );
}
