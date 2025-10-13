import { prisma } from "@/lib/db";
import Link from "next/link";
import { Users, Eye, UserPlus, Calendar, Pill } from "lucide-react";

export default async function AdminPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { firstName: "asc" },
    include: {
      appointments: true,
      prescriptions: true,
    },
  });

  const totalAppointments = patients.reduce((sum, p) => sum + p.appointments.length, 0);
  const totalPrescriptions = patients.reduce((sum, p) => sum + p.prescriptions.length, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Zealthy EMR
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage patient records, appointments, and prescriptions with our comprehensive Electronic Medical Record system.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{patients.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Patients</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalAppointments}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Pill className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalPrescriptions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prescriptions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Patient Directory</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage all patient records and medical information</p>
          </div>
          <Link
            href="/admin/new-patient"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            <UserPlus className="w-5 h-5" />
            Add New Patient
          </Link>
        </div>

        {/* Patients Table */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Patient</th>
                  <th className="px-6 py-4 text-left font-semibold">Contact</th>
                  <th className="px-6 py-4 text-center font-semibold">Appointments</th>
                  <th className="px-6 py-4 text-center font-semibold">Prescriptions</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-12">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">No patients found</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">Get started by adding your first patient</p>
                        </div>
                        <Link
                          href="/admin/new-patient"
                          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
                          Add Patient
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  patients.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {p.firstName[0]}{p.lastName[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">
                              {p.firstName} {p.lastName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Patient ID: {p.id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-gray-800 dark:text-gray-100">{p.email}</p>
                          {p.phone && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">{p.phone}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                          <Calendar className="w-4 h-4" />
                          {p.appointments.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                          <Pill className="w-4 h-4" />
                          {p.prescriptions.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/admin/patient/${p.id}`}
                          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
