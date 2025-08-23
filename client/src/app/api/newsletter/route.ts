import { NextRequest, NextResponse } from "next/server";
import { delay } from "@/utils/common";

// Mock newsletter database storage
const newsletterSubscribers: { email: string; subscribedAt: string }[] = [
  { email: "alice@example.com", subscribedAt: "2024-01-15T10:30:00Z" },
  { email: "bob@example.com", subscribedAt: "2024-02-20T14:45:00Z" },
];

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function GET() {
  await delay(1000);
  return NextResponse.json({
    emails: newsletterSubscribers,
    total: newsletterSubscribers.length,
  });
}

export async function POST(req: NextRequest) {
  await delay(1500);

  try {
    const { email } = await req.json();

    // Validate email format (FR-15)
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!validateEmail(trimmedEmail)) {
      return NextResponse.json(
        { message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = newsletterSubscribers.find(
      (subscriber) => subscriber.email === trimmedEmail
    );

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "This email is already subscribed to our newsletter" },
        { status: 409 }
      );
    }

    // Store email in backend database (FR-16)
    const newSubscriber = {
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
    };

    newsletterSubscribers.push(newSubscriber);

    // Log for backend storage simulation
    console.log(
      `Newsletter subscription stored: ${trimmedEmail} at ${newSubscriber.subscribedAt}`
    );

    return NextResponse.json({
      message:
        "Successfully subscribed to our newsletter! Thank you for joining our culinary community.",
      email: trimmedEmail,
      subscribedAt: newSubscriber.subscribedAt,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        message:
          "An error occurred while processing your subscription. Please try again.",
      },
      { status: 500 }
    );
  }
}
