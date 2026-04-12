import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Package, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-delivery.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import lastMileImg from "@/assets/last-mile.jpg";

const features = [
  { icon: Truck, title: "Nationwide Delivery", desc: "We deliver across all 36 states in Nigeria with speed and care." },
  { icon: Clock, title: "Same-Day Options", desc: "Need it fast? Our same-day delivery keeps your business moving." },
  { icon: Shield, title: "Secure Handling", desc: "Every package is handled with care, insured and tracked." },
  { icon: Package, title: "Any Package Size", desc: "From small parcels to bulk shipments — we've got you covered." },
];

const HomePage = () => (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Merry Express delivery fleet" width={1920} height={1080} className="h-full w-full object-cover opacity-30" />
      </div>
      <div className="relative container py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Delivering Across Nigeria, <span className="text-accent">Fast & Reliable</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
            Merry Express Logistics provides trusted courier and haulage services across Nigeria. Your package, our priority.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/order">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Place a Delivery Order <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://wa.me/2349063071178?text=Hello%2C%20I%20want%20to%20request%20a%20quote" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Request a Quote
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="container py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Merry Express?</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">We combine speed, security, and affordability to give you the best logistics experience in Nigeria.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <f.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Images section */}
    <section className="bg-muted py-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reliable Logistics You Can Trust</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            From warehousing to last-mile delivery, Merry Express handles every step of your supply chain with professionalism and care. We serve businesses and individuals across Nigeria.
          </p>
          <Link to="/services">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Our Services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={warehouseImg} alt="Merry Express warehouse operations" width={1280} height={720} loading="lazy" className="rounded-xl object-cover w-full h-48" />
          <img src={lastMileImg} alt="Last-mile delivery in Nigeria" width={1280} height={720} loading="lazy" className="rounded-xl object-cover w-full h-48" />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary py-16">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Ship?</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">Place your delivery order now or chat with us on WhatsApp for a custom quote.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/order">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              Place Order Now
            </Button>
          </Link>
          <a href="https://wa.me/2349063071178?text=Hello%2C%20I%20want%20to%20request%20a%20quote" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
