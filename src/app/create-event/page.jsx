
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaImage,
  FaTag,
  FaAlignLeft,
  FaPlusCircle,
} from "react-icons/fa";

const CreateEventPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "Donation",
    thumbnail: "",
    location: "",
    date: "",
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(formData.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      toast.error("You cannot select a past date.");
      return;
    }

    if (!session?.user?.email) {
      toast.error("You must be logged in to create an event.");
      return;
    }

    setLoading(true);

    
      const eventData = {
        ...formData,
        createdAt: new Date(),
      };

      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Event created successfully!");
        router.push("/upcoming-events");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to create event.");
      }
    
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        Loading session...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>

        <p className="text-slate-400 mb-6">
          You must be logged in to access the Create Event page.
        </p>

        <a
          href="/sign-in"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-3xl mx-auto bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl">

        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-2 shadow-inner">
            <FaPlusCircle size={22} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Create New Community <span className="text-indigo-400">Event</span>
          </h1>

          <p className="text-slate-300 text-sm">
            Fill in the details below to organize a book distribution or free tutoring drive.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Winter Book Distribution 2026"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaTag className="text-indigo-400 text-xs" />
                Event Type
              </label>

              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Donation">Donation (Books/Clothes)</option>
                <option value="Cleanup">Cleanup Drive</option>
                <option value="Plantation">Tree Plantation</option>
                <option value="Tutoring">Free Tutoring Session</option>
                <option value="Workshop">Study Skills Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-400 text-xs" />
                Event Date
              </label>

              <input
                type="date"
                name="date"
                required
                min={todayDate}
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <FaImage className="text-indigo-400 text-xs" />
              Thumbnail Image URL
            </label>

            <input
              type="url"
              name="thumbnail"
              required
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-400 text-xs" />
              Location
            </label>

            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Chittagong Community School Hall"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <FaAlignLeft className="text-indigo-400 text-xs" />
              Description
            </label>

            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the event, objectives, and what volunteers should bring..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/20 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Creating Event..." : "Publish Event"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
