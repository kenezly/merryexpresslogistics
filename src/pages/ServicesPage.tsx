import { motion } from "framer-motion";
import { Truck, Package, BarChart3, Warehouse, Bike, Globe } from "lucide-react";
import warehouseImg from "@/assets/warehouse.jpg";
import lastMileImg from "@/assets/last-mile.jpg";

const services = [
  { icon: Truck, title: "Interstate Haulage", desc: "Reliable freight and cargo movement across Nigerian states with our modern fleet." },
  { icon: Bike, title: "Same-Day Delivery", desc: "Urgent deliveries within your city — guaranteed same-day with real-time updates." },
  { icon: Package, title: "Parcel & Courier", desc: "Send documents, parcels, and packages of any size to any location in Nigeria." },
  { icon: Warehouse, title: "Warehousing", desc: "Secure short-term and long-term storage solutions for your goods." },
  { icon: Globe, title: "E-Commerce Fulfillment", desc: "End-to-end logistics for online businesses — pick, pack, and ship." },
  { icon: BarChart3, title: "Corporate Logistics", desc: "Tailored supply chain solutions for businesses with recurring delivery needs." },
];

const ServicesPage = () => (
  <div>
    <section className="bg-primary py-20">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
        <p className="text-primary-foreground/80 max-w-lg">Comprehensive logistics solutions designed for speed, safety, and satisfaction.</p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="bg-muted py-20">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img src={warehouseImg} alt="Our warehouse" width={1280} height={720} loading="lazy" className="rounded-xl object-cover w-full h-72" />
        <div>
          <h2 className="text-3xl font-bold mb-4">State-of-the-Art Warehousing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Our warehouses are equipped with modern inventory management systems to ensure your goods are stored safely and dispatched efficiently.</p>
        </div>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Last-Mile Excellence</h2>
          <p className="text-muted-foreground leading-relaxed">We specialize in getting your packages to your customers' doorsteps — quickly, safely, and with a smile.</p>
        </div>
        <img src={lastMileImg} alt="Last-mile delivery" width={1280} height={720} loading="lazy" className="rounded-xl object-cover w-full h-72" />
      </div>
    </section>
  </div>
);

export default ServicesPage;
