import { motion } from "framer-motion";
import { Bot, FlaskConical, ShieldCheck } from "lucide-react";
import { CLAUDE_HELPS_WITH, HUMANS_SHOULD } from "@/data/content";

export function Trust() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Responsible AI</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            AI + <span className="text-gradient">human judgment</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Claude is a copilot, not a replacement for a marketing team. The
            strongest workflows put AI speed and human judgment in deliberate
            partnership.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-cyan-300/20 bg-gradient-to-b from-cyan-300/[0.07] to-transparent p-6"
          >
            <p className="flex items-center gap-2.5 text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/15"><Bot className="h-4.5 w-4.5 text-cyan-300" /></span>
              Claude can help
            </p>
            <ul className="mt-5 space-y-3">
              {CLAUDE_HELPS_WITH.map((c) => (
                <li key={c.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{c.detail}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-fuchsia-300/20 bg-gradient-to-b from-fuchsia-400/[0.07] to-transparent p-6"
          >
            <p className="flex items-center gap-2.5 text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-fuchsia-300/15"><ShieldCheck className="h-4.5 w-4.5 text-fuchsia-300" /></span>
              Humans should
            </p>
            <ul className="mt-5 space-y-3">
              {HUMANS_SHOULD.map((h) => (
                <li key={h.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                  <p className="text-sm font-semibold">{h.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{h.detail}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          This lab teaches the method with simulated scenarios and sample data.
          When you connect real work through official integrations, verify
          outputs before they inform decisions — always.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 ring-1 ring-white/15">
            <FlaskConical className="h-4 w-4 text-cyan-300" />
          </span>
          <span className="text-sm">Claude Marketing Lab</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <button onClick={() => go("#learn")} className="hover:text-foreground">Learn</button>
          <button onClick={() => go("#blocks")} className="hover:text-foreground">Building Blocks</button>
          <button onClick={() => go("#usecases")} className="hover:text-foreground">Use Cases</button>
          <button onClick={() => go("#quiz")} className="hover:text-foreground">Quiz & Cards</button>
          <button onClick={() => go("#builder")} className="hover:text-foreground">Workflow Builder</button>
        </nav>
        <p className="text-xs text-muted-foreground">
          Educational demo · All scenarios use fictional Voyara Luggage & sample data
        </p>
      </div>
    </footer>
  );
}
