import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const OrderPage = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const orderData = {
      full_name: (data.get("fullName") as string).trim(),
      phone: (data.get("phone") as string).trim(),
      pickup_location: (data.get("pickup") as string).trim(),
      delivery_location: (data.get("delivery") as string).trim(),
      package_details: (data.get("details") as string).trim(),
    };

    try {
      const { error } = await supabase.from("delivery_orders").insert(orderData);

      if (error) throw error;

      // Send notification to business owner
      await supabase.functions.invoke("notify-new-order", {
        body: orderData,
      });

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("Order submission error:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <section className="bg-primary py-20">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Order Received!</h1>
          </div>
        </section>
        <section className="container py-20 max-w-2xl text-center">
          <div className="rounded-xl border border-border bg-card p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              Your delivery order has been received. We'll review it and get back to you shortly.
            </p>
            <Button onClick={() => setSubmitted(false)} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              Place Another Order
            </Button>
          </div>
        </section>
      </div>
    );
  }

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
              {submitting ? "Submitting..." : "Submit Order"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
