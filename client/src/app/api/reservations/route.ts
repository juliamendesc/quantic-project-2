import { NextRequest, NextResponse } from "next/server";
import { delay } from "@/utils/common";

type Reservation = {
  time: string;
  guests: number;
  name: string;
  email: string;
  phone?: string;
};

const reservations: Reservation[] = [
  {
    time: "2025-08-23T19:00",
    guests: 2,
    name: "Alice",
    email: "alice@example.com",
    phone: "123-456-7890",
  },
];

export async function GET() {
  await delay(3000);
  return NextResponse.json({ reservations });
}

export async function POST(req: NextRequest) {
  await delay(3000);
  try {
    const data = await req.json();
    // Type guard for Reservation
    if (
      typeof data.time === "string" &&
      typeof data.guests === "number" &&
      typeof data.name === "string" &&
      typeof data.email === "string"
    ) {
      const reservation: Reservation = {
        time: data.time,
        guests: data.guests,
        name: data.name,
        email: data.email,
        phone: typeof data.phone === "string" ? data.phone : undefined,
      };
      reservations.push(reservation);
      return NextResponse.json({
        message: "Reservation received!",
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
