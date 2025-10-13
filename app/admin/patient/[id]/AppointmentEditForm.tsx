"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Save, X, CalendarDays, Clock, Repeat } from "lucide-react";

interface Appointment {
  id: string;
  providerName: string;
  startAt: string | Date;
  repeat: string;
}

interface AppointmentEditFormProps {
  appointment: Appointment;
  patientId: string;
}

export default function AppointmentEditForm({ appointment }: AppointmentEditFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    providerName: appointment.providerName,
    startAt: new Date(appointment.startAt).toISOString().slice(0, 16),
    repeat: appointment.repeat,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: appointment.id,
          ...formData,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        console.error("Failed to update appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch("/api/appointments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appointment.id }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Edit Appointment</span>
        </div>
        <input
          name="providerName"
          placeholder="Provider Name"
          value={formData.providerName}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
          required
        />
        <input
          name="startAt"
          type="datetime-local"
          value={formData.startAt}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
          required
        />
        <select
          name="repeat"
          value={formData.repeat}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
        >
          <option value="NONE">None</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 flex items-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <CalendarDays className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <div className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
            {appointment.providerName}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(appointment.startAt).toLocaleDateString('en-US', { 
                month: '2-digit',
                day: '2-digit', 
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(appointment.startAt).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              })}
            </span>
            <span className="flex items-center gap-1">
              <Repeat className="w-3 h-3" />
              {appointment.repeat.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2"
        >
          <Pencil size={16} /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
