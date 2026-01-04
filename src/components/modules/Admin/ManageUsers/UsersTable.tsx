import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldCheck,
  Mail,
  UserX,
  CheckCircle2,
  AlertCircle,
  Ban,
} from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import DeleteUserModal from "./DeleteUserDialog";

interface IUser {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
  contactNumber: string | null;
  currentLocation: string | null;
  isVerifiedTraveler: boolean;
  createdAt: string;
  user?: {
    isDeleted: boolean;
    isVerified: boolean;
  };
}

export default function UsersTable({ users }: { users: IUser[] }) {

  if (!users || users.length === 0) {
    return (
      <Card className="shadow-sm border-none bg-background">
        <CardHeader>
          <CardTitle>All Travelers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-md bg-muted/10 border-dashed">
            <div className="bg-muted p-4 rounded-full mb-3">
              <UserX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Travelers Found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1">
              It looks like there are no registered travelers matching your
              criteria at the moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-none bg-background">
      <CardHeader>
        <CardTitle>All Travelers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[280px]">User Info</TableHead>

                {/* New Column: Account Status (Deleted or Active) */}
                <TableHead>Account Status</TableHead>

                {/* New Column: Email Verification */}
                <TableHead className="hidden md:table-cell">
                  Email Verified
                </TableHead>

                {/* Existing Column: Traveler Badge */}
                <TableHead>Traveler Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow
                  key={user.id}
                  className={`group transition-colors ${
                    user.user?.isDeleted
                      ? "bg-red-50/50 hover:bg-red-50"
                      : "hover:bg-muted/30"
                  }`}
                >
                  {/* 1. User Info */}
                  <TableCell>
                    <BlurFade delay={0.05 * idx} inView>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarImage
                            src={user.profileImage || ""}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name?.slice(0, 2).toUpperCase() || "UN"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span
                            className={`font-medium text-sm leading-none ${
                              user.user?.isDeleted
                                ? "text-muted-foreground line-through"
                                : ""
                            }`}
                          >
                            {user.name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </BlurFade>
                  </TableCell>

                  {/* 2. NEW: Account Status (Is Deleted?) */}
                  <TableCell>
                    <BlurFade delay={0.05 * idx} inView>
                      {user.user?.isDeleted ? (
                        <Badge variant="destructive" className="gap-1 pr-3">
                          <Ban className="w-3 h-3" /> Deleted
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-600 bg-green-50 gap-1 pr-3"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </Badge>
                      )}
                    </BlurFade>
                  </TableCell>

                  {/* 3. NEW: Email Verification Status (Is Verified?) */}
                  <TableCell className="hidden md:table-cell">
                    <BlurFade delay={0.05 * idx} inView>
                      {user.user?.isVerified ? (
                        <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                          <AlertCircle className="w-4 h-4" />
                          <span>Unverified</span>
                        </div>
                      )}
                    </BlurFade>
                  </TableCell>

                  {/* 4. Existing: Premium/Verified Traveler Status */}
                  <TableCell>
                    <BlurFade delay={0.05 * idx} inView>
                      {user.isVerifiedTraveler ? (
                        <Badge
                          variant="secondary"
                          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200 gap-1"
                        >
                          <ShieldCheck className="w-3 h-3" /> Premium
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          Regular
                        </Badge>
                      )}
                    </BlurFade>
                  </TableCell>

                  {/* 5. Actions */}
                  <TableCell className="text-right">
                    <BlurFade delay={0.05 * idx} inView>
                      {!user.user?.isDeleted && (
                        <DeleteUserModal userId={user.id} />
                      )}
                    </BlurFade>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}