'use client'
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const Router = useRouter();

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-[#0C54A0]/10 via-white to-[#0C54A0]/5 px-6">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#0C54A0]/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#0C54A0]/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0C54A0]/10 text-[#0C54A0] shadow-sm">
          <Compass size={40} />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold tracking-tight text-[#0C54A0]">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          পথটা হারিয়ে ফেলেছো!
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-600 leading-relaxed">
          তুমি যে পেজটা খুঁজছো সেটা হয়তো সরানো হয়েছে, নাম পরিবর্তন হয়েছে, অথবা
          এখনো SafarSathi-তে যোগ করা হয়নি।
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0C54A0] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#0a4785] focus:outline-none focus:ring-2 focus:ring-[#0C54A0]/40"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

            <button
              onClick={() => Router.back()}
              className="justify-center cursor-pointer inline-flex items-center gap-2 rounded-xl border border-[#0C54A0]/30 bg-white px-6 py-3 text-sm font-medium text-[#0C54A0] shadow-sm transition hover:bg-[#0C54A0]/5 focus:outline-none focus:ring-2 focus:ring-[#0C54A0]/30"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
        </div>
      </div>
    </section>
  );
}