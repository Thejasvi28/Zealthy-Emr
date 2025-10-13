"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, ArrowLeft, CalendarPlus } from "lucide-react";
import Link from "next/link";

interface Appointment {
  id: string;
  providerName: string;
  startAt: string | Date;
  repeat?: string | null;
  reason?: string | null;
}

export default function AppointmentsClient({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const now = new Date();

  const upcoming = appointments.filter((a) => new Date(a.startAt) > now);
  const past = appointments.filter((a) => new Date(a.startAt) <= now);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold flex items-center gap-2 tracking-wide">
          <CalendarDays size={22} /> My Appointments
        </h1>
        <Link
          href="/portal"
          className="text-sm underline hover:text-green-100 flex items-center gap-1 transition"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Upcoming Appointments */}
        <motion.section
          className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
            <Clock className="text-green-600" /> Upcoming Appointments
          </h2>

          {upcoming.length > 0 ? (
            <ul className="space-y-4">
              {upcoming.map((a) => (
                <motion.li
                  key={a.id}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-gray-700 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                        {a.providerName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(a.startAt).toLocaleString()} •{" "}
                        {a.repeat || "One-time"}
                      </div>
                      {a.reason && (
                        <p className="text-sm text-gray-500 mt-1">
                          Reason: {a.reason}
                        </p>
                      )}
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Upcoming
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              className="text-center text-gray-600 dark:text-gray-400 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CalendarDays className="w-10 h-10 mx-auto mb-2 text-green-600 opacity-70" />
              <p className="text-lg font-medium">No upcoming appointments.</p>
              <Link
                href="/portal/appointments/new"
                className="inline-flex items-center gap-1 text-green-600 hover:underline text-sm mt-3"
              >
                <CalendarPlus size={14} /> Schedule New Appointment
              </Link>
            </motion.div>
          )}
        </motion.section>

        {/* Past Appointments */}
        <motion.section
          className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
            <Clock className="text-green-600" /> Past Appointments
          </h2>

          {past.length > 0 ? (
            <ul className="space-y-4">
              {past.map((a) => (
                <motion.li
                  key={a.id}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                        {a.providerName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(a.startAt).toLocaleString()} •{" "}
                        {a.repeat || "One-time"}
                      </div>
                      {a.reason && (
                        <p className="text-sm text-gray-500 mt-1">
                          Reason: {a.reason}
                        </p>
                      )}
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              className="text-center text-gray-600 dark:text-gray-400 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Clock className="w-10 h-10 mx-auto mb-2 text-green-600 opacity-70" />
              <p className="text-lg font-medium">No past appointments.</p>
            </motion.div>
          )}
        </motion.section>
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
            Prescriptions
          </Link>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} Zealthy Health. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
