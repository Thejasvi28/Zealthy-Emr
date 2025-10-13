"use client";

import { motion } from "framer-motion";
import { CalendarDays, Pill, LogOut, User, PlusCircle, Heart, Bell, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Appointment {
  id: string;
  providerName: string;
  startAt: string | Date;
  repeat?: string | null;
}

interface Medication {
  name: string;
}

interface Prescription {
  id: string;
  dosage?: string | null;
  refillDate?: string | Date | null;
  refillSchedule?: string | null;
  medication: Medication;
}

interface PatientData {
  firstName: string;
  upcoming: Appointment[];
  refills: Prescription[];
}

export default function PortalDashboardClient({ patient }: { patient: PatientData }) {
  const { firstName, upcoming, refills } = patient;

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* --- Top Nav --- */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Zealthy Portal
            </h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/portal" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
              Home
            </Link>
            <Link href="/portal/appointments" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
              Appointments
            </Link>
            <Link href="/portal/prescriptions" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">
              Prescriptions
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/";
              }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </div>
      </header>

      {/* --- Welcome Banner --- */}
      <section className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-12 text-center shadow-lg overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Welcome back, {firstName}! 👋
          </h2>
          <p className="text-xl text-white/90 mb-6">
            Your health dashboard is ready. Here&apos;s what&apos;s coming up this week.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CalendarDays className="w-5 h-5" />
                <span className="text-sm font-medium">Appointments</span>
              </div>
              <p className="text-2xl font-bold">{upcoming.length}</p>
              <p className="text-sm text-white/80">This week</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Pill className="w-5 h-5" />
                <span className="text-sm font-medium">Refills</span>
              </div>
              <p className="text-2xl font-bold">{refills.length}</p>
              <p className="text-sm text-white/80">Due soon</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <p className="text-2xl font-bold">Good</p>
              <p className="text-sm text-white/80">Health</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Dashboard Content --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Upcoming Appointments --- */}
        <motion.section
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              Upcoming Appointments
            </h2>
            <Link
              href="/portal/appointments"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              View All
            </Link>
          </div>

          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((a, index) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                          {a.providerName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Clock className="w-4 h-4" />
                        {new Date(a.startAt).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                          {a.repeat || "One-time"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</div>
                      <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Confirmed
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <CalendarDays className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No upcoming appointments
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-4">
                You&apos;re all caught up! No appointments scheduled for this week.
              </p>
              <Link
                href="/portal/appointments"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Schedule Appointment
              </Link>
            </div>
          )}
        </motion.section>

        {/* --- Upcoming Refills --- */}
        <motion.section
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-gray-100">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Pill className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              Upcoming Refills
            </h2>
            <Link
              href="/portal/prescriptions"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              View All
            </Link>
          </div>

          {refills.length > 0 ? (
            <div className="space-y-4">
              {refills.map((r, index) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                          {r.medication.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Pill className="w-4 h-4" />
                        {r.dosage}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                          {r.refillSchedule || "One-time"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Refill by</div>
                      <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-xs font-medium">
                        <Bell className="w-3 h-3" />
                        {r.refillDate
                          ? new Date(r.refillDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <Pill className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No refills due
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-4">
                All your prescriptions are up to date. No refills needed this week.
              </p>
              <Link
                href="/portal/prescriptions"
                className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Pill className="w-4 h-4" />
                Manage Prescriptions
              </Link>
            </div>
          )}
        </motion.section>
      </div>

      {/* --- Quick Actions Footer --- */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Zealthy
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Your trusted partner in healthcare management. Secure, reliable, and always accessible.
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Link href="/portal/profile" className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <User size={16} /> View Profile
                </Link>
                <Link href="/portal/appointments" className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <CalendarDays size={16} /> Schedule Appointment
                </Link>
                <Link href="/portal/prescriptions" className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <PlusCircle size={16} /> Request Refill
                </Link>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Support</h4>
              <div className="space-y-3">
                <a href="/help" className="block text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Help Center
                </a>
                <a href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Contact Support
                </a>
                <a href="/privacy" className="block text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} Zealthy Health. All rights reserved. | HIPAA Compliant
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
