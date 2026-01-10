/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Calendar, Star, Globe, ShieldCheck, UserCog, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { EditProfileModal } from "@/components/modules/MyProfile/EditProfileModal";
import BlurFade from "@/components/magicui/blur-fade";
import { getUserInfo } from "@/services/auth/getUserInfo";
// import { Metadata } from "next";

// export async function generateMetadata(): Promise<Metadata> {
//   const { data: profile } = await getUserInfo();
//   if (!profile) {
//     return {
//       title: "My Profile | SafarSathi",
//       description: "Manage your SafarSathi profile and account settings.",
//     };
//   }

//   return {
//     title: `${profile.name} - My Profile | SafarSathi Dashboard`,
//     description: `Welcome back, ${profile.name}. Manage your travel plans, update your profile, and check your membership status on SafarSathi.`,
//     robots: {
//       index: false,
//       follow: true,
//     },
//   };
// }

export default async function ProfilePage() {
  const { data: profile } = await getUserInfo();
    console.log("profile metadata", profile);
  const role = profile?.user?.role;
  const isTraveler = role === "TRAVELER";

  return (
    // Responsive Padding & Container
    <div className="min-h-screen bg-gray-50/50 space-y-6">
      {/* Header Section */}
      <BlurFade delay={0.1} inView>
        {/* Margin Bottom increased to prevent overlap on MD screens */}
        <div className="relative mb-32 md:mb-36 group">
          {/* Cover Image */}
          <div className="h-40 sm:h-52 md:h-64 lg:h-80 w-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <Image
              src="https://i.pinimg.com/1200x/ad/e9/48/ade94889319475e835f26231f1e490dd.jpg"
              alt="Cover"
              fill
              className="object-cover w-full h-full brightness-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Profile Overlay */}
          <div className="absolute -bottom-24 left-4 sm:left-8 md:left-12 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 z-10 w-full md:w-auto">
            <div className="relative shrink-0">
              <div className="h-32 w-32 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 rounded-full border-4 sm:border-[6px] border-white shadow-xl overflow-hidden bg-white">
                <Image
                  src={
                    profile?.profileImage ||
                    "https://i.pinimg.com/1200x/7b/38/f1/7b38f1022730431e6b14622b6972a88d.jpg"
                  }
                  alt={profile?.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              {/* Badge */}
              {isTraveler && profile?.isVerifiedTraveler && (
                <div className="absolute bottom-3 right-3 bg-blue-600 text-white p-1.5 rounded-full border-[3px] border-white shadow-sm">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}
            </div>

            {/* Name & Info - Better Alignment for MD */}
            <div className="text-center md:text-left mb-2 md:mb-6 space-y-1.5 flex-1">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 wrap-break-words max-w-[300px] md:max-w-[500px]">
                  {profile?.name}
                </h1>
                <Badge
                  variant={isTraveler ? "default" : "destructive"}
                  className="uppercase text-[10px] mt-1 md:mt-2"
                >
                  {role}
                </Badge>
              </div>
              <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-1 text-sm sm:text-base">
                <MapPin className="w-4 h-4 shrink-0" />{" "}
                <span className="truncate max-w-[250px]">
                  {profile?.currentLocation || "Location not set"}
                </span>
              </p>
            </div>
          </div>

          {/* Action Button - Safe Positioning */}
          <div className="absolute top-4 right-4 md:top-auto md:bottom-[-50px] md:right-10 z-20">
            <EditProfileModal data={profile} role={role} />
          </div>
        </div>
      </BlurFade>

      {/*
        GRID FIX EXPLANATION:
        - sm & md: grid-cols-1 (Stacked layout - safest for tablets)
        - lg & xl: grid-cols-3 (1/3 Sidebar + 2/3 Content)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        {/* Left Column: Personal Info (Always takes full width on Mobile/Tablet, 1 col on Desktop) */}
        <BlurFade delay={0.2} inView className="lg:col-span-1 space-y-6 h-fit">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <UserCog className="w-5 h-5 text-gray-500" /> About
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm text-gray-700">
              {profile?.bio && (
                <div className="italic text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-primary/40 text-sm">
                  `{profile.bio}`
                </div>
              )}

              <div className="space-y-4">
                <InfoRow
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={profile?.email}
                />
                <InfoRow
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value={profile?.contactNumber}
                />
                <InfoRow
                  icon={<Globe className="w-4 h-4" />}
                  label="Address"
                  value={profile?.address}
                />
                <InfoRow
                  icon={<Calendar className="w-4 h-4" />}
                  label="Joined"
                  value={new Date(profile?.createdAt).toLocaleDateString()}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Gender" value={profile?.user?.gender || "-"} />
            <StatCard
              label="Status"
              value={profile?.user?.status || "Active"}
            />
          </div>
        </BlurFade>

        {/* Right Section: Details (Always takes full width on Mobile/Tablet, 2 cols on Desktop) */}
        <BlurFade delay={0.3} inView className="lg:col-span-2 space-y-6">
          {/* Admin View */}
          {!isTraveler && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard className="text-purple-600" /> Admin
                  Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center text-gray-500 bg-gray-50/50 rounded-b-xl">
                <p>
                  You have full administrative access to manage travelers and
                  trips.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Traveler View */}
          {isTraveler && (
            <>
              {/* Stats Row - Responsive Grid inside */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <BigStatCard
                  label="Countries"
                  value={profile?.visitedCountries?.length || 0}
                  className="bg-blue-50 text-blue-700"
                />
                <BigStatCard
                  label="Rating"
                  value={profile?.averageRating?.toFixed(1) || "N/A"}
                  icon={
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  }
                  className="bg-yellow-50 text-yellow-700"
                />
                {/* check */}
                <BigStatCard
                  label="Membership"
                  value={profile?.subscriptionEndDate ? "Pro" : "Free"}
                  className="bg-green-50 text-green-700 col-span-2 sm:col-span-1"
                />
              </div>

              {/* Interests */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Travel Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile?.travelInterests?.length ? (
                      profile.travelInterests.map((t: string, i: number) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200"
                        >
                          {t}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">
                        No interests added.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Visited Countries */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Visited Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {profile?.visitedCountries?.length ? (
                      profile.visitedCountries.map((c: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm font-medium p-3 bg-gray-50 rounded-lg border border-gray-100"
                        >
                          <Globe className="w-4 h-4 text-gray-400" /> {c}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">
                        No countries listed.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </BlurFade>
      </div>
    </div>
  );
}

// --- Helper Components (Optimized for overflow handling) ---

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="p-2 bg-gray-100 rounded-md text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-xs text-gray-500 uppercase font-semibold">{label}</p>
        <p className="font-medium text-gray-800 truncate" title={value}>
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-0 shadow-sm bg-white text-center p-4">
      <p className="text-lg font-bold text-gray-800 capitalize truncate">
        {value}
      </p>
      <p className="text-xs text-gray-500 uppercase">{label}</p>
    </Card>
  );
}

function BigStatCard({ label, value, icon, className }: any) {
  return (
    <Card
      className={`border-0 shadow-sm flex flex-col items-center justify-center p-4 ${className}`}
    >
      <div className="text-2xl font-bold flex items-center gap-1">
        {value} {icon}
      </div>
      <p className="text-xs uppercase font-bold opacity-80">{label}</p>
    </Card>
  );
}