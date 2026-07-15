"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/core/auth/auth-client";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setError("");

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Invalid credentials");
        return;
      }

      router.push("/dashboard");
    });
  };
  // const handleGoogleLogin = async () => {
    
  //   await authClient.signIn.social({
  //     provider: "google",
  //     callbackURL: `${window.location.origin}/`,
  //   });
  // };

  return (
    <div className="min-h-screen w-full  relative">
      <div className=" w-full p-5 ">
        <Link href="/" className=" underline ">
          Back to Home
        </Link>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className=" absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10 -z-10" />

        {/* Form Section */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-secondary " />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-zinc-300 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-zinc-400">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      prefetch={false}
                      className="text-sm font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-secondary " />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-zinc-300 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-md py-5 "
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>      

          </div>
        </div>

        {/* Decorative Section */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12">
          <div className="max-w-md space-y-6">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Lock className="h-6 w-6 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Secure, fast, and reliable authentication.
            </h2>
            <p className="text-zinc-400 text-lg">
              Manage your digital workspace with confidence. Everything you
              need, right where you need it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
