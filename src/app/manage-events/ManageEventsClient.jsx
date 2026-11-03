"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client"; // Added authClient import
import { FaCog, FaPlus } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import ManageEventCard from "./ManageEventCard";
import Modal from "./Modal";
import EditEventForm from "./EditEventForm";

export default function ManageEventsClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const email = session?.user?.email;

  // Fetch events after session is available
  useEffect(() => {
    if (isPending) return;

    if (!email) {
      router.push("/sign-in");
      return;
    }

    const getEvents = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

      

        const res = await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/events/user?email=${encodeURIComponent(email)}`,
          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       

        const data = await res.json();

        if (res.ok) {
          setEvents(data);
        } else {
          toast.error("Failed to load events.");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setLoadingEvents(false);
      }
    };

    getEvents();
  }, [email, isPending, router]);

  const handleDelete = async (id) => {
    try {
      // FIX: Retrieve token properly inside the function scope
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${id}?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Event deleted successfully!");

        setEvents((previousEvents) =>
          previousEvents.filter((event) => event._id !== id)
        );
      } else {
        toast.error(data.message || "Failed to delete event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

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
      userEmail: email,
    };

    try {
      
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${selectedEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Event updated successfully!");

        setEvents((previousEvents) =>
          previousEvents.map((event) =>
            event._id === selectedEvent._id
              ? { ...event, ...updatedData }
              : event
          )
        );

        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to update event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  if (isPending || loadingEvents) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">
        Loading your events...
      </div>
    );
  }

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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Event Details"
      >
        {selectedEvent && (
          <EditEventForm
            key={selectedEvent._id}
            event={selectedEvent}
            onSubmit={handleUpdateSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}