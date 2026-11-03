"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

export default function JoinButton({ event }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinEvent = async () => {
    if (!session?.user?.email) {
      toast.error("You must be logged in to join an event.");
      router.push("/sign-in");
      return;
    }

    try {
      setJoining(true);

      // 1. Get JWT token from Better Auth
      const { data: tokenData, error } = await authClient.token();

      const token = tokenData?.token;

      if (error || !token) {
        toast.error("Authentication failed. Please sign in again.");
        return;
      }

  
      const payload = {
        eventId: event._id,
        userName: session.user.name || "Attendee",
        eventTitle: event.title,
        eventDate: event.date,
        location: event.location,
        thumbnail: event.thumbnail,
      };

  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "Successfully joined the event!");
        setHasJoined(true);
      } else {
        toast.error(data.message || "Failed to join event.");
      }
    } catch (error) {
      console.error("Join event error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  if (isPending) {
    return null;
  }

  if (hasJoined) {
    return (
      <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-6 py-3.5 rounded-xl font-semibold text-sm">
        <FaCheckCircle /> Successfully Joined
      </div>
    );
  }

  return (
    <button
      onClick={handleJoinEvent}
      disabled={joining}
      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm disabled:opacity-50"
    >
      {joining ? "Processing..." : "Join Event"}
    </button>
  );
}