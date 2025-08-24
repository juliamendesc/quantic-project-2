import { NextRequest, NextResponse } from "next/server";
import { delay } from "@/utils/common";

type Reservation = {
  time: string;
  guests: number;
  name: string;
  email: string;
  phone?: string;
  tableNumber: number;
};

const reservations: Reservation[] = [
  {
    time: "2025-08-23T19:00",
    guests: 2,
    name: "Alice",
    email: "alice@example.com",
    phone: "123-456-7890",
    tableNumber: 15,
  },
];

// Function to assign a random table from 1-30
function assignRandomTable(): number {
  return Math.floor(Math.random() * 30) + 1;
}

export async function GET() {
  await delay(800); // Optimized for better performance (NFR-1)
  return NextResponse.json({ reservations });
}

export async function POST(req: NextRequest) {
  await delay(1000); // Optimized for better performance (NFR-2)
  try {
    const data = await req.json();
    // Type guard for Reservation
    if (
      typeof data.time === "string" &&
      typeof data.guests === "number" &&
      typeof data.name === "string" &&
      typeof data.email === "string"
    ) {
      // Assign a random table number from 1-30 (FR-8 requirement)
      const tableNumber = assignRandomTable();

      const reservation: Reservation = {
        time: data.time,
        guests: data.guests,
        name: data.name,
        email: data.email,
        phone: typeof data.phone === "string" ? data.phone : undefined,
        tableNumber,
      };
      reservations.push(reservation);
      return NextResponse.json({
        message: `Reservation confirmed! You have been assigned table ${tableNumber}.`,
        data: reservation,
      });
    } else {
      return NextResponse.json(
        { message: "Invalid reservation data." },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Error processing reservation." },
      { status: 500 }
    );
  }
}
