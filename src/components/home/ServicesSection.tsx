import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import semiconductorImg from "@/assets/ServiceSection/Semiconductor.jpg";
import technologyImg from "@/assets/ServiceSection/Technology.jpg";
import systemImg from "@/assets/ServiceSection/System.jpg";

const services = [
  {
    image: semiconductorImg,
    title: "Semiconductor Services",
    description: "Comprehensive ATE services including probe cards, final test boards, and signal integrity solutions for leading semiconductor platforms.",
    link: "/semiconductor-services",
    features: ["Universal Probe Cards", "Handler Interface Boards", "Signal Integrity Analysis"],
    gradient: "from-primary to-accent",
  },
  {
    image: technologyImg,
    title: "Technology Services",
    description: "SenaniTech's technology services provide tightly integrated prototyping validation through a comprehensive one-stop solution for engineering and manufacturing requirements.",
    link: "/technology-services",
    features: ["Prototyping Validation", "Integrated Engineering", "One-Stop Manufacturing"],
    gradient: "from-accent to-highlight",
  },
  {
    image: systemImg,
    title: "System Solutions",
    description: "Comprehensive product lifecycle coverage through close client collaboration, merging cutting-edge technology, engineering excellence, and domain expertise to deliver transformative products.",
    link: "/system-solutions",
    features: ["Full Lifecycle Coverage", "Engineering Excellence", "Domain Expertise"],
    gradient: "from-highlight to-primary",
  },
];


export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(0,219,135,0.04) 0%, transparent 50%),
              radial-gradient(ellipse at 100% 50%, rgba(0,219,135,0.03) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Engineering Excellence,{" "}
            <span className="gradient-text-bright">Delivered</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three pillars of expertise working together to accelerate your product development
            and reduce time to market
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const isHovered = hovered === index;

  return (
    <Link
      to={service.link}
      className="block h-full no-underline"
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <div className={`relative h-full rounded-2xl card overflow-hidden transition-all duration-500 flex flex-col ${isHovered ? "-translate-y-2 shadow-2xl shadow-primary/20" : ""}`}>
        {/* Shimmer effect on hover */}
        <div className={`${isHovered ? "opacity-100" : "opacity-0"} absolute inset-0 z-10 pointer-events-none transition-opacity duration-500`}>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-highlight/10 to-transparent"
            style={{ transform: isHovered ? "translateX(100%)" : "translateX(-100%)", transition: "transform 1s" }}
          />
        </div>

        {/* Top gradient line */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 z-20 bg-gradient-to-r ${service.gradient}`}
        />

        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
          />
          {/* Gradient overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-7 pt-5">
          <h3 className="text-xl font-display font-bold mb-3">
            {service.title}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-highlight flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Link */}
          <div className="flex items-center gap-2 text-highlight font-medium mt-auto">
            <span>Learn More</span>
            <ArrowRight size={16} className={`transition-transform ${isHovered ? "translate-x-2" : ""}`} />
          </div>
        </div>
      </div>
    </Link>
  );
}