"use client";

import React from "react";
import JoinedEventCard from "./JoinEventCard";

export default function JoinedEventsClient({ initialEvents = [] }) {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Joined <span className="text-indigo-400">Events</span>
          </h1>
        </div>

        {initialEvents.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 border border-slate-800 rounded-3xl max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-white">
              No Joined Events Yet
            </h3>
            <p className="text-slate-400 text-sm px-6">
              You haven't joined any community events yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialEvents.map((event) => (
              <JoinedEventCard
                key={event._id || event.eventId}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}