import React from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const GalleryCard = ({ item }) => {
  return (
    <div className="card bg-slate-800/50 border border-slate-700/80 shadow-xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full rounded-2xl overflow-hidden">
      
  
      <figure className="relative h-52 overflow-hidden m-0">
        <Image
          width={400}
          height={300}
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="badge badge-primary font-semibold shadow-md px-3 py-2 text-xs">
            {item.category}
          </span>
        </div>
      </figure>

     
      <div className="card-body p-5 flex flex-col flex-grow justify-between">
        <div className="space-y-3">
          <h3 className="card-title text-xl font-bold text-white tracking-tight">
            {item.title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

     
        <div className="pt-3 mt-4 border-t border-slate-700/60 space-y-2 text-xs text-slate-400">
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