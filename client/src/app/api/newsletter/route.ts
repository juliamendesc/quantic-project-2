import { NextRequest, NextResponse } from "next/server";
import { delay } from "@/utils/common";

// Mock newsletter list
const newsletterList: string[] = ["alice@example.com", "bob@example.com"];

export async function GET() {
  await delay(3000);
  return NextResponse.json({ emails: newsletterList });
}

export async function POST(req: NextRequest) {
  await delay(3000);
  try {
    const { email } = await req.json();
    // Simulate saving to mock list
    newsletterList.push(email);
    return NextResponse.json({
      message: "Email registered for newsletter!",
      email,
    });
  } catch {
    return NextResponse.json(
      { message: "Error subscribing to newsletter." },
      { status: 500 }
    );
  }
}
