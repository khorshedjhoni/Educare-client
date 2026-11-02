import React from "react";
import toast from "react-hot-toast";

export default function EditEventForm({ event, onSubmit, onClose }) {
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const title = form.title.value.trim();
    const eventType = form.eventType.value.trim();
    const date = form.date.value;
    const location = form.location.value.trim();
    const thumbnail = form.thumbnail.value.trim();
    const description = form.description.value.trim();

    if (!title || !eventType || !date || !location || !thumbnail || !description) {
      toast.error("Please fill out all required fields.");
      return;
    }

    
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Event date cannot be in the past.");
      return;
    }

    
    try {
      new URL(thumbnail);
    } catch (_) {
      toast.error("Please enter a valid image URL for the thumbnail.");
      return;
    }

  
    onSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Event Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={event.title}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Event Type
          </label>
          <input
            type="text"
            name="eventType"
            defaultValue={event.eventType}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            defaultValue={event.date}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          defaultValue={event.location}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Thumbnail URL
        </label>
        <input
          type="url"
          name="thumbnail"
          defaultValue={event.thumbnail}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={event.description}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
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
  );
}