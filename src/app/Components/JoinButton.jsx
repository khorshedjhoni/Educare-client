"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

export default function JoinButton({ event }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinEvent = async () => {
    // Check if user is logged in before allowing them to join
    if (!session?.user?.email) {
      toast.error("You must be logged in to join an event.");
      router.push("/sign-in");
      return;
    }

    setJoining(true);

   
      const payload = {
        eventId: event._id,
        userEmail: session.user.email,
        userName: session.user.name || "Attendee",
        eventTitle: event.title,
        eventDate: event.date,
        location: event.location,
        thumbnail: event.thumbnail,
      };

      const res = await fetch("http://localhost:5000/joined-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Successfully joined the event!");
        setHasJoined(true);
      } else {
        toast.error(data.message || "Failed to join event.");
      }
   
  };

  if (isPending) {
    return null;
  }

  // Show success badge if already joined in this session
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