import { Router } from "express";
import { db, deliveryOrdersTable } from "@workspace/db";
import { sendWhatsAppNotification } from "../lib/twilio";

const router = Router();

router.post("/orders", async (req, res) => {
  try {
    const { id, full_name, phone, pickup_location, delivery_location, package_details } = req.body;
    if (!full_name || !phone || !pickup_location || !delivery_location || !package_details) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const orderId = id ?? crypto.randomUUID();

    await db.insert(deliveryOrdersTable).values({
      id: orderId,
      fullName: full_name,
      phone,
      pickupLocation: pickup_location,
      deliveryLocation: delivery_location,
      packageDetails: package_details,
    });

    sendWhatsAppNotification({
      fullName: full_name,
      phone,
      pickupLocation: pickup_location,
      deliveryLocation: delivery_location,
      packageDetails: package_details,
    }).catch((err) => {
      console.error("WhatsApp notification failed:", err?.message ?? err);
    });

    return res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/orders", async (_req, res) => {
  try {
    const orders = await db.select().from(deliveryOrdersTable).orderBy(deliveryOrdersTable.createdAt);
    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
