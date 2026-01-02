import RegisterForm from "@/components/modules/auth/RegisterForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Join SafarSathi | Create Your Travel Profile & Find Buddies",
  description:
    "Create your free SafarSathi account today. Build your traveler profile, find compatible travel buddies, and start planning your next shared adventure around the world.",
  keywords: [
    "SafarSathi Registration",
    "Sign Up",
    "Join SafarSathi",
    "Create Account",
    "Travel Community",
    "Find Travel Partner",
    "Traveler Profile",
  ],
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Side: Professional Travel Visual (Server Component Logic) */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/736x/31/2b/30/312b3060ee5e1507c0183340e0f80f42.jpg"
            alt="Travel Adventure"
            height={600}
            width={800}
            className="object-cover opacity-60"
            priority
          />
        </div>
      </div>

      {/* Right Side: Register Form (Client Component Injection) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Background blobs for aesthetics */}
        <div className="absolute top-0 right-0 -z-10 w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-3xl opacity-50 dark:bg-blue-900/20" />

        <RegisterForm />
      </div>
    </div>
  );
}