import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(0,219,135,0.06) 0%, transparent 60%)
          `,
        }}
      />
      <div className="absolute inset-0 circuit-pattern opacity-20" />

      {/* Floating Orbs */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/30 opacity-30"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 opacity-24"
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full card mb-8"
          >
            <Mail size={16} className="text-highlight" />
            <span className="text-sm text-muted-foreground">Let's start a conversation</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to bring your{" "}
            <span className="gradient-text-bright">ideas to market</span>?
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Partner with SenaniTech to accelerate your product development, reduce costs, 
            and ensure engineering excellence from concept to production.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="default" size="xl" className="group w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Learn About Us
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-highlight" />
              30+ Years Combined Experience
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-highlight" />
              Global Delivery Capability
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-highlight" />
              Quality Focused
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}