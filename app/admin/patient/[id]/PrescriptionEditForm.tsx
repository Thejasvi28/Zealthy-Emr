"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Save, X, Pill, CalendarClock, Package } from "lucide-react";
import { formatDateOnly, formatDateDisplay } from "@/lib/dateUtils";

interface Medication {
  name: string;
}

interface Prescription {
  id: string;
  dosage: string;
  quantity: number;
  refillDate?: string | Date | null;
  refillSchedule: string;
  medication: Medication;
}

interface PrescriptionEditFormProps {
  prescription: Prescription;
  patientId: string;
}

export default function PrescriptionEditForm({ prescription, patientId }: PrescriptionEditFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    dosage: prescription.dosage,
    quantity: prescription.quantity,
    refillDate: prescription.refillDate 
      ? formatDateOnly(prescription.refillDate)
      : "",
    refillSchedule: prescription.refillSchedule,
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
      const response = await fetch(`/api/patients/${patientId}/prescriptions/${prescription.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        console.error("Failed to update prescription");
      }
    } catch (error) {
      console.error("Error updating prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this prescription?")) return;

    try {
      const response = await fetch(`/api/patients/${patientId}/prescriptions/${prescription.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete prescription");
      }
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
        <div className="flex items-center gap-2 mb-3">
          <Pill className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
            Editing: {prescription.medication.name}
          </span>
        </div>
        <input
          name="dosage"
          placeholder="Dosage (e.g., 10mg)"
          value={formData.dosage}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
          required
        />
        <input
          name="quantity"
          type="number"
          min="1"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
          required
        />
        <input
          name="refillDate"
          type="date"
          value={formData.refillDate}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
        />
        <select
          name="refillSchedule"
          value={formData.refillSchedule}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
        >
          <option value="NONE">None</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
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
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Pill className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <div className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
            {prescription.medication.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Pill className="w-3 h-3" />
              {prescription.dosage}
            </span>
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              Qty: {prescription.quantity}
            </span>
            <span className="flex items-center gap-1">
              <CalendarClock className="w-3 h-3" />
              Refill: {prescription.refillDate
                ? formatDateDisplay(prescription.refillDate)
                : "—"}
            </span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
              {prescription.refillSchedule.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2"
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
