const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";
const OWNER_WHATSAPP = "whatsapp:+2349063071178";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId, fullName, phone, pickup, delivery, details } = await req.json();

    if (!orderId || !fullName || !phone || !pickup || !delivery || !details) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send WhatsApp notification via Twilio
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const TWILIO_API_KEY = Deno.env.get("TWILIO_API_KEY");
    if (!TWILIO_API_KEY) throw new Error("TWILIO_API_KEY is not configured");

    const TWILIO_FROM = Deno.env.get("TWILIO_WHATSAPP_FROM");
    if (!TWILIO_FROM) throw new Error("TWILIO_WHATSAPP_FROM is not configured");

    const message = [
      `📦 *New Delivery Order*`,
      ``,
      `*Name:* ${fullName}`,
      `*Phone:* ${phone}`,
      `*Pickup:* ${pickup}`,
      `*Delivery:* ${delivery}`,
      `*Details:* ${details}`,
      ``,
      `Order ID: ${orderId}`,
    ].join("\n");

    const response = await fetch(`${GATEWAY_URL}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TWILIO_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: OWNER_WHATSAPP,
        From: `whatsapp:${TWILIO_FROM}`,
        Body: message,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Twilio error:", JSON.stringify(data));
      return new Response(JSON.stringify({ success: false, error: "WhatsApp notification failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
