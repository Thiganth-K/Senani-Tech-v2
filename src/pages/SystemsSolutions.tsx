import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Activity, Zap, Code2, Factory, ShieldCheck, Wrench, Cpu, LayoutGrid } from "lucide-react";
// ─── Data ────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "hardware",    label: "Hardware Design",         icon: Cpu },
  { id: "simulations", label: "Simulations",             icon: Activity },
  { id: "fpga",        label: "FPGA Design",             icon: Zap },
  { id: "embedded",    label: "Embedded Software",       icon: Code2 },
  { id: "mechanical",  label: "Mechanical & Thermal",    icon: Wrench },
  { id: "validation",  label: "Bring up & Validation",   icon: ShieldCheck },
  { id: "production",  label: "Production Build",        icon: Factory },
];

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  bullets: string[];
}

const sections: Section[] = [
  {
    id: "hardware",
    title: "Hardware Design",
    icon: Cpu,
    bullets: [
      "System Architecture & Component Selection",
      "Technical Hardware Design Document",
      "Schematic Engineering",
      "Circuit Simulations",
      "Layout Engineering",
      "DFM/DFA Analysis"
    ]
  },
  {
    id: "simulations",
    title: "Simulations",
    icon: Activity,
    bullets: [
      "Stack-up Engineering",
      "Signal Integrity Analysis",
      "Power Integrity Analysis"
    ]
  },
  {
    id: "fpga",
    title: "FPGA Design",
    icon: Zap,
    bullets: [
      "Microarchitecture Development",
      "FPGA RTL Design",
      "Board Validation"
    ]
  },
  {
    id: "embedded",
    title: "Embedded Software",
    icon: Code2,
    bullets: [
      "Firmware and BSP Development",
      "Application and UI Software Development",
      "Device drivers and API Development",
      "Board bringup and Hardware Validation"
    ]
  },
  {
    id: "mechanical",
    title: "Mechanical & Thermal Capability",
    icon: Wrench,
    bullets: [
      "Industrial Design",
      "Structural Analysis",
      "Mechanical Design",
      "Thermal Simulations",
      "MTBF Analysis"
    ]
  },
  {
    id: "validation",
    title: "Product Bring up & Validation",
    icon: ShieldCheck,
    bullets: [
      "Hardware Functional Bring up",
      "Electrical DVT (EDVT)",
      "Mechanical DVT (MDVT)",
      "Certification - FCC Class",
      "Safety - UL and TUV"
    ]
  },
  {
    id: "production",
    title: "Production Build",
    icon: Factory,
    bullets: [
      "NPI/Prototype Build",
      "Production Ramp up",
      "Integration and Test Development",
      "Certification and Compliance",
      "Packaging and Inventory Management",
      "Distribution and Support"
    ]
  }
];

// ─── Content Panel ────────────────────────────────────────────────────────────

