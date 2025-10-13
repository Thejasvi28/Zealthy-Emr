import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// ✏️ Update Prescription
export async function PUT(req: Request) {
  try {
    const { id, dosage, quantity, refillDate, refillSchedule } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing prescription id" }, { status: 400 });
    }

    const updated = await prisma.prescription.update({
      where: { id },
      data: {
        dosage,
        quantity: Number(quantity),
        refillDate: refillDate ? new Date(refillDate) : null,
        refillSchedule: refillSchedule?.toUpperCase() ?? "NONE",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating prescription:", error);
    return NextResponse.json(
      { error: "Failed to update prescription" },
      { status: 500 }
    );
  }
}

// 🗑️ Delete Prescription
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing prescription id" }, { status: 400 });
    }

    await prisma.prescription.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prescription:", error);
    return NextResponse.json(
      { error: "Failed to delete prescription" },
      { status: 500 }
    );
  }
}
