import { NextRequest, NextResponse } from "next/server";

const API_SECRET  = process.env.API_SECRET ?? "850fe15104536baa908f31e6e21295a8";
const VAPI_KEY    = "d1678d4e-f94d-456e-a2b9-04caeb26d131";
const ASSISTANT_ID = "51ea267e-37d9-4c2f-aff7-402f57d79660";
const PHONE_NUM_ID = "6044c4ab-7dcd-4f26-bb30-498e52c38f64";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-api-secret") !== API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { number, instruction, customerName } = await req.json();
  if (!number || !instruction) {
    return NextResponse.json({ error: "number and instruction required" }, { status: 400 });
  }

  const resp = await fetch("https://api.vapi.ai/call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VAPI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId: ASSISTANT_ID,
      phoneNumberId: PHONE_NUM_ID,
      customer: {
        number,
        ...(customerName ? { name: customerName } : {}),
      },
      assistantOverrides: {
        firstMessage:
          `Good day, my name is Jarvis and I am calling on behalf of Mr Richard Male. ${instruction}`,
      },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    return NextResponse.json({ error: data }, { status: resp.status });
  }

  return NextResponse.json({ ok: true, callId: data.id, number });
}
