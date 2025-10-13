import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * POST — Create Appointment
 */
export async function POST(req: Request) {
  try {
    const { patientId, providerName, startAt, repeat } = await req.json();

    if (!patientId || !providerName || !startAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        providerName,
        startAt: new Date(startAt),
        repeat: repeat?.toUpperCase() ?? "NONE",
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

/**
 * PUT — Update Appointment
 */
export async function PUT(req: Request) {
  const { id, providerName, startAt, repeat } = await req.json();

  if (!id)
    return NextResponse.json(
      { error: "Missing appointment id" },
      { status: 400 }
    );

  try {
    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        providerName,
        startAt: new Date(startAt),
        repeat,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

/**
 * DELETE — Delete Appointment
 */
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id)
    return NextResponse.json(
      { error: "Missing appointment id" },
      { status: 400 }
    );

  try {
    await prisma.appointment.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
