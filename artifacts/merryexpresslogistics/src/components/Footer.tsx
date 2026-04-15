import { Link } from "react-router-dom";
import { Truck, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold">
            Merry<span className="text-accent">Express</span>
          </span>
        </div>
        <p className="text-background/70 text-sm leading-relaxed">
          Your trusted logistics partner in Nigeria. Fast, reliable, and affordable delivery services across the nation.
        </p>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
        <nav className="flex flex-col gap-2">
          {[
            { label: "Home", path: "/" },
            { label: "Services", path: "/services" },
            { label: "Place Order", path: "/order" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <Link key={item.path} to={item.path} className="text-sm text-background/70 hover:text-background transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
        <div className="flex flex-col gap-3 text-sm text-background/70">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent" />
            <a href="tel:+2349063071178" className="hover:text-background">+234 906 307 1178</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" />
            <a href="mailto:themerryexpress@gmail.com" className="hover:text-background">themerryexpress@gmail.com</a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span>Ibadan, Nigeria</span>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-background/10">
      <div className="container py-4 text-center text-sm text-background/50">
        © {new Date().getFullYear()} Merry Express Logistics. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
