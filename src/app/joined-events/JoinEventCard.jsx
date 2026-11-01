import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaClock, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const JoinedEventCard = ({ event }) => {

  const { eventId, eventTitle, eventDate, location, thumbnail, joinedAt } = event;
    const joinedDateValue = joinedAt?.$date || joinedAt;
  return (
    <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/50 transition-all flex flex-col h-full group">
      
   
      <div className="relative h-52 overflow-hidden bg-slate-900">
        <Image
          width={400}
          height={300}
          src={thumbnail || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9"}
          alt={eventTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      
        <span className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-500/30">
          <FaCheckCircle size={12} className="text-emerald-200" /> Joined Event
        </span>
      </div>

      
      <div className="p-5 flex flex-col flex-grow space-y-4">
        
        
        <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-400 transition">
          {eventTitle}
        </h3>

      
        <div className="pt-3 border-t border-slate-700/60 space-y-2.5 text-xs text-slate-300">
          
          
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <FaCalendarAlt size={12} />
            </div>
            <span>
              <strong className="text-slate-400">Event Date:</strong>{" "}
              {eventDate
                ? new Date(eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Date TBA"}
            </span>
          </div>

          
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <FaMapMarkerAlt size={12} />
            </div>
            <span className="truncate">
              <strong className="text-slate-400">Location:</strong> {location }
            </span>
          </div>

          
          {joinedAt && (
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <FaClock size={12} />
              </div>
              <span className="truncate">
                <strong className="text-slate-400">Joined On:</strong>{" "}
                {new Date(joinedDateValue).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                 
                })}
              </span>
            </div>
          )}

        </div>

       
        <div className="pt-2 mt-auto">
          <Link
            href={`/events/${eventId}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white font-medium py-2.5 rounded-xl border border-slate-700 transition text-xs shadow-md group-hover:border-indigo-500/50"
          >
            View Event Details <FaArrowRight size={12} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default JoinedEventCard;