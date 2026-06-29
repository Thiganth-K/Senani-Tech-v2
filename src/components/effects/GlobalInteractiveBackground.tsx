import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GlobalInteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Interactive Cursor Follow Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full transition-transform duration-300 ease-out opacity-20 bg-radial-glow"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          background: "radial-gradient(circle, rgba(0,219,135,0.18) 0%, rgba(0,219,135,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Floating Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-[140px]"
      />

      {/* Subtle Dynamic Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
