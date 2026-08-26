import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FlaskConical, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLab } from "@/context/LabContext";

const LINKS = [
  { label: "Learn", href: "#learn" },
  { label: "Building Blocks", href: "#blocks" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Workflow Lab", href: "#workflow" },
  { label: "About", href: "#about" },
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
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      {/* scroll progress */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400"
        style={{ scaleX: progress }}
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label="Claude Marketing Lab — back to top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 ring-1 ring-white/15">
            <FlaskConical className="h-4.5 w-4.5 text-cyan-300" />
          </span>
          <span className="text-sm sm:text-base">
            Claude <span className="text-gradient">Marketing Lab</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          {/* journey progress pill */}
          <div className="ml-3 flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70" />
            Journey · {progressPercent}%
          </div>
          <Button
            size="sm"
            onClick={() => go("#usecases")}
            className="ml-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 font-semibold text-slate-950 hover:opacity-90"
          >
            Start Workflow
          </Button>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-white/10 px-4 pb-4 lg:hidden">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="block w-full rounded-lg px-3 py-3 text-left text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          <Button
            onClick={() => go("#usecases")}
            className="mt-2 w-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 font-semibold text-slate-950"
          >
            Start Workflow · {progressPercent}% complete
          </Button>
        </div>
      )}
    </header>
  );
}
