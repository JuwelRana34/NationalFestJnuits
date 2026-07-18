"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/core/auth/auth-client";
import { Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      setError("");
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setError(error.message || "Failed to create account");
        return;
      }
      router.push("/");
    });
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/`,
    });
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className=" w-full p-5 ">
        <Link href="/" className=" underline ">
          Back to Home
        </Link>
      </div>

      <div className="  grid lg:grid-cols-2">
        <div className=" absolute inset-0 bg-linear-to-r from-violet-500/10 to-secondary/10 -z-10" />
        {/* Decorative Section (Left on Register) */}
        <div className="hidden relative lg:flex flex-col justify-center items-center  order-2 lg:order-1">
          <div className="max-w-md space-y-6">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <User className="h-6 w-6 text-secondary " />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Start your journey with us today.
            </h2>
            <p className="text-zinc-400 text-lg">
              Join thousands of developers building the next generation of web
              applications.
            </p>
          </div>
        </div>

        {/* Form Section (Right on Register) */}
        <div className=" relative flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight ">
                Create an account
              </h1>
              <p className=" dark:text-zinc-400">
                Enter your details to get started
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 font-medium ">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-secondary " />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-zinc-300 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 font-medium ">
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
                  <label className="text-sm font-medium text-zinc-400 ">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-secondary " />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={8}
                      className="block w-full pl-10 pr-3 py-2.5 border border-zinc-300 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-5 px-4 "
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-300 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 py-1 bg-secondary text-white rounded-full">
                  Or sign up with
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignin}
              type="button"
              className="w-full flex justify-center items-center py-5 px-4 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-sm bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Image
                src={"https://cdn-icons-png.flaticon.com/128/281/281764.png"}
                alt="Logo-google"
                width={100}
                height={100}
                className="h-5 w-5 mr-2"
                unoptimized
              />
              Google
            </Button>

            <p className="text-center text-sm ">
              Already have an account?{" "}
              <Link
                prefetch={false}
                href="/signin"
                className="font-medium text-primary underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// export default function page() {
//     return (
//         <div>
//             <h1 className="text-3xl font-bold text-center mt-10">Registration Page</h1>
//         </div>
//     );
// }