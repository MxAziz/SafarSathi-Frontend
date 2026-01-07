"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
// Logic / Utilities
import { loginUser } from "@/services/auth/loginUser";
import { getInputFieldError } from "@/utility/getInputFieldError";
import Logo from "@/assets/logo/Logo";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  // Server Action Hook
  const [state, formAction, isPending] = useActionState(loginUser, null);

  // Local State for Form Management (to enable auto-fill)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error Toast Handling
  useEffect(() => {
    if (state && !state.success && state.error) {
      toast.error("Login failed. Please check your credentials.");
    }
  }, [state]);

  // Handle Demo Login Click
  const handleDemoLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-lg mx-auto"
    >
      <Card className="border-none border-border/50 shadow-none bg-card/50 backdrop-blur-xl overflow-hidden rounded-lg">
        {/* Top Accent Gradient Line */}
        <div className="flex justify-center -mb-2">
          {/* Base Logo */}
          <Link href="/" className="block">
            SafarSathi
            <Logo />
          </Link>
        </div>
        <CardHeader className="flex flex-col items-center text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Enter your credentials to start your journey
          </CardDescription>
        </CardHeader>

        <CardContent className="py-6">
          {/* --- Demo Login Section --- */}
          <div className="mb-8 space-y-3">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60 text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("safaradmin@gmail.com", "admin@0000")}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all group"
              >
                <ShieldCheck size={16} className="text-primary" />
                <span className="text-[11px] font-bold text-foreground">
                  Admin Login
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("abc@mailinator.com", "Pa$$w0rd!")
                }
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all group"
              >
                <UserCheck size={16} className="text-primary" />
                <span className="text-[11px] font-bold text-foreground">
                  Traveler Login
                </span>
              </button>
            </div>
            <div className="flex items-center gap-4 py-2">
              <div className="h-px w-full bg-border/50"></div>
              <span className="text-[10px] text-muted-foreground font-medium uppercase">
                Or
              </span>
              <div className="h-px w-full bg-border/50"></div>
            </div>
          </div>

          <form action={formAction} className="space-y-6">
            {/* Hidden Redirect Field */}
            {redirect && (
              <input type="hidden" name="redirect" value={redirect} />
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@safarsathi.com"
                  className="pl-10 h-10 rounded-lg bg-background border-border/60 focus:ring focus:ring-primary/20 transition-all"
                />
              </div>
              {getInputFieldError("email", state) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-destructive font-medium text-xs block"
                >
                  {getInputFieldError("email", state)}
                </motion.span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-10 rounded-lg bg-background border-border/60 focus:ring focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
              {getInputFieldError("password", state) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-destructive font-medium text-xs block"
                >
                  {getInputFieldError("password", state)}
                </motion.span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold text-base shadow-none shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Login <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center bg-muted/20 px-8 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline tracking-tight"
            >
              Create Free Account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginForm;