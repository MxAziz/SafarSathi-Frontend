import LoginForm from "@/components/modules/auth/LoginForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | SafarSathi - Access Your Travel Adventures",
  description:
    "Welcome back to SafarSathi! Log in to manage your travel plans, check messages from travel buddies, and discover your next destination. Secure access to your travel profile.",
  keywords: [
    "SafarSathi Login",
    "Sign In",
    "User Account",
    "Travel Dashboard",
    "Member Access",
    "Find Travel Buddy",
  ],
};
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect: string }>;
}) {
  const params = (await searchParams) || {};

  return (
    <div className="min-h-screen w-full flex bg-background">
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 text-white flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/736x/40/18/93/401893ba39864b58b820396876a4dd77.jpg"
            alt="Travel Friends Meetup"
            height={0}
            width={900}
            className="object-cover opacity-60"
            priority
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Background Decoration (Optional Subtle Blob) */}
        <div className="absolute bottom-0 left-0 -z-10 w-[40%] h-[40%] bg-teal-100/40 rounded-full blur-3xl opacity-50 dark:bg-teal-900/20" />

        {/* The Login Form Component */}
        <div className="w-full max-w-lg">
          <LoginForm redirect={params.redirect} />
        </div>
      </div>
    </div>
  );
}