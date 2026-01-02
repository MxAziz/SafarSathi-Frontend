"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { Logo } from "@/components/shared/Logo";
import { getInputFieldError } from "@/utility/getInputFieldError";
import { registerTraveler } from "@/services/auth/registerTraveler";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerTraveler, null);

  // Local State
  const [showPassword, setShowPassword] = useState(false);

  // Handle Server Response
  useEffect(() => {
    if (state && !state.success && state.error) {
      toast.error(
        state.error || "Registration failed. Please check your details."
      );
    }
  }, [state]);

  // Animation Variants
  const formVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="w-full max-w-md"
    >
      <div className="mb-6 text-center md:text-left">
        <Link href="/">
          {/* <Logo
            variant="full"
            className="justify-center md:justify-start mb-2"
          /> */}
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Join SafarSathi to start your journey with new friends.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              className="pl-9 bg-background/50"
            />
          </div>
          {getInputFieldError("name", state) && (
            <p className="text-destructive font-medium  text-xs">
              {getInputFieldError("name", state)}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@SafarSathi.com"
              className="pl-9 bg-background/50"
            />
          </div>
          {getInputFieldError("email", state) && (
            <p className="text-destructive font-medium text-xs">
              {getInputFieldError("email", state)}
            </p>
          )}
        </div>

        {/* Password Group */}
        <div className="grid grid-cols-1 gap-4">
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-9 pr-9 bg-background/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {getInputFieldError("password", state) && (
              <p className="text-destructive font-medium text-xs">
                {getInputFieldError("password", state)}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pl-9 pr-9 bg-background/50`}
              />
            </div>
            {getInputFieldError("confirmPassword", state) && (
              <p className="text-destructive font-medium text-xs">
                {getInputFieldError("confirmPassword", state)}
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full font-bold shadow-md"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Register <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login here
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;