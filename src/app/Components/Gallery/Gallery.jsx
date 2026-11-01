"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual backend URL or environment variable (e.g. process.env.NEXT_PUBLIC_API_URL)
    fetch("http://localhost:5000/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGalleryItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading gallery photographs...
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Community <span className="text-indigo-400">Gallery</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Glimpses of our recent book distribution drives, free tutoring sessions, and community empowerment events.
          </p>
        </div>

        {/* Uniform Grid Layout (2 or 3 columns as per your rules) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <GalleryCard key={item._id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;