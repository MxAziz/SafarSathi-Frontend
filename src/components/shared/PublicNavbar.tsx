"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  LogOut,
  Map,
  Calendar,
  Settings,
  ChevronDown,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Logo } from "./Logo";
import { IUserInfo } from "@/types/user.interface";
// import { logoutUser } from "@/services/auth/logoutUser";

const PublicNavbar = ({
  accessToken,
  authData,
}: {
  accessToken: string;
  authData: IUserInfo;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect for professional feel
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    // await logoutUser();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore-travelers" },
    { name: "Travel Buddy", path: "/travel-plans" },
    { name: "Memberships", path: "/membership" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b py-2"
          : "bg-background/80 backdrop-blur-md py-4 border-b"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* 1. Logo Section */}
          <Link
            href="/"
            className="shrink-0 transition-transform duration-300 hover:scale-105"
          >
            {/* <Logo variant="full" /> */}
            SafarSathi
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
                {/* Active/Hover Line Animation */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-2/3 ${
                    isActive(link.path) ? "w-2/3" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* 3. Right Side (Auth & Actions) */}
          <div className="hidden lg:flex items-center space-x-6">
            {accessToken && authData.data?.email ? (
              <div className="flex items-center gap-5">
                {/* Create Plan Button */}
                {authData?.data?.user?.role === "TRAVELER" && (
                  <Link href="/dashboard/my-travel-plans">
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 shadow-none shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                      <Compass className="w-4 h-4 mr-2 animate-spin-slow" />
                      Create Plan
                    </Button>
                  </Link>
                )}

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="group flex items-center gap-2 p-1 pr-3 rounded-full border border-border hover:border-primary/30 hover:bg-accent transition-all duration-300 focus:outline-none"
                  >
                    <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-background ring-offset-1 group-hover:ring-primary/20 transition-all">
                      <Image
                        src={
                          authData?.data?.profileImage ||
                          "https://i.pinimg.com/736x/9c/f0/78/9cf0780d14223edad65576b52ef827de.jpg"
                        }
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu - Modern Styling */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border bg-card p-2 text-card-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex flex-col px-4 py-3 border-b mb-1">
                        <p className="text-sm font-bold tracking-tight">
                          {authData?.data?.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate uppercase tracking-widest mt-0.5">
                          {authData?.data?.user?.role}
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        {authData?.data?.user?.role === "ADMIN" ? (
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-all group"
                          >
                            <Settings className="h-4 w-4 group-hover:rotate-45 transition-transform" />
                            Admin Dashboard
                          </Link>
                        ) : (
                          <>
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-all"
                            >
                              <Map className="h-4 w-4" /> My Dashboard
                            </Link>
                            <Link
                              href="/my-profile"
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-all"
                            >
                              <User className="h-4 w-4" /> Profile Settings
                            </Link>
                            <Link
                              href="/my-plans"
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-all"
                            >
                              <Calendar className="h-4 w-4" /> Adventure Plans
                            </Link>
                          </>
                        )}
                        <div className="h-px bg-border my-1 mx-2"></div>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 transition-all"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Logged Out State
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className="text-sm font-semibold px-5 py-2 hover:text-primary transition-colors cursor-pointer">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-7 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-accent transition-colors focus:outline-none"
            >
              {menuOpen ? (
                <X size={24} className="text-primary" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* 5. Mobile/Tablet Navigation Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-background border-b shadow-xl p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                    isActive(link.path)
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t px-2">
              {accessToken && authData?.data?.email ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden border">
                      <Image
                        src={
                          authData?.data?.profileImage ||
                          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                        }
                        alt="user"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        {authData?.data?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {authData?.data?.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium"
                    >
                      <Map size={16} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 p-3 rounded-xl border border-destructive/20 text-destructive text-sm font-medium"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    className="w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full rounded-xl py-6 border-primary/20 text-primary"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    className="w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button className="w-full rounded-xl py-6 bg-primary">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
