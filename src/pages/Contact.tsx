import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  CheckCircle,
  Building,
  Factory
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-6">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Connect with <span className="gradient-text-bright">SenaniTech</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your worldwide partner in quality and innovation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl card"
              >
                <h2 className="text-2xl font-display font-bold mb-6">Send us a message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="text-highlight mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                    <p className="text-muted-foreground">
                      We've received your message and will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <Input 
                          placeholder="Your name" 
                          required 
                          className="bg-muted/50 border-border focus:border-highlight"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input 
                          type="email" 
                          placeholder="your@email.com" 
                          required
                          className="bg-muted/50 border-border focus:border-highlight"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                      <Input 
                        type="tel" 
                        placeholder="+91 9486470817"
                        className="bg-muted/50 border-border focus:border-highlight"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea 
                        placeholder="Tell us about your project..."
                        rows={5}
                        required
                        className="bg-muted/50 border-border focus:border-highlight resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ⏳
                          </motion.span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send size={18} />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Quick Contact */}
                <div className="p-6 rounded-2xl card">
                  <h3 className="font-display font-semibold mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <a 
                      href="mailto:praveen@senanitech.com"
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center">
                        <Mail size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-medium text-black">praveen@senanitech.com</div>
                      </div>
                    </a>
                    
                    <a 
                      href="tel:+919486470817"
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div className="font-medium text-black">+91 9486470817</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Locations */}
                <div className="p-6 rounded-2xl card">
                  <h3 className="font-display font-semibold mb-4">Our Locations</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center flex-shrink-0">
                        <Building size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Engineering Delivery Center</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          SENANITECH
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          2nd floor, Sona Valliappa Block,<br />
                          Junction Main Rd, Salem,<br />
                          Tamil Nadu 636005.
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                      <div className="w-10 h-10 rounded-lg bg-green-400 flex items-center justify-center flex-shrink-0">
                        <Building size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Registered Address</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          SENANITECH
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          212-6(3), Thirumalai Nagar, Narasothipatty,<br />
                          Alagapuram, Salem,<br />
                          Tamil Nadu - 636004
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;