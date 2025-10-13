import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// DELETE — Remove a prescription
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; prescriptionId: string }> }
) {
  try {
    const { prescriptionId } = await params;
    await prisma.prescription.delete({
      where: { id: prescriptionId },
    });

    return NextResponse.json(
      { message: "Prescription deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting prescription:", error);
    return NextResponse.json(
      { error: "Failed to delete prescription" },
      { status: 500 }
    );
  }
}

// PUT — Update a prescription
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; prescriptionId: string }> }
) {
  try {
    const { prescriptionId } = await params;
    const body = await req.json();
    const { dosage, quantity, refillDate, refillSchedule } = body;

    // Validation
    if (!prescriptionId) {
      return NextResponse.json(
        { error: "Missing prescription ID" },
        { status: 400 }
      );
    }

    // Update the prescription
    // Parse refillDate without timezone conversion
    let parsedRefillDate = null;
    if (refillDate) {
      // Format: YYYY-MM-DD from date input
      parsedRefillDate = new Date(refillDate + 'T00:00:00.000Z');
    }

    const updatedPrescription = await prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        dosage,
        quantity: Number(quantity),
        refillDate: parsedRefillDate,
        refillSchedule,
      },
    });

    return NextResponse.json(updatedPrescription, { status: 200 });
  } catch (error) {
    console.error("Error updating prescription:", error);
    return NextResponse.json(
      { error: "Failed to update prescription" },
      { status: 500 }
    );
  }
}
