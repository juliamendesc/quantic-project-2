import { NextResponse } from "next/server";
import { contactInfo } from "@/mocks/serverData";
import { delay } from "@/utils/common";

export async function GET() {
  await delay(800); // Optimized for better performance (NFR-1)
  return NextResponse.json({ contactInfo });
}
