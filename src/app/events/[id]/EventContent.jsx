import React from "react";
export const dynamic = "force-dynamic";
import { FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import JoinButton from "../../Components/JoinButton";
import Image from "next/image";

const EventContent = async({ params }) => {

    const { id } = await params;

  let event = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      event = await res.json();
    }
  } catch (error) {
    console.log(error);
  }

  if (!event) {
    return <p className="text-center py-20">Event not found!</p>;
  }
    return (
        <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-4xl mx-auto">
        
     
        <Link href="/upcoming-events" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium mb-8 transition">
          <FaArrowLeft size={12} /> Back to Events
        </Link>

        
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl">
          
         
          <div className="relative h-72 sm:h-96 w-full bg-slate-900">
            <Image
            width={800}
            height={400}
            
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
              {event.eventType || "Drive"}
            </span>
          </div>

        
          <div className="p-6 sm:p-10 space-y-6">
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {event.title}
            </h1>

            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-700/60 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FaCalendarAlt size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Event Date</p>
                  <p className="font-semibold text-white">
                    {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="font-semibold text-white truncate max-w-[200px]">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FaUserAlt size={16} />
                </div>
              <div>
                  <p className="text-xs text-slate-400">Organizer</p>
                  <p className="font-semibold text-white truncate max-w-[200px]">{event.userName || "EduCare Admin"}</p>
                </div>
              </div>
            </div>

           
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">About This Event</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            
            <div className="pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Ready to make an impact?</p>
                <p className="text-sm font-medium text-slate-200">Register as an active volunteer participant for this drive.</p>
              </div>

              <JoinButton event={event} />
            </div>

          </div>

        </div>

      </div>
    </div>
    );
};

export default EventContent;