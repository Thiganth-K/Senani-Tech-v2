import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { portfolioSlides } from "@/data/portfolio-slides";

export default function Portfolio() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = portfolioSlides.length;
  const currentSlide = portfolioSlides[currentIdx];

  // Continuous Auto-play timer (pauses on hover/hold)
  useEffect(() => {
    if (!isPaused) {
      playTimerRef.current = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % totalSlides);
      }, 4000); // 4 seconds per slide
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPaused, totalSlides]);

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Page Hero */}
        <section className="container mx-auto px-4 mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight">
              SenaniTech <span className="gradient-text-bright">Portfolio</span>
            </h1>
          </motion.div>
        </section>

        {/* Main Presentation Showcase View */}
        <section className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div 
              className="bg-card border border-border/80 rounded-3xl shadow-xl overflow-hidden relative flex flex-col justify-between group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Hover status indicator */}
              <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 pointer-events-none ${
                isPaused ? "bg-primary/20 text-primary backdrop-blur-md opacity-100" : "opacity-0"
              }`}>
                Paused on Hover
              </div>

              {/* Slide PNG Image Canvas Display */}
              <div className="p-4 sm:p-8 md:p-10 flex-1 flex items-center justify-center relative z-10 min-h-[350px] sm:min-h-[480px] bg-muted/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={`/slides/Slide${currentSlide.id}.PNG`}
                      alt={currentSlide.title}
                      className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl border border-border/60 shadow-md bg-white"
                      onError={(e) => {
                        // Fallback if image path case varies
                        const target = e.target as HTMLImageElement;
                        if (!target.src.endsWith(".png")) {
                          target.src = `/slides/Slide${currentSlide.id}.png`;
                        }
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Controls Navigation Bar */}
              <div className="p-4 md:p-6 bg-card border-t border-border/60 flex items-center justify-between gap-4">
                <button
                  onClick={prevSlide}
                  className="px-4 py-2.5 rounded-xl bg-muted/80 border border-border/80 text-foreground font-semibold text-xs sm:text-sm hover:border-primary flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft size={18} /> Previous
                </button>

                {/* Progress Indicators & Count */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <span className="text-xs font-bold text-foreground/80">
                    Slide <span className="text-primary font-extrabold">{currentIdx + 1}</span> of {totalSlides}
                  </span>
                  <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-xs px-2 py-1">
                    {portfolioSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIdx(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentIdx ? "w-6 bg-primary" : "w-2 bg-border hover:bg-foreground/40"
                        }`}
                        title={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary-hover flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="container mx-auto px-4 mt-16">
          <div className="max-w-5xl mx-auto rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex-1">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                Partner with SenaniTech for Your Next Hardware Innovation
              </h2>
              <p className="text-sm md:text-base text-foreground/80 max-w-2xl">
                Our engineering team is ready to deliver customized PCB design, ATE board engineering, and turnkey EMS solutions.
              </p>
            </div>
            <Link to="/contact" className="relative z-10 flex-shrink-0 w-full md:w-auto">
              <Button variant="hero" size="lg" className="w-full md:w-auto px-8 py-6 text-base gap-3 rounded-xl">
                Get in Touch <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
