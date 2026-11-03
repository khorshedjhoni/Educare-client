"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaHandsHelping } from "react-icons/fa";
import EventCard from "../Components/EventCard";

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
      
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-medium">
            <FaHandsHelping className="w-4 h-4" />
            <span>Community Action</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Upcoming <span className="text-indigo-400">Events & Drives</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore all scheduled book distribution drives, free tutoring sessions, and community workshops. Join us to make a difference!
          </p>
        </div>

        
        {loading ? (
          <div className="text-center py-20 text-slate-400">
            <p>Loading upcoming events...</p>
          </div>
        ) : events.length === 0 ? (
          
          <div className="text-center py-20 bg-slate-800/40 border border-slate-800 rounded-3xl max-w-xl mx-auto">
            <p className="text-slate-400 text-base mb-4">No upcoming events are scheduled right now.</p>
            <Link
              href="/create-event"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm"
            >
              Create an Event
            </Link>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UpcomingEventsPage;