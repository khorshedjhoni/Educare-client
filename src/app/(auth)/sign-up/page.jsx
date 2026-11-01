


"use client";

import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

      router.replace("/login");
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
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafa] px-4 py-10">

      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">

        {/* Header */}
        <div className="mb-8 space-y-2 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7v14" />
              <path d="M3 18V5a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3 3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-4a3 3 0 0 0-3 3 3 3 0 0 0-3-3H5a2 2 0 0 1-2-2Z" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Join Educare
          </h1>

          <p className="text-sm text-slate-500">
            Create an account and become part of a community that shares
            knowledge, books, and opportunities.
          </p>

        </div>

        {/* Registration Form */}
        <form onSubmit={onSubmit} className="space-y-4">

          {/* Name */}
          <div className="form-control w-full">

            <label className="label pb-1.5 pt-0">
              <span className="label-text text-xs font-semibold text-slate-800">
                Full Name
              </span>
            </label>

            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              required
            />

          </div>

          {/* Email */}
          <div className="form-control w-full">

            <label className="label pb-1.5 pt-0">
              <span className="label-text text-xs font-semibold text-slate-800">
                Email Address
              </span>
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              required
            />

          </div>

          {/* Photo URL */}
          <div className="form-control w-full">

            <label className="label pb-1.5 pt-0">
              <span className="label-text text-xs font-semibold text-slate-800">
                Profile Photo URL
              </span>
            </label>

            <input
              name="photoURL"
              type="url"
              placeholder="https://example.com/profile.jpg"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              required
            />

          </div>

          {/* Password */}
          <div className="form-control w-full">

            <label className="label pb-1.5 pt-0">
              <span className="label-text text-xs font-semibold text-slate-800">
                Password
              </span>
            </label>

            <input
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={6}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              required
            />

            <p className="mt-1.5 text-xs text-slate-400">
              At least 6 characters, including uppercase and lowercase letters.
            </p>

          </div>

          {/* Confirm Password */}
          <div className="form-control w-full">

            <label className="label pb-1.5 pt-0">
              <span className="label-text text-xs font-semibold text-slate-800">
                Confirm Password
              </span>
            </label>

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              required
            />

          </div>

          {/* Error Message */}
          {error && (
            <p
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full cursor-pointer rounded-xl bg-[#0b8a4b] py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#09733e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>

          <span className="relative bg-white px-3 text-xs font-medium text-slate-400">
            OR CONTINUE WITH
          </span>

        </div>

        {/* Social Registration */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          {/* Google */}
          <button
            type="button"
            onClick={handleSignUpWithGoogle}
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >

            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.36 7.23 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.24-.72-.37-1.49-.37-2.24s.13-1.52.37-2.24V6.6H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.4l4.09-3.16z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.18 6.6l4.09 3.16c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>

            Google
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={handleSignUpWithGitHub}
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >

            <svg
              className="h-4 w-4 shrink-0 fill-current text-slate-800"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>

            GitHub
          </button>

        </div>

        {/* Login Link */}
        <div className="mt-6 text-center text-xs text-slate-500">

          Already have an account?{" "}

          <Link
            href="/sign-in"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Sign in
          </Link>

        </div>

        {/* Home Link */}
        <div className="mt-3 text-center">

          <Link
            href="/"
            className="text-xs text-slate-400 transition-colors hover:text-slate-600"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
};

export default SignUpPage;


