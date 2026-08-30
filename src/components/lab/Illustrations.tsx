/**
 * Original cartoon-style SVG illustrations for Claude Marketing Lab.
 * No copyrighted characters — friendly abstract characters with the
 * periwinkle/coral/yellow/purple/green palette.
 */
import { motion } from "framer-motion";

/** Hero illustration: friendly AI character with marketing workflow board */
export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Background circle */}
        <circle cx="200" cy="190" r="160" fill="#E0E9FF" opacity="0.5" />
        <circle cx="200" cy="190" r="120" fill="#EEF3FF" opacity="0.6" />

        {/* Character body — friendly rounded form */}
        {/* Legs */}
        <rect x="170" y="280" width="24" height="50" rx="12" fill="#FF9B54" />
        <rect x="206" y="280" width="24" height="50" rx="12" fill="#FF9B54" />
        {/* Shoes */}
        <ellipse cx="182" cy="332" rx="16" ry="8" fill="#2563EB" />
        <ellipse cx="218" cy="332" rx="16" ry="8" fill="#2563EB" />

        {/* Torso */}
        <rect x="160" y="210" width="80" height="75" rx="20" fill="#2563EB" />
        {/* Shirt collar */}
        <path d="M185 210 L200 225 L215 210" fill="#1D4ED8" />

        {/* Arms */}
        <rect x="130" y="220" width="35" height="18" rx="9" fill="#F5CBA7" />
        <rect x="235" y="215" width="40" height="18" rx="9" fill="#F5CBA7" />
        {/* Hands */}
        <circle cx="130" cy="229" r="10" fill="#F5CBA7" />
        <circle cx="275" cy="224" r="10" fill="#F5CBA7" />

        {/* Head */}
        <circle cx="200" cy="175" r="50" fill="#F5CBA7" />
        {/* Hair */}
        <path d="M155 165 C155 130 180 115 200 115 C220 115 245 130 245 165 C245 150 230 140 200 140 C170 140 155 150 155 165" fill="#4A3728" />
        {/* Eyes */}
        <circle cx="185" cy="172" r="5" fill="#111111" />
        <circle cx="215" cy="172" r="5" fill="#111111" />
        <circle cx="187" cy="170" r="2" fill="white" />
        <circle cx="217" cy="170" r="2" fill="white" />
        {/* Smile */}
        <path d="M188 185 Q200 195 212 185" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Blush */}
        <circle cx="175" cy="182" r="6" fill="#FF8FA3" opacity="0.4" />
        <circle cx="225" cy="182" r="6" fill="#FF8FA3" opacity="0.4" />

        {/* Workflow board — floating to the right */}
        <g transform="translate(280, 140)">
          <rect x="0" y="0" width="100" height="130" rx="12" fill="white" stroke="#D6E0FF" strokeWidth="2" />
          {/* Board header */}
          <rect x="0" y="0" width="100" height="24" rx="12" fill="#EEF3FF" />
          <rect x="0" y="12" width="100" height="12" fill="#EEF3FF" />
          <circle cx="14" cy="12" r="4" fill="#FF7B72" />
          <circle cx="26" cy="12" r="4" fill="#FFD84D" />
          <circle cx="38" cy="12" r="4" fill="#67C587" />
          {/* Workflow items */}
          <rect x="10" y="32" width="80" height="8" rx="4" fill="#EEF3FF" />
          <rect x="10" y="46" width="65" height="8" rx="4" fill="#F0F4FF" />
          <rect x="10" y="60" width="72" height="8" rx="4" fill="#EEF3FF" />
          <rect x="10" y="74" width="58" height="8" rx="4" fill="#F0F4FF" />
          <rect x="10" y="88" width="70" height="8" rx="4" fill="#EEF3FF" />
          {/* Accent dots */}
          <circle cx="10" cy="36" r="2" fill="#2563EB" />
          <circle cx="10" cy="50" r="2" fill="#FF7B72" />
          <circle cx="10" cy="64" r="2" fill="#7C5CFC" />
          <circle cx="10" cy="78" r="2" fill="#67C587" />
          <circle cx="10" cy="92" r="2" fill="#FFD84D" />
          {/* Mini chart */}
          <rect x="10" y="104" width="12" height="16" rx="2" fill="#2563EB" opacity="0.3" />
          <rect x="26" y="110" width="12" height="10" rx="2" fill="#7C5CFC" opacity="0.3" />
          <rect x="42" y="106" width="12" height="14" rx="2" fill="#FF7B72" opacity="0.3" />
          <rect x="58" y="100" width="12" height="20" rx="2" fill="#67C587" opacity="0.3" />
          <rect x="74" y="108" width="12" height="12" rx="2" fill="#FFD84D" opacity="0.3" />
        </g>

        {/* Floating speech bubble from character */}
        <g transform="translate(80, 110)">
          <rect x="0" y="0" width="70" height="40" rx="12" fill="white" stroke="#D6E0FF" strokeWidth="1.5" />
          <path d="M15 40 L20 52 L30 40" fill="white" stroke="#D6E0FF" strokeWidth="1.5" />
          <text x="12" y="18" fontSize="9" fontWeight="700" fill="#2563EB">Prompt</text>
          <text x="12" y="30" fontSize="8" fill="#7A7A8A">→ Action</text>
        </g>

        {/* Decorative elements around the illustration */}
        {/* Squiggly line */}
        <path d="M60 260 Q75 250 90 260 Q105 270 120 260" stroke="#FFD84D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Dots */}
        <circle cx="320" cy="100" r="4" fill="#FF7B72" opacity="0.5" />
        <circle cx="80" cy="310" r="3" fill="#7C5CFC" opacity="0.4" />
        <circle cx="340" cy="280" r="5" fill="#FFD84D" opacity="0.4" />
        <circle cx="60" cy="140" r="3" fill="#67C587" opacity="0.5" />
        {/* Star */}
        <path d="M350 160 L353 167 L360 167 L354 172 L356 179 L350 175 L344 179 L346 172 L340 167 L347 167Z" fill="#FFD84D" opacity="0.5" />
        {/* Plus signs */}
        <path d="M55 195 L60 195 M57.5 192.5 L57.5 197.5" stroke="#67C587" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <path d="M335 220 L340 220 M337.5 217.5 L337.5 222.5" stroke="#FF7B72" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </svg>
    </div>
  );
}

