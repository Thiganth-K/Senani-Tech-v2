import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  BookOpen, 
  Building2, 
  Cpu, 
  FileText, 
  Wrench, 
  CheckCircle2, 
  Layers
} from "lucide-react";
import { portfolioSlides, SlideData } from "@/data/portfolio-slides";
import { cn } from "@/lib/utils";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showOutline, setShowOutline] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = portfolioSlides.length;
  const currentSlide = portfolioSlides[currentIdx];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIdx]);

  // Slideshow Auto-play
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % totalSlides);
      }, 5000); // 5 seconds per slide
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, totalSlides]);

  if (!isOpen) return null;

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const jumpToSlide = (idx: number) => {
    setCurrentIdx(idx);
    setShowOutline(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-hidden"
      >
        {/* Background circuit board glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

        {/* Modal Outer Container */}
        <div className="relative w-full h-full max-w-7xl md:h-auto md:max-h-[92vh] flex flex-col bg-slate-900 border-0 md:border border-slate-800 rounded-none md:rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100">
          
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/90 z-20">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isPlaying ? "bg-primary" : "bg-primary/40")}></span>
                <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", isPlaying ? "bg-primary" : "bg-primary/60")}></span>
              </span>
              <span className="font-display font-bold text-sm tracking-widest text-slate-400 uppercase">
                SENANITECH <span className="text-primary">PORTFOLIO</span>
              </span>
            </div>

            {/* Menu options */}
            <div className="flex items-center gap-2">
              {/* Toggle Outline */}
              <button
                onClick={() => setShowOutline(!showOutline)}
                className={cn(
                  "p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer",
                  showOutline && "border-primary/30 text-primary hover:text-primary bg-primary/5"
                )}
                title="Table of Contents"
              >
                <BookOpen size={16} />
                <span className="hidden sm:inline">Outline</span>
              </button>

              {/* Play/Pause Slideshow */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={cn(
                  "p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer",
                  isPlaying && "border-primary/30 text-primary hover:text-primary bg-primary/5"
                )}
                title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <div className="h-6 w-px bg-slate-800 mx-1" />

              {/* Close Modal */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-red-950/20 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                aria-label="Close presentation"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Workspace Section: Outline Sidebar + Slide Deck */}
          <div className="flex-1 flex relative overflow-hidden h-[70vh] md:h-[65vh]">
            
            {/* Outline Sidebar Drawer */}
            <AnimatePresence>
              {showOutline && (
                <motion.div
                  initial={{ x: -280, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -280, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 w-80 bg-slate-950 border-r border-slate-800/80 z-30 flex flex-col"
                >
                  <div className="p-4 border-b border-slate-900 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Presentation Outline</span>
                    <button 
                      onClick={() => setShowOutline(false)}
                      className="p-1 rounded-lg hover:bg-slate-900 text-slate-500 hover:text-slate-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
                    {portfolioSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => jumpToSlide(idx)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-start gap-3 transition-all",
                          idx === currentIdx 
                            ? "bg-primary/10 border border-primary/20 text-primary font-medium" 
                            : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent"
                        )}
                      >
                        <span className="text-xs opacity-60 mt-0.5">{String(slide.id).padStart(2, "0")}</span>
                        <span className="truncate leading-tight">{slide.title}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slide Viewer Canvas */}
            <div className="flex-1 relative flex flex-col bg-slate-950 p-6 md:p-12 overflow-y-auto items-center justify-center">
              
              {/* Dynamic Slide Container with 16:9 responsive bounds */}
              <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center relative">
                
                {/* Slide Transition Wrapper */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 0.98, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-center"
                  >
                    {renderSlide(currentSlide)}
                  </motion.div>
                </AnimatePresence>
                
              </div>
            </div>
          </div>

          {/* Bottom Progress & Navigation Control Bar */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Slide Index / Total */}
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Slide <span className="text-primary font-bold">{currentIdx + 1}</span> of <span className="text-slate-300">{totalSlides}</span>
            </div>

            {/* Slide Progress Bar */}
            <div className="hidden md:block flex-1 max-w-md h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentIdx + 1) / totalSlides) * 100}%` }}
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-inner"
                disabled={currentIdx === 0}
                title="Previous Slide (Left Arrow)"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-inner"
                title="Next Slide (Right Arrow / Space)"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Slide Templates Renderer ──────────────────────────────────────────────────

function renderSlide(slide: SlideData) {
  return (
    <div className="w-full h-full flex items-center justify-center p-1 md:p-3 relative bg-slate-950">
      <img
        src={`/slides/Slide${slide.id}.PNG`}
        alt={slide.title}
        className="max-h-full max-w-full object-contain rounded-xl border border-slate-800/80 shadow-2xl"
      />
    </div>
  );
}
