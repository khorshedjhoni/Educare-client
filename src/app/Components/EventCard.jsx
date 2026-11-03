"use client";

import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Date Not Available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/50 transition-all flex flex-col h-full group">
      
      <div className="relative h-52 overflow-hidden bg-slate-900">
        <Image 
          src={event?.thumbnail || "https://images.unsplash.com/photo-1532012197267-da84d127e765"} 
          alt={event?.title || "Event thumbnail"} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
          {event?.eventType || "Drive"}
        </span>
      </div>

   
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-400 transition">
          {event?.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 flex-grow">
          {event?.description}
        </p>

        
        <div className="pt-3 border-t border-slate-700/60 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-indigo-400" />
            <span>
              {formatDate(event?.date || event?.eventDate || event?.startDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-400" />
            <span className="truncate">{event?.location}</span>
          </div>
        </div>

       
        <div className="pt-2">
          <Link
            href={`/events/${event?._id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white font-medium py-2.5 rounded-xl border border-slate-700 transition text-xs"
          >
            View Details & Join <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;