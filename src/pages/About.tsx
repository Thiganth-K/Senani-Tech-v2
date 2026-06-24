import { useRef, useState, useEffect } from "react";
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
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import boschLogo from "@/assets/trusted-by/bosch.png";
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

const ClientCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % clientLogos.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + clientLogos.length) % clientLogos.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 md:p-8 rounded-2xl card relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-foreground m-0">Trusted by Industry Leaders</h3>
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            className="w-9 h-9 rounded-xl border border-border bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary flex items-center justify-center transition-all shadow-sm"
            aria-label="Previous client"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-9 h-9 rounded-xl border border-border bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary flex items-center justify-center transition-all shadow-sm"
            aria-label="Next client"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center w-full">
          {[0, 1, 2].map((offset) => {
            const index = (startIndex + offset) % clientLogos.length;
            const client = clientLogos[index];
            const visibilityClass = offset === 2 ? "hidden md:flex" : "flex";

            return (
              <motion.div
                key={`${client.name}-${offset}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`${visibilityClass} items-center justify-center p-4 h-20 bg-muted/40 backdrop-blur-sm rounded-2xl border border-border/40 shadow-inner hover:bg-card hover:shadow-md hover:border-primary/20 transition-all duration-300`}
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-h-full max-w-full object-contain filter grayscale dark:invert-0 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

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
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">
                  <span className="gradient-text-bright">10+</span> Industry Experts
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our team brings together decades of experience from leading semiconductor
                  and electronics companies worldwide. We combine deep technical expertise
                  with a customer-first approach.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Building size={20} className="text-highlight" />
                    <span className="text-sm text-muted-foreground">R&D in Coimbatore</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-highlight" />
                    <span className="text-sm text-muted-foreground">Manufacturing in Chennai</span>
                  </div>
                </div>
              </div>
              
              <ClientCarousel />
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