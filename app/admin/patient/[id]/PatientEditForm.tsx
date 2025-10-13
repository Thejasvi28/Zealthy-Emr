"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  dob?: Date | null;
}

interface PatientEditFormProps {
  patient: Patient;
  patientId: string;
}

export default function PatientEditForm({ patient, patientId }: PatientEditFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone || "",
    address: patient.address || "",
    city: patient.city || "",
    state: patient.state || "",
    zip: patient.zip || "",
    dob: patient.dob ? new Date(patient.dob).toISOString().split('T')[0] : "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
        router.refresh(); // Refresh the page to show updated data
      } else {
        const errorData = await response.json();
        console.error("Failed to update patient:", errorData.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-green-600 mb-2">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">{patient.email}</p>
          {patient.phone && <p className="text-gray-700 dark:text-gray-300">{patient.phone}</p>}
          {patient.address && (
            <p className="text-gray-700 dark:text-gray-300">
              {patient.address}, {patient.city}, {patient.state} {patient.zip}
            </p>
          )}
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200"
        >
          {isEditing ? "Cancel" : "Edit Patient Info"}
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 mt-4 bg-gray-50 dark:bg-[#0a0a0a] p-4 rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
            />
            <input
              name="zip"
              placeholder="ZIP"
              value={formData.zip}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <input
            name="dob"
            type="date"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Patient"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
