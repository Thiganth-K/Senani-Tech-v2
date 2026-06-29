
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import conceptImg   from "@/assets/lifecycle/Lifecycle_Concept.png";
import designImg    from "@/assets/lifecycle/Lifecycle_Design.png";
import prototypeImg from "@/assets/lifecycle/Lifecycle_Prototype.png";
import validationImg from "@/assets/lifecycle/Lifecycle_Validation.png";
import productionImg from "@/assets/lifecycle/Lifecycle_Production.png";
import launchImg    from "@/assets/lifecycle/Lifecycle_Launch.png";

const phases = [
  {
    image: conceptImg,
    title: "Concept",
    description: "Initial ideation and requirements analysis",
    color: "from-primary to-primary/70",
    points: [
      "Concept",
      "Concept Validation",
      "Product Specification Development",
      "System Architecture",
    ],
  },
  {
    image: designImg,
    title: "Design",
    description: "Schematic, layout, and simulation",
    color: "from-primary/70 to-accent",
    points: [
      "Hardware Design & Firmware Development",
      "HW High & Low Level Design",
      "Component Engineering",
      "Board Bring-Up",
    ],
  },
  {
    image: prototypeImg,
    title: "Prototype",
    description: "Rapid prototyping and iteration",
    color: "from-accent to-accent/70",
    points: [
      "PCB Design",
      "PCB Layout Design",
      "Signal / Power / Thermal Integrity Analysis",
      "High-Speed Design (HDI and ATI Boards)",
    ],
  },
  {
    image: validationImg,
    title: "Validation",
    description: "Testing and verification",
    color: "from-accent/70 to-highlight",
    points: [
      "Mechanical Design and Development",
      "Enclosure Design",
      "Mechanical / Industrial Design",
      "Enclosure Fabrication",
      "Mass Fabrication for SS, MS",
    ],
  },
  {
    image: productionImg,
    title: "Production",
    description: "Manufacturing and quality control",
    color: "from-highlight to-highlight/70",
    points: [
      "Electronics and Manufacturing Service",
      "Printed Circuit Board Manufacturing",
      "Printed Circuit Board Assembly",
    ],
  },
  {
    image: launchImg,
    title: "Launch",
    description: "Market-ready deployment",
    color: "from-highlight/70 to-primary",
    points: [
      "Box Building / Regulatory Compliance",
      "Power ON Testing",
      "Box Building",
      "Cable Harness",
      "EMI/EMC Consulting",
    ],
  },
];

export function LifecycleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
      {/* Dynamic Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[100px]"
        />

        {/* Tech Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full card text-xs font-semibold tracking-wide uppercase text-primary border border-primary/20 bg-primary/5 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Our Process
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            Product Development{" "}
            <span className="gradient-text-bright">Lifecycle</span>
          </h2>
          <p className="text-foreground max-w-2xl mx-auto text-base sm:text-lg opacity-85 leading-relaxed">
            A proven end-to-end methodology engineered to take your hardware & system concepts to flawless market execution
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="relative">
          {/* Phases Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 pb-4 items-stretch relative z-10">
            {phases.map((phase, index) => {
              const isHovered = hoveredIndex === index;
              const isActive = activePhase === index;
              const isCurrentOrPast = activePhase !== null && activePhase >= index;

              return (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="relative flex cursor-pointer"
                  onClick={() => setActivePhase(activePhase === index ? null : index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className={`w-full h-full rounded-2xl text-center overflow-hidden transition-all duration-300 flex flex-col border ${
                      isActive
                        ? "bg-white shadow-2xl border-primary ring-2 ring-primary/30"
                        : isHovered
                        ? "bg-white shadow-xl border-primary/40 -translate-y-1.5"
                        : "bg-white/80 backdrop-blur-sm shadow-md border-border/70 hover:border-border"
                    }`}
                  >
                    {/* Top Active Color Highlight Bar */}
                    <div
                      className={`h-1.5 w-full bg-gradient-to-r ${phase.color} transition-opacity duration-300 ${
                        isActive || isHovered ? "opacity-100" : "opacity-40"
                      }`}
                    />

                    <div className="p-5 sm:p-6 flex flex-col flex-grow relative">
                      {/* Image Container with Glow */}
                      <div className="relative w-28 h-28 mx-auto mb-4 overflow-hidden shrink-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: isHovered || isActive ? 1.1 : 1,
                            rotate: isHovered ? [0, -4, 4, 0] : 0,
                          }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full flex items-center justify-center p-1"
                        >
                          <img
                            src={phase.image}
                            alt={phase.title}
                            className="w-full h-full object-contain drop-shadow-md"
                          />
                        </motion.div>
                      </div>

                      {/* Phase Badge */}
                      <div className="mb-2.5 shrink-0">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-white shadow-sm"
                              : isHovered
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-foreground/80"
                          }`}
                        >
                          Phase {index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`font-display font-bold text-xl mb-2 transition-colors shrink-0 ${
                          isActive || isHovered ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {phase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-foreground font-normal leading-relaxed mb-4 shrink-0 opacity-85 min-h-[36px]">
                        {phase.description}
                      </p>

                      {/* Divider */}
                      <div className="w-full h-px bg-border/60 my-2" />

                      {/* Bullet points */}
                      <ul className="text-sm text-foreground text-left space-y-2.5 mt-auto pt-2">
                        {phase.points.map((p, i) => (
                          <motion.li
                            key={i}
                            animate={{ x: isHovered || isActive ? 2 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-start leading-snug font-medium"
                          >
                            <span className="mr-2 text-primary font-bold shrink-0 text-base">✓</span>
                            <span>{p}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Arrow Indicator — Desktop */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 z-20">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                          isCurrentOrPast
                            ? "bg-primary text-white shadow-primary/30"
                            : "bg-white text-muted-foreground border border-border"
                        }`}
                      >
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}