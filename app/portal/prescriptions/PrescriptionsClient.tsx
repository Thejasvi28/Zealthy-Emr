"use client";

import { motion } from "framer-motion";
import { Pill, RefreshCw, CalendarClock, ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";

interface Medication {
  name: string;
}

interface Prescription {
  id: string;
  dosage: string;
  quantity: number;
  refillDate?: string | Date | null;
  refillSchedule?: string | null;
  medication: Medication;
}

export default function PrescriptionsClient({
  prescriptions,
}: {
  prescriptions: Prescription[];
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold flex items-center gap-2 tracking-wide">
          <Pill size={22} /> My Prescriptions
        </h1>
        <Link
          href="/portal"
          className="text-sm underline hover:text-green-100 flex items-center gap-1 transition"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {prescriptions.length > 0 ? (
          <motion.section
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {prescriptions.map((p) => {
              const refillDate = p.refillDate
                ? new Date(p.refillDate).toLocaleDateString()
                : "—";

              const refillSchedule =
                p.refillSchedule === "NONE"
                  ? "One-time"
                  : p.refillSchedule
                  ? p.refillSchedule.charAt(0).toUpperCase() +
                    p.refillSchedule.slice(1).toLowerCase()
                  : "Unknown";

              const isActive =
                p.refillDate && new Date(p.refillDate) > new Date();

              return (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-green-400 transition-all"
                >
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                      <Pill className="text-green-600" />{" "}
                      {p.medication?.name || "Unknown"}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {refillSchedule}
                    </span>
                  </div>

                  {/* Info Lines */}
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>
                      Dosage:{" "}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {p.dosage}
                      </span>
                    </p>
                    <p>
                      Quantity:{" "}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {p.quantity}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-sm mt-2">
                      <CalendarClock
                        size={14}
                        className="text-green-600 shrink-0"
                      />
                      <span>
                        Refill by:{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {refillDate}
                        </span>
                      </span>
                    </p>
                  </div>

                  {/* Status line */}
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <RefreshCw size={12} /> {isActive ? "Active refill" : "Expired refill"}
                    </span>
                    <Link
                      href="/portal/prescriptions"
                      className="text-green-600 hover:underline font-medium"
                    >
                      Manage
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.section>
        ) : (
          <motion.div
            className="text-center text-gray-600 dark:text-gray-400 mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Pill className="w-10 h-10 mx-auto mb-3 text-green-600 opacity-70" />
            <p className="text-lg">No prescriptions found.</p>
            <Link
              href="/portal/appointments"
              className="inline-flex items-center gap-1 text-green-600 hover:underline text-sm mt-3"
            >
              <PlusCircle size={14} /> Schedule a new appointment
            </Link>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 bg-white dark:bg-gray-950 mt-10">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/portal" className="hover:text-green-600">
            Dashboard
          </Link>
          <Link href="/portal/appointments" className="hover:text-green-600">
            Appointments
          </Link>
          <Link href="/portal/prescriptions" className="hover:text-green-600">
            Manage Prescriptions
          </Link>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} Zealthy Health. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
