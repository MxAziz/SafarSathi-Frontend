import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown, Shield } from "lucide-react";
import Link from "next/link";

interface ProfileSummaryProps {
  user: {
    name: string;
    image: string;
    isVerified: boolean;
    location: string;
  };
}

export default function ProfileSummary({ user }: ProfileSummaryProps) {
  return (
    <Card className="h-full">
      <CardHeader className="text-center pb-2">
        <div className="relative mx-auto w-24 h-24 mb-4">
          <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
            <AvatarImage src={user?.image} className="object-cover" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {user?.isVerified && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-background">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </div>
        <h3 className="font-bold text-xl">{user?.name}</h3>
        <p className="text-sm text-muted-foreground">{user?.location}</p>
      </CardHeader>
      <CardContent className="flex justify-center gap-2">
        {user?.isVerified ? (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            <Shield className="w-3 h-3 mr-1" /> Verified Traveler
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            Free Member
          </Badge>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {!user.isVerified && (
          <div className="w-full bg-linear-to-r from-amber-200 to-yellow-400 p-4 rounded-lg text-yellow-900 mb-2">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Crown className="w-4 h-4" /> Go Premium
            </div>
            <p className="text-xs opacity-90">
              Get verified badge & unlimited matches.
            </p>
          </div>
        )}
        <Link href="/my-profile" className="w-full">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}