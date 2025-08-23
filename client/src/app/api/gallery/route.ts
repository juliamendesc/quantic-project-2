import { NextResponse } from "next/server";
import { galleryImages, awards, reviews } from "@/mocks/serverData";
import { delay } from "@/utils/common";

export async function GET() {
  await delay(800); // Optimized for better performance (NFR-1)
  return NextResponse.json({ galleryImages, awards, reviews });
}