function ContentPanel({ section }: { section: Section }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      key={section.id}
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-6 items-start">
          <div className="flex-1 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1 uppercase tracking-wider">
              Systems Solutions Capabilities
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 leading-tight">
              {section.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl">
              Explore our core competencies in {section.title.toLowerCase()} and discover how our integrated lifecycle approach ensures high-quality engineering deliverables.
            </p>
          </div>
          {section.icon && (
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative group mx-auto lg:mx-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/25 shadow-inner p-5 transition-all duration-500 hover:scale-105 hover:border-primary/40">
              <section.icon className="w-12 h-12 sm:w-14 sm:h-14 text-primary drop-shadow-[0_0_12px_rgba(var(--primary),0.5)] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
            </div>
          )}
        </div>
      </motion.div>

      {/* Grid of Feature Cards */}
      {section.bullets && section.bullets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-3xl border border-border/60 bg-gradient-to-br from-card to-muted/20 p-6 md:p-8 lg:p-10 mb-12 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
              <LayoutGrid className="text-primary" size={24} strokeWidth={2.5} />
            </div>
            <h3 className="font-display font-bold text-foreground text-lg sm:text-xl tracking-tight">
              {section.title} Offerings
            </h3>
          </div>
          
          <ul className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {section.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                className="bg-card w-full backdrop-blur-sm border border-border/80 rounded-2xl p-5 hover:bg-card hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-center min-h-[90px]"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-[0_0_12px_rgba(var(--primary),0.5)] transition-all duration-400">
                    <Check size={16} strokeWidth={3} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="leading-snug text-foreground font-semibold md:text-[min(1cqw,16px)] group-hover:text-primary transition-colors flex-1">{b}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SystemsSolutions = () => {
  const [activeId, setActiveId] = useState("hardware");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const activeSection = sections.find((s) => s.id === activeId)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative pt-32 pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="container mx-auto px-4 relative mt-14">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-5">
                Systems Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 leading-tight">
                <span className="gradient-text-bright">Systems</span>{" "}
                Solutions
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                SenaniTech works hand in hand with its clients to offer extensive coverage throughout the entire product development lifecycle. By blending advanced technology, engineering expertise, structured process, and deep domain knowledge, SenaniTech is dedicated to delivering innovative and game-changing products.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="gap-2">
                    Get a Quote <ArrowRight size={17} />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="lg">
                  Partner with Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Product Development Overview ─────────────────────────────── */}
        <section className="container mx-auto px-4 pt-10 md:pt-12 pb-12">
           <div className="max-w-5xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                 Product Development
              </h2>
              <div className="p-8 md:p-12 rounded-3xl bg-card border border-border/50 shadow-sm">
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                   SenaniTech, in conjunction with its clients, covers the entire product development lifecycle.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                   Senanitech combines state-of-the-art technology with engineering expertise, structured processes, and deep domain experience to deliver innovative products. Our technical insight comes from years of market and customer understanding. Our integrated approach keeps critical disciplines in full communication, minimizing cost and valuable time while moving through the product lifecycle.
                </p>
              </div>
           </div>
        </section>

        {/* ── Two-column layout ────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pt-4 md:pt-8 pb-28">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

            {/* ── SIDEBAR ── */}
            {/* Mobile: Premium Services Grid */}
            <div className="w-full lg:hidden mb-12 relative z-20">
              <div className="flex items-center justify-between mb-5 px-1">
                <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]"></div>
                  Development Stages
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {navItems.map((item, idx) => {
                  const isActive = activeId === item.id;
                  const isLastEven = idx === navItems.length - 1 && navItems.length % 2 !== 0; 
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={`relative flex flex-col items-start justify-between p-5 rounded-[20px] transition-all duration-400 border text-left overflow-hidden group ${
                        isLastEven ? "col-span-2" : "col-span-1"
                      } ${
                        isActive
                          ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary/50 shadow-[0_8px_25px_-5px_rgba(var(--primary),0.5)] scale-[1.02] ring-1 ring-primary/30 ring-offset-2 ring-offset-background"
                          : "bg-card/50 backdrop-blur-sm border-border/80 text-muted-foreground hover:bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none" />
                      )}
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm relative ${
                        isActive 
                          ? 'bg-primary-foreground/20 text-primary-foreground backdrop-blur-md' 
                          : 'bg-muted/80 group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary'
                      }`}>
                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" : "opacity-80"} />
                        {isActive && (
                          <motion.div 
                            layoutId="mobile-active-bg"
                            className="absolute inset-0 rounded-2xl border border-primary-foreground/30 pointer-events-none" 
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </div>
                      <span className={`text-sm sm:text-base font-bold leading-snug z-10 flex-1 ${isActive ? "text-primary-foreground" : "text-foreground group-hover:text-primary transition-colors"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop: sticky vertical sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32 self-start">
              <div className="rounded-3xl border border-border/50 bg-card/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <div className="px-6 py-5 border-b border-border/40 bg-gradient-to-r from-muted/50 to-transparent">
                  <p className="text-sm font-bold text-foreground tracking-wide flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),1)]" />
                    Development Stages
                  </p>
                </div>
                <nav className="p-3 space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-left transition-all duration-300 group ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                        }`}
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.span
                            layoutId="desktop-sidebar-indicator"
                            className="absolute left-2.5 top-2.5 bottom-2.5 w-1 rounded-full bg-primary-foreground/40"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                        <span className={`transition-transform duration-300 flex-1 ${isActive ? "ml-3" : "group-hover:translate-x-1"}`}>
                          {item.label}
                        </span>
                        {!isActive && (
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Sidebar footer CTA */}
                <div className="mx-3 mb-3 mt-1 p-3 rounded-xl bg-primary/5 border border-primary/15">
                  <p className="text-xs text-muted-foreground mb-2">
                    Need a custom solution?
                  </p>
                  <Link to="/contact">
                    <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                      Contact us <ArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── CONTENT PANEL ── */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <ContentPanel key={activeId} section={activeSection} />
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Global CTA ────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-5xl mx-auto rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 shadow-sm relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Accelerate Your Development?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                Get in touch with our team for a detailed consultation. See how our specialized systems solutions can help you.
              </p>
            </div>
            <Link to="/contact" className="relative z-10 flex-shrink-0 w-full md:w-auto">
              <Button variant="hero" size="lg" className="w-full md:w-auto px-8 py-6 text-base gap-3 rounded-xl">
                Request a Quote <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SystemsSolutions;