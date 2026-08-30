import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FlaskConical, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLab } from "@/context/LabContext";

const LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Building Blocks", href: "#blocks" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Learn", href: "#learn" },
  { label: "Build a Workflow", href: "#builder" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { progressPercent } = useLab();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-blue-500/5"
          : "bg-transparent"
      }`}
    >
      {/* scroll progress — blue to purple gradient */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#7C5CFC] to-[#FF7B72]"
        style={{ scaleX: progress }}
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 font-bold tracking-tight text-[#111111]"
          aria-label="Claude Marketing Lab — back to top"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C5CFC]">
            <FlaskConical className="h-4 w-4 text-white" />
          </div>
          <span className="hidden text-sm sm:inline">Claude Marketing Lab</span>
        </button>

        {/* desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-[#7A7A8A] transition-all hover:bg-[#2563EB]/8 hover:text-[#2563EB]"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {progressPercent > 0 && (
            <span className="hidden rounded-full border border-[#2563EB]/20 bg-[#2563EB]/6 px-3 py-1 text-[10px] font-bold tracking-wider text-[#2563EB] sm:inline">
              {progressPercent}% explored
            </span>
          )}
          <Button
            size="sm"
            className="hidden rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C5CFC] px-5 font-semibold text-white shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/20 lg:inline-flex"
            onClick={() => go("#usecases")}
          >
            Start a Workflow
          </Button>
          <button
            className="rounded-xl p-2 text-[#7A7A8A] hover:bg-[#2563EB]/8 hover:text-[#2563EB] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border-t border-[#D6E0FF]/60 px-4 pb-4 pt-2 lg:hidden"
        >
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#7A7A8A] hover:bg-[#2563EB]/8 hover:text-[#2563EB]"
            >
              {l.label}
            </button>
          ))}
          <Button
            size="sm"
            className="mt-2 w-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C5CFC] font-semibold text-white"
            onClick={() => go("#usecases")}
          >
            Start a Workflow
          </Button>
        </motion.div>
      )}
    </header>
  );
}