/** Small inline character illustrations for building blocks / flashcards */
export function CharacterIcon({ type }: { type: "prompt" | "skill" | "connector" | "loop" | "routine" }) {
  const configs = {
    prompt: { color: "#2563EB", label: "💬", bg: "#EEF3FF" },
    skill: { color: "#7C5CFC", label: "🧰", bg: "#F0EDFF" },
    connector: { color: "#67C587", label: "🔗", bg: "#EDFFF4" },
    loop: { color: "#FF9B54", label: "🔄", bg: "#FFF4ED" },
    routine: { color: "#FF7B72", label: "📅", bg: "#FFEEED" },
  };
  const c = configs[type];
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
      style={{ background: c.bg, border: `2px solid ${c.color}20` }}
    >
      {c.label}
    </div>
  );
}

/** Animated workflow arrow connector */
export function AnimatedArrow({ color = "#2563EB", vertical = true }: { color?: string; vertical?: boolean }) {
  if (vertical) {
    return (
      <motion.div
        className="flex justify-center py-1"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <svg width="4" height="32" viewBox="0 0 4 32" fill="none">
          <line x1="2" y1="0" x2="2" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M2 28L2 32" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="flex items-center px-2"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <svg width="32" height="4" viewBox="0 0 32 4" fill="none">
        <line x1="0" y1="2" x2="28" y2="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
        <path d="M28 2L32 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
