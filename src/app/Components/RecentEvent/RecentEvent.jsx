import React from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import EventCard from "../EventCard";

const RecentEvent = async() => {
    let events = [];

  try {
    const res = await fetch("http://localhost:5000/events/recent", {
      cache: "no-store",
    });
    
    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    console.error("Error fetching recent events on server:", error);
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-medium mb-3">
              <FaCalendarAlt className="w-3.5 h-3.5" />
              <span>Get Involved</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Recent Upcoming <span className="text-indigo-400">Events</span>
            </h2>
          </div>
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition"
          >
            View All Events <FaArrowRight size={14} />
          </Link>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400">No upcoming events found at the moment. Check back soon or create one!</p>
          </div>
        ) : (
          /* Uniform Grid Layout mapping to EventCard */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
export default RecentEvent;