"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { RequestActionModal } from "./RequestActionModal";
import { EmptyBuddyState } from "./EmptyBuddyState"; // Import New Component
import { IBuddyRequest } from "@/types/buddyRequest.interface";

interface RequestsTableProps {
  requests: IBuddyRequest[];
}

export const RequestsTable = ({ requests }: RequestsTableProps) => {
  const [selectedRequest, setSelectedRequest] = useState<IBuddyRequest | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (request: IBuddyRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // ✅ Empty State Handling
  if (!requests || requests.length === 0) {
    return <EmptyBuddyState />;
  }

  return (
    <>
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[250px]">Traveler</TableHead>
              <TableHead className="hidden md:table-cell">
                Trip Interest
              </TableHead>
              <TableHead className="hidden lg:table-cell">Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req, index) => (
              <motion.tr
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group border-b transition-colors hover:bg-muted/30"
              >
                {/* Traveler Info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border shadow-sm">
                      <AvatarImage src={req.traveler.profileImage} />
                      <AvatarFallback className="font-semibold text-primary bg-primary/10">
                        {req.traveler.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {req.traveler.name}
                      </span>
                      {/* Mobile Only Destination */}
                      <span className="text-xs text-muted-foreground md:hidden truncate max-w-[120px]">
                        {req.travelPlan.destination}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Destination */}
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {req.travelPlan.destination}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {req.travelPlan.title}
                    </span>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {format(new Date(req.createdAt), "dd MMM, yyyy")}
                </TableCell>

                {/* Status Badge - refined look */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`px-2.5 py-0.5 text-xs font-semibold border-none shadow-none ${
                      req.status === "APPROVED"
                        ? "bg-green-100 text-green-700 ring-1 ring-green-600/20"
                        : req.status === "REJECTED"
                        ? "bg-red-100 text-red-700 ring-1 ring-red-600/20"
                        : "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20"
                    }`}
                  >
                    {req.status}
                  </Badge>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end">
                    {/* Desktop Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:flex h-8 w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary"
                      onClick={() => handleViewDetails(req)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(req)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      <RequestActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
      />
    </>
  );
};