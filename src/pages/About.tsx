import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  Award, 
  Zap,
  ArrowRight,
  Building,
  Globe
} from "lucide-react";

import boschLogo from "@/assets/trusted-by/bosch.webp";
import bynetLogo from "@/assets/trusted-by/bynet.png";
import globalchipLogo from "@/assets/trusted-by/globalchipindustrial.png";
import healthcubeLogo from "@/assets/trusted-by/healthcube.png";
import neurostellerLogo from "@/assets/trusted-by/neurosteller.png";
import techventuresLogo from "@/assets/trusted-by/techventures.png";

const values = [
  {
    icon: Award,
    title: "Quality Driven",
    description: "Excellence in every design, every process, every delivery"
  },
  {
    icon: Target,
    title: "Process Oriented",
    description: "Structured methodologies ensuring consistent, reliable results"
  },
  {
    icon: Users,
    title: "People Focused",
    description: "Collaborative partnerships built on trust and communication"
  },
  {
    icon: Zap,
    title: "Engineering Excellence",
    description: "Technical innovation pushing the boundaries of what's possible"
  }
];

const clientLogos = [
  { name: "Bosch", logo: boschLogo },
  { name: "Neurostellar", logo: neurostellerLogo },
  { name: "BYNET", logo: bynetLogo },
  { name: "HealthCube", logo: healthcubeLogo },
  { name: "TechVentures", logo: techventuresLogo },
  { name: "GlobalChip", logo: globalchipLogo },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-6">
                About SenaniTech
              </span>
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                Bringing your ideas from{" "}
                <span className="gradient-text-bright">mind to market</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
                With over 30 years of combined experience, we are your trusted partner
                in semiconductor and electronics engineering excellence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="pb-16 pt-0 bg-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Our Core <span className="gradient-text-bright">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl card text-center hover:-translate-y-1 transition-transform"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon size={32} className="text-highlight" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-16">
              <h2 className="text-3xl font-display font-bold mb-6">
                <span className="gradient-text-bright">10+</span> Industry Experts
              </h2>
              <p className="text-muted-foreground mb-6 text-base md:text-lg leading-relaxed">
                Our team brings together decades of experience from leading semiconductor
                and electronics companies worldwide. We combine deep technical expertise
                with a customer-first approach.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Building size={20} className="text-highlight" />
                  <span className="text-sm md:text-base text-muted-foreground font-medium">R&D in Coimbatore</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-highlight" />
                  <span className="text-sm md:text-base text-muted-foreground font-medium">Manufacturing in Chennai</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/30 pt-12 mt-12 w-full overflow-hidden relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <p className="text-xs font-semibold tracking-wider text-muted-foreground/80 uppercase mb-8 text-center">
                Trusted by Industry Leaders
              </p>
              
              <div className="w-full overflow-hidden">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="flex gap-16 items-center w-max"
                >
                  {[...clientLogos, ...clientLogos].map((client, index) => (
                    <div 
                      key={`${client.name}-${index}`} 
                      className="h-12 w-32 flex items-center justify-center flex-shrink-0"
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-h-full max-w-full object-contain opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Join our growing list of partners
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how we can help bring your next product to market
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Get in Touch
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;