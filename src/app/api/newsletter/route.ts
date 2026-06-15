import { NextResponse } from "next/server";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

function getRequestIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    if (first?.trim()) return first.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const history = requestLog.get(ip) ?? [];
  const recent = history.filter((timestamp) => timestamp > cutoff);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    const { email, website } = await request.json();

    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Subscribed successfully." });
    }

    const ip = getRequestIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

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
