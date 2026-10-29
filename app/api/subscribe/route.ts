import { NextResponse } from "next/server";
import { sendSignup } from "@/lib/order-notify";

/** Newsletter signup. Validates, drops obvious bots (hidden "website" field), then emails the shop. */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Please enter your email address." }, { status: 400 });
    }
    // Bots fill every field. Pretend it worked.
    if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!(await sendSignup(email))) {
      return NextResponse.json(
        { error: "We couldn't sign you up just now. Please try again in a minute." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(`[subscribe] ${e instanceof Error ? e.message : e}`);
    return NextResponse.json({ error: "Something went wrong. Please try again in a minute." }, { status: 500 });
  }
}
