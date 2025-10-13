import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import PrescriptionsClient from "./PrescriptionsClient";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function PortalPrescriptions() {
  const cookieStore = await cookies(); // ensure awaited for Next.js 15+
  const token = cookieStore.get("zealthy_session")?.value;
  if (!token) return <div className="p-8">Not logged in.</div>;

  let decoded: { id: string };
  try {
    decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  } catch {
    return <div className="p-8 text-red-500">Invalid session.</div>;
  }

  const list = await prisma.prescription.findMany({
    where: { patientId: decoded.id },
    include: { medication: true },
    orderBy: { createdAt: "desc" },
  });

  // Pass fetched data to client component
  return <PrescriptionsClient prescriptions={list} />;
}
