import { NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/order-notify";

/** Contact form. Validates, drops obvious bots (hidden "website" field), then emails the shop. */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Please fill in the form." }, { status: 400 });
    }

    // Bots fill every field. Pretend it worked.
    if (str(body.website, 200)) return NextResponse.json({ ok: true });

    const name = str(body.name, 100).replace(/[\r\n]+/g, " ");
    const email = str(body.email, 200);
    const subject = str(body.subject, 120).replace(/[\r\n]+/g, " ") || "No subject";
    const message = str(body.message, 4000);

    if (!name || !message) {
      return NextResponse.json({ error: "Please add your name and a message." }, { status: 400 });
    }
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address so we can reply." }, { status: 400 });
    }

    const sent = await sendContactMessage({ name, email, subject, message });
    if (!sent) {
      return NextResponse.json(
        { error: "We couldn't send that just now. Please email noel@eriusports.com instead." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(`[contact] ${e instanceof Error ? e.message : e}`);
    return NextResponse.json({ error: "Something went wrong. Please email noel@eriusports.com instead." }, { status: 500 });
  }
}
