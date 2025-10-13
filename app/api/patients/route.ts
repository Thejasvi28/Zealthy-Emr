import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, phone, address, city, state, zip, dob } = await req.json();

    const existing = await prisma.patient.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await prisma.patient.create({
      data: { 
        firstName, 
        lastName, 
        email, 
        passwordHash: hashedPassword,
        phone: phone || null,
        address: address || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        dob: dob ? new Date(dob) : null,
      },
    });

    // Don't return the password hash
    const { passwordHash: _, ...patientWithoutPassword } = patient;
    return NextResponse.json(patientWithoutPassword);
  } catch (err) {
    console.error("Error creating patient:", err);
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 });
  }
}
