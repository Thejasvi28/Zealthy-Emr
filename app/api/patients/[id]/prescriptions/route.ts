import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { medicationId, dosage, quantity, refillDate, refillSchedule } = body;

    const prescription = await prisma.prescription.create({
      data: {
        patientId: id,
        medicationId,
        dosage,
        quantity: Number(quantity),
        refillDate: refillDate ? new Date(refillDate) : null,
        refillSchedule,
      },
    });

    return NextResponse.json(prescription, { status: 201 });
  } catch (error) {
    console.error("Error creating prescription:", error);
    return NextResponse.json({ error: "Failed to create prescription" }, { status: 500 });
  }
}
