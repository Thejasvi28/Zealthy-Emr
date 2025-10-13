import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PortalDashboardClient from "./PortalDashboardClient";

function inNext7Days(date: Date) {
  const now = new Date();
  const end = new Date();
  end.setDate(now.getDate() + 7);
  return date >= now && date <= end;
}

export default async function PortalDashboard() {
  // Fetch session on server
  const session = await getSession();
  if (!session) redirect("/");

  const patient = await prisma.patient.findUnique({
    where: { id: session.id },
    include: {
      appointments: true,
      prescriptions: { include: { medication: true } },
    },
  });

  if (!patient) return <div className="p-8">Patient not found.</div>;

  // Precompute lists for display
  const upcoming = patient.appointments.filter((a) =>
    inNext7Days(a.startAt)
  );
  const refills = patient.prescriptions.filter(
    (r) => r.refillDate && inNext7Days(r.refillDate)
  );

  //Pass data safely to client component
  return (
    <PortalDashboardClient
      patient={{
        firstName: patient.firstName,
        upcoming,
        refills,
      }}
    />
  );
}
