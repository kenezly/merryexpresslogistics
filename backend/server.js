const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Twilio client setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/send-order', (req, res) => {
    const { name, phone, pickup, dropoff, details } = req.body;

    if (!name || !phone || !pickup || !dropoff || !details) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const messageBody = `Order Details: \nName: ${name}\nPhone: ${phone}\nPickup: ${pickup}\nDropoff: ${dropoff}\nDetails: ${details}`;

    client.messages.create({
        body: messageBody,
        from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
        to: 'whatsapp:' + phone
    })
    .then(message => {
        res.status(200).json({ success: true, message: 'Order sent!', sid: message.sid });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Failed to send order' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
