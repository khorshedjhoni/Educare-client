"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { FaCog, FaPlus } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import ManageEventCard from "./ManageEventCard";
import Modal from "./Modal";

export default function ManageEventsClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events once session is available
  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:5000/events/user?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          setEvents(Array.isArray(data) ? data : []);
          setLoadingEvents(false);
        })
        .catch((err) => {
          console.error("Error fetching user events:", err);
          setLoadingEvents(false);
        });
    }
  }, [session]);

  if (isPending || loadingEvents) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        <p className="animate-pulse">Loading your managed events...</p>
      </div>
    );
  }

  if (!session?.user?.email) {
    router.push("/sign-in");
    return null;
  }

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Event deleted successfully!");
        setEvents(events.filter((ev) => ev._id !== id));
      } else {
        toast.error(data.message || "Failed to delete event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Something went wrong.");
    }
  };

  // Open Update Modal
  const handleEditClick = (eventItem) => {
    setSelectedEvent(eventItem);
    setIsModalOpen(true);
  };

  // Handle Update Form Submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      eventType: form.eventType.value,
      date: form.date.value,
      location: form.location.value,
      thumbnail: form.thumbnail.value,
      description: form.description.value,
    };

    try {
      const res = await fetch(`http://localhost:5000/events/${selectedEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Event updated successfully!");
        setIsModalOpen(false);
        // Update local state smoothly
        setEvents(
          events.map((ev) => (ev._id === selectedEvent._id ? { ...ev, ...updatedData } : ev))
        );
      } else {
        toast.error("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <FaCog />
              <span>Organizer Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Manage Your <span className="text-indigo-400">Events</span>
            </h1>
            <p className="text-slate-300 text-sm">
              Update details or remove community drives you have hosted.
            </p>
          </div>
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/20 text-sm transition"
          >
            <FaPlus /> Create New Event
          </Link>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 border border-slate-800 rounded-3xl max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-white">No Events Created Yet</h3>
            <p className="text-slate-400 text-sm px-6">
              You havent organized any events yet. Get started by creating your first book distribution or tutoring drive!
            </p>
            <Link
              href="/create-event"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
            >
              Create Event Now
            </Link>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <ManageEventCard
                key={event._id}
                event={event}
                onEdit={() => handleEditClick(event)}
                onDelete={() => handleDelete(event._id)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Update Event Details">
        {selectedEvent && (
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                defaultValue={selectedEvent.title}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Event Type</label>
                <input
                  type="text"
                  name="eventType"
                  defaultValue={selectedEvent.eventType}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedEvent.date}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={selectedEvent.location}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                defaultValue={selectedEvent.thumbnail}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={selectedEvent.description}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}