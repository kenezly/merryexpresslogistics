import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package } from "lucide-react";

const OrderPage = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = encodeURIComponent(data.get("fullName") as string);
    const phone = encodeURIComponent(data.get("phone") as string);
    const pickup = encodeURIComponent(data.get("pickup") as string);
    const delivery = encodeURIComponent(data.get("delivery") as string);
    const details = encodeURIComponent(data.get("details") as string);

    const message = `Hello, I'd like to place a delivery order.%0A%0A*Full Name:* ${name}%0A*Phone:* ${phone}%0A*Pickup:* ${pickup}%0A*Delivery:* ${delivery}%0A*Package Details:* ${details}`;

    window.open(`https://wa.me/2349063071178?text=${message}`, "_blank");

    setSubmitting(false);
    toast({ title: "Order Submitted!", description: "You'll be redirected to WhatsApp to confirm." });
    form.reset();
  };

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Place a Delivery Order</h1>
          <p className="text-primary-foreground/80 max-w-lg">Fill the form below and we'll process your delivery request immediately.</p>
        </div>
      </section>

      <section className="container py-20 max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Delivery Order Form</h2>
              <p className="text-sm text-muted-foreground">All fields are required</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <Input name="fullName" placeholder="e.g. Chinedu Okafor" required maxLength={100} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
              <Input name="phone" type="tel" placeholder="e.g. 08012345678" required maxLength={20} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Pickup Location</label>
              <Input name="pickup" placeholder="e.g. Ikeja, Lagos" required maxLength={200} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Delivery Location</label>
              <Input name="delivery" placeholder="e.g. Wuse, Abuja" required maxLength={200} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Package Details</label>
              <Textarea name="details" placeholder="Describe the package (size, weight, contents, special handling...)" required maxLength={500} rows={4} />
            </div>

            <Button type="submit" disabled={submitting} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              {submitting ? "Submitting..." : "Submit Order via WhatsApp"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
