import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";

const ManageEventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/50 transition-all flex flex-col h-full group">
      
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <Image
          width={400}
          height={300}
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {event.eventType || "Drive"}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <h3 className="text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-400 transition">
          {event.title}
        </h3>

        <p className="text-slate-300 text-sm line-clamp-2 flex-grow">
          {event.description}
        </p>

        <div className="pt-2 border-t border-slate-700/60 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-indigo-400" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-400" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-auto grid grid-cols-2 gap-3">
          <button
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white font-medium py-2 rounded-xl border border-slate-700 transition text-xs shadow"
          >
            <FaEdit size={12} /> Update
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white font-medium py-2 rounded-xl border border-slate-700 transition text-xs shadow"
          >
            <FaTrash size={12} /> Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ManageEventCard;