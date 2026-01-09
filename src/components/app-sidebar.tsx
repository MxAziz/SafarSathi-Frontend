"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, } from "@/components/ui/sidebar";
import { IUserInfo } from "@/types/user.interface";
import { LayoutDashboard, Map, Plane, Users, ShieldCheck, Sparkles, Send, UserPlus, Star, } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  authData: IUserInfo;
}

export function AppSidebar({ authData, ...props }: AppSidebarProps) {
  const navMainItems = [];
  const userRole = authData?.data?.user?.role;

  // Admin Menu Based on Requirements
  if (userRole === "ADMIN") {
    navMainItems.push(
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Activity Logs",
        url: "/admin/dashboard/manage-activity",
        icon: ShieldCheck,
      },
      {
        title: "Manage Users",
        url: "/admin/dashboard/manage-users",
        icon: Users,
      },
      {
        title: "Manage Trips",
        url: "/admin/dashboard/manage-trips",
        icon: Plane,
      },
      {
        title: "Manage Reviews",
        url: "/admin/dashboard/manage-reviews",
        icon: Star,
      }
    );
  }

  // Traveler Menu Based on Requirements
  if (userRole === "TRAVELER") {
    navMainItems.push(
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Trip Matches",
        url: "/dashboard/trip-matches",
        icon: Sparkles,
      },
      {
        title: "Explore Travelers",
        url: "/dashboard/explore-travelers",
        icon: Map,
      },
      {
        title: "My Travel Plans",
        url: "/dashboard/my-travel-plans",
        icon: Plane,
      },
      {
        title: "Requested Trips",
        url: "/dashboard/requested-trips",
        icon: Send,
      },

      {
        title: "Buddy Requests",
        url: "/dashboard/buddy-requests",
        icon: UserPlus,
      }
    );
  }

  const data = {
    user: {
      name: authData?.data?.name || "Traveler",
      email: authData?.data?.email || "user@example.com",
      avatar: authData?.data?.profileImage || "",
      role: userRole,
    },
    navMain: navMainItems,
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href="/" className="flex gap-2 justify-start items-center transition-opacity hover:opacity-90">
          <Plane />
          <h1 className="text-xl font-bold">SafarSathi</h1>
        </Link>
        <div className="border bg-black"></div>
      </SidebarHeader>
      <SidebarContent className="mt-3">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}