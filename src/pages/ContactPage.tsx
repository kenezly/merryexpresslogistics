import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 max-w-lg">Have questions? Reach out and our team will respond promptly.</p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="flex flex-col gap-5">
              {[
                { icon: Phone, label: "Phone", value: "+234 906 307 1178", href: "tel:+2349063071178" },
                { icon: Mail, label: "Email", value: "info@merryexpress.ng", href: "mailto:info@merryexpress.ng" },
                { icon: MapPin, label: "Address", value: "Lagos, Nigeria" },
                { icon: Clock, label: "Hours", value: "Mon – Sat: 7am – 8pm" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-foreground hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-8 space-y-5">
            <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
            <Input placeholder="Your Name" required maxLength={100} />
            <Input type="email" placeholder="Your Email" required maxLength={255} />
            <Input placeholder="Subject" required maxLength={200} />
            <Textarea placeholder="Your Message" required maxLength={1000} rows={5} />
            <Button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
