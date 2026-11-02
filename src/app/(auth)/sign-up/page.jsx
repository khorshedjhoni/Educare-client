"use client";

import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaHandsHelping, FaUser, FaEnvelope, FaImage, FaLock, FaArrowLeft } from "react-icons/fa";
import { FaGoogle, FaGithub } from "react-icons/fa6";

const SignUpPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email and Password Registration
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const photoURL = String(formData.get("photoURL") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    // Password validation
    if (password.length < 6) {
      const message = "Password must be at least 6 characters long.";
      setError(message);
      toast.error(message);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      const message =
        "Password must contain at least one uppercase letter.";
      setError(message);
      toast.error(message);
      return;
    }

    if (!/[a-z]/.test(password)) {
      const message =
        "Password must contain at least one lowercase letter.";
      setError(message);
      toast.error(message);
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      const message = "Passwords do not match.";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        image: photoURL,
      });

      if (result.error) {
        const message =
          result.error.message || "Registration failed. Please try again.";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Welcome to Educare! Your account has been created.");

      router.replace("/sign-in");
    } catch (err) {
      console.error("Registration error:", err);

      const message = "Something went wrong. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Google Registration
  const handleSignUpWithGoogle = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google registration failed.");
      }
    } catch (err) {
      console.error("Google registration error:", err);
      toast.error("Unable to register with Google.");
    }
  };

  // GitHub Registration
  const handleSignUpWithGitHub = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub registration failed.");
      }
    } catch (err) {
      console.error("GitHub registration error:", err);
      toast.error("Unable to register with GitHub.");
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
            Join Educare
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Create an account and become part of a community that shares
            knowledge, books, and opportunities.
          </p>

        </div>

     
        <form onSubmit={onSubmit} className="space-y-4">

       
          <div className="form-control w-full space-y-1.5">

            <label className="label pb-0 pt-0">
              <span className="label-text text-xs font-semibold text-slate-300">
                Full Name
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FaUser size={14} />
              </span>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 pl-10 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

          </div>

          
          <div className="form-control w-full space-y-1.5">

            <label className="label pb-0 pt-0">
              <span className="label-text text-xs font-semibold text-slate-300">
                Email Address
              </span>
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

         
          <div className="form-control w-full space-y-1.5">

            <label className="label pb-0 pt-0">
              <span className="label-text text-xs font-semibold text-slate-300">
                Profile Photo URL
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FaImage size={14} />
              </span>
              <input
                name="photoURL"
                type="url"
                placeholder="https://example.com/profile.jpg"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 pl-10 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

          </div>

          
          <div className="form-control w-full space-y-1.5">

            <label className="label pb-0 pt-0">
              <span className="label-text text-xs font-semibold text-slate-300">
                Password
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FaLock size={14} />
              </span>
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={6}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 pl-10 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <p className="mt-1.5 text-xs text-slate-400">
              At least 6 characters, including uppercase and lowercase letters.
            </p>

          </div>

          
          <div className="form-control w-full space-y-1.5">

            <label className="label pb-0 pt-0">
              <span className="label-text text-xs font-semibold text-slate-300">
                Confirm Password
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FaLock size={14} />
              </span>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

   
        <div className="relative my-6 text-center">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/80" />
          </div>

          <span className="relative bg-slate-800/80 px-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            OR CONTINUE WITH
          </span>

        </div>

       
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          
          <button
            type="button"
            onClick={handleSignUpWithGoogle}
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700/60 hover:border-indigo-500/50 disabled:opacity-50"
          >
            <FaGoogle size={14} className="text-red-400" />
            Google
          </button>

        
          <button
            type="button"
            onClick={handleSignUpWithGitHub}
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700/60 hover:border-indigo-500/50 disabled:opacity-50"
          >
            <FaGithub size={15} className="text-white" />
            GitHub
          </button>

        </div>

        
        <div className="mt-6 text-center text-xs text-slate-400">

          Already have an account?{" "}

          <Link
            href="/sign-in"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign in
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

export default SignUpPage;