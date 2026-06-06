import { NextRequest, NextResponse } from "next/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { EnquiryInsert } from "@/lib/supabase/types";
import { z } from "zod";

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

    // Email notification via Resend REST API
    if (process.env.RESEND_API_KEY) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "LuxProp <onboarding@resend.dev>",
          to: "richmale@me.com",
          subject: `New Enquiry — ${parsed.data.property_title ?? "General"}`,
          html: `<h2 style="color:#0F2347">New LuxProp Enquiry</h2>
            <p><b>Name:</b> ${parsed.data.name}</p>
            <p><b>Email:</b> ${parsed.data.email}</p>
            <p><b>Phone:</b> ${parsed.data.phone}</p>
            <p><b>Property:</b> ${parsed.data.property_title ?? "General"}</p>
            <p><b>Message:</b> ${parsed.data.message}</p>`,
        }),
      }).catch((e) => console.error("Resend error:", e));
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Enquiry route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
