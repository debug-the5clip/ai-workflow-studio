import { ShieldCheck } from "lucide-react";

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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* AI + Human section */}
          <div className="glass-light rounded-3xl p-6 shadow-md shadow-black/[0.04] sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#D97757]" />
              <div>
                <h2 className="text-xl font-bold text-[#1C1C1C]">AI + Human Judgment</h2>
                <p className="text-xs text-[#9A968F]">The best marketing combines both.</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">Claude can help</p>
                <ul className="space-y-2">
                  {CAN_HELP.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#4A4A46]">
                      <span className="mt-0.5 text-[#6B9E8A]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D97757]">Humans should</p>
                <ul className="space-y-2">
                  {HUMANS_SHOULD.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#4A4A46]">
                      <span className="mt-0.5 text-[#D97757]">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 rounded-2xl border border-[#E2E0DB]/60 bg-white/60 p-5 text-center shadow-sm">
            <p className="text-xs leading-relaxed text-[#6B6B66]">
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
    <footer className="border-t border-[#E2E0DB]/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[#9A968F]">
            Claude Marketing Lab — An educational experience for marketing teams.
          </p>
          <p className="text-xs text-[#9A968F]/60">
            Built with care. All sample data is clearly labeled.
          </p>
        </div>
      </div>
    </footer>
  );
}
