import { NextRequest, NextResponse } from "next/server";
import { delay } from "@/utils/common";
import { unavailableSlots } from "@/mocks/serverData";

export async function GET(req: NextRequest) {
  await delay(500); // Simulate API delay

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (date) {
    // Return unavailable slots for a specific date
    const unavailableForDate = unavailableSlots.find(
      (slot) => slot.date === date
    );
    return NextResponse.json({
      date,
      unavailableTimeSlots: unavailableForDate?.timeSlots || [],
    });
  } else {
    // Return all unavailable slots
    return NextResponse.json({ unavailableSlots });
  }
}
