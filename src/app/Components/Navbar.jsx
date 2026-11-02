"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaPlusCircle,
  FaCog,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { BiBookOpen } from "react-icons/bi";
import ThemeToggle from "./ToggleButton";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b mb-2 border-slate-800 bg-slate-900/95 text-slate-100 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo (Consistent with theme) */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-3 group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-transform group-hover:scale-105">
            <BiBookOpen size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Edu<span className="text-indigo-400">care</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-slate-400">
              LEARN • SHARE • GROW
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/upcoming-events"
            className="flex items-center gap-2 font-medium text-slate-300 transition hover:text-indigo-400"
          >
            <FaCalendarAlt size={16} />
            Upcoming Events
          </Link>
        </div>

        {/* Authentication Section (Desktop) */}
        <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-800" />
          ) : user ? (
            <div className="flex items-center gap-4">

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  title={user.name}
                  aria-expanded={isDropdownOpen}
                  aria-label="Open profile menu"
                  className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 p-1 pr-3 transition hover:border-indigo-400"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <span className="max-w-28 truncate text-sm font-semibold text-slate-200">
                    {user.name}
                  </span>

                  <FaChevronDown size={14} className="text-slate-400" />
                </button>

                {/* Dropdown Menu (Dark Mode Styled) */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 py-2 shadow-2xl shadow-black/50">

                    <div className="border-b border-slate-800 px-4 py-3">
                      <p className="truncate font-semibold text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2 space-y-1">
                      <Link
                        href="/create-event"
                        onClick={closeMenus}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition"
                      >
                        <FaPlusCircle size={16} />
                        Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        onClick={closeMenus}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition"
                      >
                        <FaCog size={16} />
                        Manage Events
                      </Link>

                      <Link
                        href="/joined-events"
                        onClick={closeMenus}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition"
                      >
                        <FaUsers size={16} />
                        Joined Events
                      </Link>
                    </div>

                    <div className="border-t border-slate-800 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
                      >
                        <FaSignOutAlt size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-900 px-5 py-6 md:hidden shadow-2xl">
          <div className="flex flex-col gap-4">

            <Link
              href="/upcoming-events"
              onClick={closeMenus}
              className="flex items-center gap-3 font-medium text-slate-300 hover:text-indigo-400 transition"
            >
              <FaCalendarAlt size={18} />
              Upcoming Events
            </Link>

            {isPending ? (
              <div className="h-10 animate-pulse rounded-lg bg-slate-800" />
            ) : user ? (
              <>
                <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={40}
                      height={40}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href="/create-event"
                    onClick={closeMenus}
                    className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 py-2 transition"
                  >
                    <FaPlusCircle size={18} />
                    Create Event
                  </Link>

                  <Link
                    href="/manage-events"
                    onClick={closeMenus}
                    className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 py-2 transition"
                  >
                    <FaCog size={18} />
                    Manage Events
                  </Link>

                  <Link
                    href="/joined-events"
                    onClick={closeMenus}
                    className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 py-2 transition"
                  >
                    <FaUsers size={18} />
                    Joined Events
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 border-t border-slate-800 pt-4 text-left font-semibold text-red-400 hover:text-red-300 transition"
                >
                  <FaSignOutAlt size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                onClick={closeMenus}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;