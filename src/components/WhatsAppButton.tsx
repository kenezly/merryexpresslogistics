import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/2349063071178?text=Hello%2C%20I%20need%20help%20with%20a%20delivery"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
    style={{ backgroundColor: "#25D366" }}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-7 w-7" style={{ color: "#fff" }} />
  </a>
);

export default WhatsAppButton;
