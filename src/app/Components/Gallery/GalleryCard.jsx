import React from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const GalleryCard = ({ item }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/50 transition-all flex flex-col h-full">
      {/* Image Header with Category Badge */}
      <div className="relative h-52 overflow-hidden">
        <Image
            width={400}
            height={300}
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {item.category}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <h3 className="text-xl font-bold text-white tracking-tight">
          {item.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed flex-grow">
          {item.description}
        </p>

        {/* Metadata Details */}
        <div className="pt-3 border-t border-slate-700/60 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-indigo-400" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-400" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-emerald-400" />
            <span className="font-semibold text-emerald-400">{item.stats}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;