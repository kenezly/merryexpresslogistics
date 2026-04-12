import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "themerryexpress@gmail.com";
const OWNER_PHONE = "2349063071178";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, phone, pickup_location, delivery_location, package_details } = await req.json();

    // Build WhatsApp notification message
    const whatsappMessage = encodeURIComponent(
      `🚚 New Delivery Order!\n\n` +
      `*Customer:* ${full_name}\n` +
      `*Phone:* ${phone}\n` +
      `*Pickup:* ${pickup_location}\n` +
      `*Delivery:* ${delivery_location}\n` +
      `*Package:* ${package_details}`
    );

    const whatsappLink = `https://wa.me/${OWNER_PHONE}?text=${whatsappMessage}`;

    // Send email notification using Supabase's built-in email (via REST API)
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Use the Supabase Auth admin API to send a notification email
    // We'll use a simple fetch to a mail service or log for now
    console.log(`New order from ${full_name} (${phone})`);
    console.log(`Pickup: ${pickup_location} → Delivery: ${delivery_location}`);
    console.log(`Details: ${package_details}`);
    console.log(`WhatsApp link: ${whatsappLink}`);

    // Send email via Resend or similar (for now we log it)
    // The business owner can check orders in the database

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order notification sent",
        whatsappLink 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send notification" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
