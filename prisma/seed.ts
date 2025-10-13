const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(process.cwd(), "prisma", "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Insert medications
  for (const med of data.medications) {
    await prisma.medication.upsert({
      where: { name: med },
      update: {},
      create: { name: med },
    });
  }

  // Insert users (patients)
  for (const u of data.users) {
    const hash = await bcrypt.hash(u.password, 10);
    const patient = await prisma.patient.create({
      data: {
        email: u.email,
        passwordHash: hash,
        firstName: u.name.split(" ")[0],
        lastName: u.name.split(" ")[1] || "",
      },
    });

    // Appointments
    for (const a of u.appointments) {
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          providerName: a.provider,
          startAt: new Date(a.datetime),
          repeat:
            a.repeat?.toUpperCase() === "WEEKLY"
              ? "WEEKLY"
              : a.repeat?.toUpperCase() === "MONTHLY"
              ? "MONTHLY"
              : "NONE",
        },
      });
    }

    // Prescriptions
    for (const p of u.prescriptions) {
      const med = await prisma.medication.findUnique({
        where: { name: p.medication },
      });
      if (!med) continue;

      await prisma.prescription.create({
        data: {
          patientId: patient.id,
          medicationId: med.id,
          dosage: p.dosage,
          quantity: p.quantity,
          refillDate: new Date(p.refill_on),
          refillSchedule:
            p.refill_schedule?.toUpperCase() === "MONTHLY"
              ? "MONTHLY"
              : "NONE",
        },
      });
    }
  }

  console.log(" Seeded successfully!");
}

main()
  .catch((e) => {
    console.error(" Error seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
