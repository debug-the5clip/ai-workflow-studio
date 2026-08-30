import { ShieldCheck } from "lucide-react";
import { FloatingDecorations, Squiggle } from "@/components/lab/Decorations";

const CAN_HELP = [
  "Research customer signals and market trends",
  "Organize and categorize large volumes of information",
  "Analyze competitor positioning and messaging",
  "Draft campaign briefs, ad copy, and content",
  "Recommend hypotheses and experiments",
  "Automate repeatable workflows with Skills and Connectors",
];

const HUMANS_SHOULD = [
  "Verify important information before acting on it",
  "Approve campaigns before they go live",
  "Make strategic business decisions",
  "Validate business assumptions with real customers",
  "Review sensitive or legal content",
  "Approve external publication",
  "Make financial and product decisions",
];

export function Trust() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <FloatingDecorations preset="default" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-[#D6E0FF] bg-white p-6 shadow-lg shadow-blue-500/5 sm:p-8 tilt-card hover-glow">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C5CFC]">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111111]" style={{ fontFamily: "'Georgia', serif" }}>AI + Human Judgment</h2>
                <p className="text-xs text-[#B0B0BA]">The best marketing combines both.</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#67C587]/20 bg-[#67C587]/[0.04] p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#67C587]">Claude can help</p>
                <ul className="space-y-2">
                  {CAN_HELP.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#444444]">
                      <span className="mt-0.5 text-[#67C587]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#FF7B72]/20 bg-[#FF7B72]/[0.04] p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#FF7B72]">Humans should</p>
                <ul className="space-y-2">
                  {HUMANS_SHOULD.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#444444]">
                      <span className="mt-0.5 text-[#FF7B72]">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#D6E0FF] bg-white/60 p-5 text-center shadow-sm">
            <p className="text-xs leading-relaxed text-[#7A7A8A]">
              Claude Marketing Lab is an educational simulation. Some data shown is
              sample data for demonstration. Real workflows depend on your actual
              connected sources and require human review before business decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#D6E0FF]/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Squiggle color="#D6E0FF" className="opacity-40" />
          </div>
          <p className="text-xs text-[#B0B0BA]">
            Claude Marketing Lab — An educational experience for marketing teams.
          </p>
          <p className="text-xs text-[#B0B0BA]/60">
            Built with care. All sample data is clearly labeled.
          </p>
        </div>
      </div>
    </footer>
  );
}
