import { NextRequest, NextResponse } from "next/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { EnquiryInsert } from "@/lib/supabase/types";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(10),
  property_title: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createStaticClient();

    const payload: EnquiryInsert = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      property_title: parsed.data.property_title ?? null,
    };

    const result = await supabase.from("enquiries").insert(payload);

    console.log("Supabase enquiry insert result:", JSON.stringify(result));

    if (result.error) {
      console.error("Supabase insert error:", result.error);
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    // Send email notification
    await resend.emails.send({
      from: "LuxProp <onboarding@resend.dev>",
      to: "richmale@me.com",
      subject: `New Enquiry — ${parsed.data.property_title ?? "General"}`,
      html: `
        <h2 style="color:#0F2347">New LuxProp Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;font-weight:bold;color:#555">Name</td><td style="padding:8px">${parsed.data.name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${parsed.data.email}">${parsed.data.email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555">Phone</td><td style="padding:8px"><a href="tel:${parsed.data.phone}">${parsed.data.phone}</a></td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555">Property</td><td style="padding:8px">${parsed.data.property_title ?? "General enquiry"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555">Message</td><td style="padding:8px">${parsed.data.message}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Enquiry route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
