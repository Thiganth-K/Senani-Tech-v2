import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  CircuitBoard, 
  Box, 
  Factory,
  ChevronDown,
  Check
} from "lucide-react";

const capabilities = [
  {
    id: "electronics",
    icon: CircuitBoard,
    title: "Electronics Design & Analysis",
    description: "Comprehensive electronic design services from concept to validation",
    features: [
      "Schematic Design & Review",
      "PCB Layout & Signal Integrity",
      "Power Distribution Network Analysis",
      "Thermal & EMI/EMC Analysis",
      "Design for Manufacturability",
      "Prototype Development",
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing Services",
    description: "End-to-end manufacturing support from prototype to mass production",
    features: [
      "PCB Fabrication",
      "Component Sourcing",
      "SMT Assembly",
      "Box Build Assembly",
      "Quality Control & Testing",
      "Supply Chain Management",
    ],
  },
];

export function CapabilitiesSection() {
  const [openId, setOpenId] = useState<string>("electronics");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden bg-secondary/20">
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
            Our Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Full-Stack Engineering{" "}
            <span className="gradient-text-bright">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From initial design through manufacturing, we provide comprehensive capabilities
            to bring your product vision to life
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="rounded-2xl card overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setOpenId(openId === capability.id ? "" : capability.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-card/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <capability.icon size={24} className="text-highlight" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-muted-foreground hidden sm:block">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === capability.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={24} className="text-muted-foreground" />
                  </motion.div>
                </button>

                {/* Content */}
                <AnimatePresence>
                  {openId === capability.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-border">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {capability.features.map((feature, featureIndex) => (
                              <motion.div
                                key={feature}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.05 }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                              >
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                  <Check size={12} className="text-highlight" />
                                </div>
                                <span className="text-sm text-foreground">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}