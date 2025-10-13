import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import AppointmentsClient from "./AppointmentsClient";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function AppointmentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("zealthy_session")?.value;
  if (!token) return <div className="p-8">Not logged in.</div>;

  let decoded: { id: string };
  try {
    decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  } catch {
    return <div className="p-8 text-red-500">Invalid session.</div>;
  }

  const list = await prisma.appointment.findMany({
    where: { patientId: decoded.id },
    orderBy: { startAt: "asc" },
  });

  return <AppointmentsClient appointments={list} />;
}
