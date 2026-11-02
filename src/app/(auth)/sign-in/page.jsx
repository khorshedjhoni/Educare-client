"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaHandsHelping, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { FaXTwitter, FaGoogle, FaGithub } from "react-icons/fa6";

const SignInPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email & Password Sign In
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        const message =
          result.error.message || "Sign in failed. Please try again.";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Welcome back to EduCare!");

      router.replace("/");
      router.refresh();

    } catch (err) {
      console.error("Sign in error:", err);

      const message = "Something went wrong. Please try again.";

      setError(message);
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign in failed.");
      }

    } catch (err) {
      console.error("Google sign in error:", err);
      toast.error("Unable to sign in with Google.");
    }
  };

  // GitHub Sign In
  const handleSignInWithGitHub = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub sign in failed.");
      }

    } catch (err) {
      console.error("GitHub sign in error:", err);
      toast.error("Unable to sign in with GitHub.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12 text-slate-100">

      <div className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-800/60 p-8 shadow-2xl backdrop-blur-md sm:p-10">

        
        <div className="mb-8 space-y-3 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner">
            <FaHandsHelping size={26} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Welcome Back!
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Sign in to EduCare and continue making a difference through education and community service.
          </p>

        </div>

       
        <form onSubmit={onSubmit} className="space-y-4">

        
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FaEnvelope size={14} />
              </span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 pl-10 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

       
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FaLock size={14} />
              </span>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 pl-10 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          
          {error && (
            <div
              className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-xs text-rose-400"
              role="alert"
            >
              {error}
            </div>
          )}

          
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/80" />
          </div>
          <span className="relative bg-slate-800/80 px-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Or continue with
          </span>
        </div>

        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

      
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700/60 hover:border-indigo-500/50 disabled:opacity-50"
          >
            <FaGoogle size={14} className="text-red-400" />
            Google
          </button>

          
          <button
            type="button"
            onClick={handleSignInWithGitHub}
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700/60 hover:border-indigo-500/50 disabled:opacity-50"
          >
            <FaGithub size={15} className="text-white" />
            GitHub
          </button>

        </div>

        
        <div className="mt-6 text-center text-xs text-slate-400">
          Dont have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            Create Account
          </Link>
        </div>

        
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-indigo-400"
          >
            <FaArrowLeft size={10} /> Back to Home
          </Link>
        </div>

      </div>

    </main>
  );
};

export default SignInPage;