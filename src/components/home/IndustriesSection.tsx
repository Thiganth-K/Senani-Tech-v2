import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import semiconductorImg from "@/assets/IndustrySection/SemiConductors.png";
import aimlImg from "@/assets/IndustrySection/AIML.png";
import dataCenterImg from "@/assets/IndustrySection/DataCenter.png";
import storageImg from "@/assets/IndustrySection/Storage.png";
import networkingImg from "@/assets/IndustrySection/Networking.png";
import healthcareImg from "@/assets/IndustrySection/Healthcare.png";
import automotiveImg from "@/assets/IndustrySection/Automotive.png";
import consumerImg from "@/assets/IndustrySection/Consumer.png";

const industries = [
  { image: semiconductorImg, name: "Semiconductor", description: "Chip testing & validation" },
  { image: aimlImg,          name: "AI/ML",          description: "Machine learning hardware" },
  { image: dataCenterImg,    name: "Data Center",    description: "Server infrastructure" },
  { image: storageImg,       name: "Storage",        description: "SSD & memory solutions" },
  { image: networkingImg,    name: "Networking",     description: "High-speed connectivity" },
  { image: healthcareImg,    name: "Healthcare",     description: "Medical devices" },
  { image: automotiveImg,    name: "Automotive",     description: "Vehicle electronics" },
  { image: consumerImg,      name: "Consumer",       description: "Consumer electronics" },
];

export function IndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden bg-secondary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />

      <div className="container mx-auto px-4 relative" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Powering Innovation Across{" "}
            <span className="gradient-text-bright">Industries</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From semiconductor giants to healthcare innovators, we partner with industry leaders
            to deliver cutting-edge solutions
          </p>
        </motion.div>

        {/* Industries Marquee (desktop) */}
        <div className="relative hidden lg:block">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {[...industries, ...industries].map((industry, index) => (
                <motion.div
                  key={`${industry.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: (index % industries.length) * 0.05 }}
                  className="flex-shrink-0 group"
                >
                  <div className="relative p-4 rounded-2xl card hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 w-48">
                    {/* Image */}
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-3">
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground text-sm">
                        {industry.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Static Grid for Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 lg:hidden">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-xl card overflow-hidden group"
            >
              {/* Image */}
              <div className="w-full h-28 overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Text */}
              <div className="p-3 text-center">
                <span className="text-sm font-medium">{industry.name}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}