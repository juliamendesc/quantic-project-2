import { NextResponse } from "next/server";
import { menuItems } from "@/mocks/serverData";
import { delay } from "@/utils/common";

export async function GET() {
  await delay(3000);
  return NextResponse.json({ menuItems });
}
