import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initDark = stored ? stored === "dark" : prefersDark;
    setIsDark(initDark);
    if (initDark) document.documentElement.classList.add("dark");
  }, []);

  const toggle = () => {
    const toDark = !isDark;
    setIsDark(toDark);
    if (toDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", toDark ? "dark" : "light");
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className={"inline-flex items-center justify-center p-2 rounded-md hover:bg-[hsl(var(--section-background))] " + className}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;
