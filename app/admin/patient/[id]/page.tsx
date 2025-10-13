import { prisma } from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { CalendarDays, ClipboardList, ArrowLeft } from "lucide-react";
import PatientEditForm from "./PatientEditForm";
import AppointmentEditForm from "./AppointmentEditForm";
import PrescriptionEditForm from "./PrescriptionEditForm";
import type { Repeat, RefillSchedule } from "@prisma/client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PatientDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch patient and medication data
  const [patient, medications] = await Promise.all([
    prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
        prescriptions: { include: { medication: true } },
      },
    }),
    prisma.medication.findMany(),
  ]);

  if (!patient)
    return (
      <main className="p-8">
        <p className="text-center text-gray-600 dark:text-gray-300">
          Patient not found.
        </p>
      </main>
    );

  return (
    <main className="p-8 space-y-8 min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      {/* Back Button */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
      >
        <ArrowLeft size={18} /> Back to Patients
      </Link>

      {/* Patient Header */}
      <section className="bg-white dark:bg-[#111] rounded-2xl shadow p-6 border border-gray-200 dark:border-gray-800">
        <PatientEditForm patient={patient} patientId={id} />
      </section>

      {/* --- Appointments Section --- */}
      <section className="bg-white dark:bg-[#111] rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-blue-600 text-xl font-semibold flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <CalendarDays size={20} />
          </div>
          Appointments
        </h2>

        {patient.appointments.length ? (
          <ul className="space-y-4">
            {patient.appointments.map((a) => (
              <li
                key={a.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200 hover:shadow-md"
              >
                <AppointmentEditForm appointment={a} patientId={id} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">No appointments scheduled</p>
          </div>
        )}

        {/* Add New Appointment Form */}
        <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-100">
          Add New Appointment
        </h3>
        <form
          action={async (formData) => {
            "use server";
            const providerName = formData.get("providerName")?.toString();
            const startAt = formData.get("startAt")?.toString();
            const repeat = formData.get("repeat")?.toString() || "NONE";

            if (!providerName || !startAt) return;

            await prisma.appointment.create({
              data: {
                patientId: id,
                providerName,
                startAt: new Date(startAt),
                repeat: repeat as Repeat,
              },
            });

            revalidatePath(`/admin/patient/${id}`);
          }}
          className="space-y-3 mt-3 bg-gray-50 dark:bg-[#0a0a0a] p-4 rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <input
            name="providerName"
            placeholder="Provider Name"
            required
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          <input
            name="startAt"
            type="datetime-local"
            required
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          <select
            name="repeat"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="NONE">None</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
            Add Appointment
          </button>
        </form>
      </section>

      {/* --- Prescriptions Section --- */}
      <section className="bg-white dark:bg-[#111] rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-purple-600 text-xl font-semibold flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <ClipboardList size={20} />
          </div>
          Prescriptions
        </h2>

        {patient.prescriptions.length ? (
          <ul className="space-y-4">
            {patient.prescriptions.map((r) => (
              <li
                key={r.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all duration-200 hover:shadow-md"
              >
                <PrescriptionEditForm prescription={r} patientId={id} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">No prescriptions assigned</p>
          </div>
        )}

        {/* Add New Prescription Form */}
        <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-100">
          Add New Prescription
        </h3>
        <form
          action={async (formData) => {
            "use server";
            const medicationId = formData.get("medicationId")?.toString();
            const dosage = formData.get("dosage")?.toString();
            const quantity = Number(formData.get("quantity"));
            const refillDate = formData.get("refillDate")?.toString();
            const refillSchedule = formData.get("refillSchedule")?.toString() || "NONE";

            if (!medicationId || !dosage || !quantity) return;

            await prisma.prescription.create({
              data: {
                patientId: id,
                medicationId,
                dosage,
                quantity,
                refillDate: refillDate ? new Date(refillDate) : null,
                refillSchedule: refillSchedule as RefillSchedule,
              },
            });

            revalidatePath(`/admin/patient/${id}`);
          }}
          className="space-y-3 mt-3 bg-gray-50 dark:bg-[#0a0a0a] p-4 rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <select
            name="medicationId"
            required
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Medication</option>
            {medications.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <input
            name="dosage"
            placeholder="Dosage (e.g., 10mg)"
            required
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            required
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          <input
            name="refillDate"
            type="date"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          />
          <select
            name="refillSchedule"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="NONE">None</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
            Add Prescription
          </button>
        </form>
      </section>
    </main>
  );
}
