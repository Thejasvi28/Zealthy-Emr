import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, phone, address, city, state, zip, dob } = body;

    const { id } = await params;
    
    // Check if email is being changed and if it already exists
    if (email) {
      const existingPatient = await prisma.patient.findFirst({
        where: { 
          email,
          id: { not: id }
        }
      });
      
      if (existingPatient) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
      }
    }

    // Prepare update data - handle empty strings properly
    const updateData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string | null;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      zip?: string | null;
      dob?: Date | null;
      passwordHash?: string;
    } = {
      firstName,
      lastName,
      email,
      phone: phone || null,
      address: address || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
      dob: dob ? new Date(dob) : null,
    };
    
    // Hash password if provided
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: id },
      data: updateData,
    });

    // Don't return the password hash
    const { passwordHash: _, ...patientWithoutPassword } = updatedPatient;
    
    return NextResponse.json(patientWithoutPassword);
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json({ error: "Failed to update patient" }, { status: 500 });
  }
}
