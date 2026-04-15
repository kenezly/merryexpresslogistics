import twilio from "twilio";

function toWhatsAppNumber(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  const e164 = `+${digits}`;
  return raw.toLowerCase().startsWith("whatsapp:") ? `whatsapp:${e164}` : `whatsapp:${e164}`;
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = toWhatsAppNumber(process.env.TWILIO_WHATSAPP_FROM);
const to = toWhatsAppNumber(process.env.TWILIO_WHATSAPP_TO);

export async function sendWhatsAppNotification(order: {
  fullName: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  packageDetails: string;
}) {
  if (!accountSid || !authToken || !from || !to) {
    console.warn("Twilio credentials not configured — skipping WhatsApp notification");
    return;
  }

  const client = twilio(accountSid, authToken);

  const body =
    `📦 *New Delivery Order*\n\n` +
    `👤 *Name:* ${order.fullName}\n` +
    `📞 *Phone:* ${order.phone}\n` +
    `📍 *Pickup:* ${order.pickupLocation}\n` +
    `🏁 *Delivery:* ${order.deliveryLocation}\n` +
    `📝 *Package:* ${order.packageDetails}`;

  await client.messages.create({ from, to, body });
}
