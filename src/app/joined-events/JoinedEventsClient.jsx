"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FaCheckCircle, FaHandsHelping } from "react-icons/fa";
import Link from "next/link";
import EventCard from "../Components/EventCard";
import JoinedEventCard from "./JoinEventCard";

export default function JoinedEventsClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:5000/joined-events?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setJoinedEvents(data);
          }
          setLoadingEvents(false);
        })
        .catch((err) => {
          console.error("Failed to fetch joined events:", err);
          setLoadingEvents(false);
        });
    } else if (!isPending && !session?.user?.email) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending || loadingEvents) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        <p className="animate-pulse">Loading your joined events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Joined <span className="text-indigo-400">Events</span>
          </h1>
        </div>

        {joinedEvents.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 border border-slate-800 rounded-3xl max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-white">No Joined Events Yet</h3>
            <p className="text-slate-400 text-sm px-6">You havent joined any community drives yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedEvents.map((event) => (
              <JoinedEventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}