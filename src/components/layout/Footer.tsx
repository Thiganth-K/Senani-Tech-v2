import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  ArrowUpRight,
  Cpu,
  CircuitBoard,
  Layers
} from "lucide-react";
import logoShort from "@/assets/logo_2.png";
import logoLong from "@/assets/logo_1.png";

const footerLinks = {
  services: [
    { name: "Semiconductor Services", path: "/semiconductor-services" },
    { name: "Technology Services", path: "/technology-services" },
    { name: "Systems Solutions", path: "/systems-solutions" },
  ],
  quickLinks: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
  contact: {
    email: "praveen@senanitech.com",
    phone: "+91 9486470817",
    locations: [
      { 
        name: "Engineering Delivery Center", 
        address: "SENANITECH\n2nd floor, Sona Valliappa Block,\nJunction Main Rd, Salem,\nTamil Nadu 636005" 
      },
      { 
        name: "Registered Address", 
        address: "212-6(3), Thirumalai Nagar,\nNarasothipatty, Alagapuram,\nSalem, Tamil Nadu - 636004" 
      },
    ],
  },
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondary/50 border-t border-border overflow-hidden">
      {/* Background Pattern removed per request (no blur/overlay) */}

      <div className="container mx-auto px-4 py-8 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="inline-flex items-center gap-3 no-underline mb-2">
              <img src={logoShort} alt="SenaniTech Icon" className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0" />
              <img src={logoLong} alt="SenaniTech" className="h-20 sm:h-24 w-auto max-w-[300px] sm:max-w-[360px] object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 mt-4">
              Your worldwide partner in semiconductor and electronics engineering excellence.
              Bringing ideas from mind to market.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/senanitech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 transition-colors flex items-center justify-center group"
              >
                <Linkedin size={18} className="text-muted-foreground group-hover:text-highlight transition-colors" />
              </a>
              <a
                href="mailto:praveen@senanitech.com"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 transition-colors flex items-center justify-center group"
              >
                <Mail size={18} className="text-muted-foreground group-hover:text-highlight transition-colors" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <CircuitBoard size={18} className="text-highlight" />
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-highlight transition-colors text-sm flex items-center gap-1 group no-underline"
                  >
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <Layers size={18} className="text-highlight" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-highlight transition-colors text-sm flex items-center gap-1 group no-underline"
                  >
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <Cpu size={18} className="text-highlight" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="text-muted-foreground hover:text-highlight transition-colors text-sm flex items-center gap-2 no-underline"
                >
                  <Mail size={14} />
                  {footerLinks.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerLinks.contact.phone}`}
                  className="text-muted-foreground hover:text-highlight transition-colors text-sm flex items-center gap-2 no-underline"
                >
                  <Phone size={14} />
                  {footerLinks.contact.phone}
                </a>
              </li>
              {footerLinks.contact.locations.map((location) => (
                <li key={location.name} className="text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-foreground font-medium">{location.name}</span>
                      <p className="text-muted-foreground whitespace-pre-line">{location.address}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} SenaniTech Inc. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-primary/20 text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
          >
            Back to top
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↑
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}