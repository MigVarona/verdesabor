import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // Ready for integration with Resend, Mailchimp, ConvertKit, etc.
    // For now, log the subscription server-side.
    console.log(`[Newsletter] New subscription: ${email}`);

    return NextResponse.json({ success: true, message: "Subscribed successfully." });
  } catch {
    return NextResponse.json({ error: "Failed to process subscription." }, { status: 500 });
  }
}
