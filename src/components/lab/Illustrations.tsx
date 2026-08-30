/**
 * Original cartoon-style SVG illustrations for Claude Marketing Lab.
 * No copyrighted characters — friendly abstract characters with the
 * periwinkle/coral/yellow/purple/green palette.
 */
import { motion } from "framer-motion";

/** Hero illustration: friendly AI character with marketing workflow board */
export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-sm" aria-hidden>
      {/* Speech bubble */}
      <div className="relative mb-3 ml-8">
        <div className="inline-block rounded-2xl border border-[#E8E4DE] bg-white px-5 py-3 shadow-md shadow-black/[0.03]">
          <p className="text-sm font-semibold text-[#2D2D2D]">
            Hi! I'm your AI Workflow Assistant 👋
          </p>
          <p className="mt-1 text-xs text-[#8A8A82]">
            Tell me what you want to accomplish,<br />I'll plan the steps for you!
          </p>
        </div>
        {/* Tail */}
        <div className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-b border-r border-[#E8E4DE] bg-white" />
      </div>

      <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Background circle */}
        <circle cx="200" cy="170" r="140" fill="#FFF0E5" opacity="0.5" />
        <circle cx="200" cy="170" r="100" fill="#FAF9F6" opacity="0.6" />

        {/* Character body — friendly rounded form */}
        {/* Legs */}
        <rect x="170" y="250" width="22" height="46" rx="11" fill="#FF9B54" />
        <rect x="208" y="250" width="22" height="46" rx="11" fill="#FF9B54" />
        {/* Shoes */}
        <ellipse cx="181" cy="298" rx="15" ry="7" fill="#6C5CE7" />
        <ellipse cx="219" cy="298" rx="15" ry="7" fill="#6C5CE7" />

        {/* Torso */}
        <rect x="160" y="185" width="80" height="70" rx="20" fill="#6C5CE7" />
        {/* Shirt collar */}
        <path d="M185 185 L200 200 L215 185" fill="#5A4BD1" />
        {/* Pocket */}
        <rect x="182" y="210" width="16" height="12" rx="3" fill="#5A4BD1" opacity="0.5" />

        {/* Arms */}
        <rect x="130" y="195" width="35" height="16" rx="8" fill="#F5CBA7" />
        <rect x="235" y="192" width="40" height="16" rx="8" fill="#F5CBA7" />
        {/* Hands */}
        <circle cx="130" cy="203" r="9" fill="#F5CBA7" />
        <circle cx="275" cy="200" r="9" fill="#F5CBA7" />

        {/* Head */}
        <circle cx="200" cy="150" r="46" fill="#F5CBA7" />
        {/* Hair */}
        <path d="M158 142 C158 110 178 96 200 96 C222 96 242 110 242 142 C242 128 228 118 200 118 C172 118 158 128 158 142" fill="#4A3728" />
        {/* Eyes */}
        <circle cx="186" cy="148" r="4.5" fill="#2D2D2D" />
        <circle cx="214" cy="148" r="4.5" fill="#2D2D2D" />
        <circle cx="188" cy="146" r="1.8" fill="white" />
        <circle cx="216" cy="146" r="1.8" fill="white" />
        {/* Smile */}
        <path d="M190 160 Q200 168 210 160" stroke="#2D2D2D" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Blush */}
        <circle cx="176" cy="157" r="5" fill="#FF8FA3" opacity="0.35" />
        <circle cx="224" cy="157" r="5" fill="#FF8FA3" opacity="0.35" />

        {/* Workflow board — floating to the right */}
        <g transform="translate(280, 115)">
          <rect x="0" y="0" width="96" height="120" rx="12" fill="white" stroke="#E8E4DE" strokeWidth="1.5" />
          {/* Board header */}
          <rect x="0" y="0" width="96" height="22" rx="12" fill="#FFF8F0" />
          <rect x="0" y="10" width="96" height="12" fill="#FFF8F0" />
          <circle cx="14" cy="11" r="3.5" fill="#FF7B72" />
          <circle cx="24" cy="11" r="3.5" fill="#FFD84D" />
          <circle cx="34" cy="11" r="3.5" fill="#67C587" />
          {/* Workflow items */}
          <rect x="10" y="30" width="76" height="7" rx="3.5" fill="#FFF0E5" />
          <rect x="10" y="42" width="60" height="7" rx="3.5" fill="#F5F0FF" />
          <rect x="10" y="54" width="68" height="7" rx="3.5" fill="#FFF0E5" />
          <rect x="10" y="66" width="54" height="7" rx="3.5" fill="#F5F0FF" />
          <rect x="10" y="78" width="66" height="7" rx="3.5" fill="#FFF0E5" />
          {/* Accent dots */}
          <circle cx="10" cy="33.5" r="1.8" fill="#4A7BF7" />
          <circle cx="10" cy="45.5" r="1.8" fill="#FF7B72" />
          <circle cx="10" cy="57.5" r="1.8" fill="#8B6CFC" />
          <circle cx="10" cy="69.5" r="1.8" fill="#67C587" />
          <circle cx="10" cy="81.5" r="1.8" fill="#FFD84D" />
          {/* Mini chart */}
          <rect x="10" y="92" width="10" height="14" rx="2" fill="#4A7BF7" opacity="0.25" />
          <rect x="24" y="96" width="10" height="10" rx="2" fill="#8B6CFC" opacity="0.25" />
          <rect x="38" y="93" width="10" height="13" rx="2" fill="#FF7B72" opacity="0.25" />
          <rect x="52" y="90" width="10" height="16" rx="2" fill="#67C587" opacity="0.25" />
          <rect x="66" y="95" width="10" height="11" rx="2" fill="#FFD84D" opacity="0.25" />
        </g>

        {/* Floating UI element left */}
        <g transform="translate(50, 110)">
          <rect x="0" y="0" width="65" height="36" rx="10" fill="white" stroke="#E8E4DE" strokeWidth="1.2" />
          <text x="10" y="16" fontSize="8" fontWeight="700" fill="#6C5CE7">Prompt</text>
          <text x="10" y="28" fontSize="7" fill="#8A8A82">→ Action</text>
        </g>

        {/* Decorative elements */}
        {/* Squiggly line */}
        <path d="M60 240 Q75 230 90 240 Q105 250 120 240" stroke="#FFD84D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Dots */}
        <circle cx="320" cy="85" r="3.5" fill="#FF7B72" opacity="0.45" />
        <circle cx="75" cy="285" r="2.5" fill="#8B6CFC" opacity="0.35" />
        <circle cx="340" cy="260" r="4" fill="#FFD84D" opacity="0.35" />
        <circle cx="55" cy="130" r="2.5" fill="#67C587" opacity="0.45" />
        {/* Star */}
        <path d="M350 140 L352.5 146 L359 146 L354 150 L355.5 156 L350 152.5 L344.5 156 L346 150 L341 146 L347.5 146Z" fill="#FFD84D" opacity="0.45" />
        {/* Plus signs */}
        <path d="M50 180 L55 180 M52.5 177.5 L52.5 182.5" stroke="#67C587" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
        <path d="M340 200 L345 200 M342.5 197.5 L342.5 202.5" stroke="#FF7B72" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
      </svg>
    </div>
  );
}

/** Decorative plant illustration — bottom left corner */
export function PlantDecoration() {
  return (
    <svg viewBox="0 0 120 140" fill="none" className="w-full h-auto" aria-hidden>
      {/* Pot */}
      <path d="M35 100 L45 135 L75 135 L85 100Z" fill="#FF9B54" opacity="0.7" />
      <rect x="30" y="95" width="60" height="10" rx="5" fill="#FF9B54" opacity="0.85" />
      {/* Soil */}
      <ellipse cx="60" cy="100" rx="25" ry="4" fill="#8B6C4E" opacity="0.3" />
      {/* Stems */}
      <path d="M60 95 Q55 70 50 55" stroke="#67C587" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M60 95 Q65 75 72 60" stroke="#67C587" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M60 95 Q60 70 58 45" stroke="#67C587" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Leaves */}
      <ellipse cx="48" cy="52" rx="12" ry="7" fill="#67C587" opacity="0.4" transform="rotate(-20 48 52)" />
      <ellipse cx="74" cy="57" rx="11" ry="6" fill="#67C587" opacity="0.35" transform="rotate(15 74 57)" />
      <ellipse cx="58" cy="42" rx="10" ry="6" fill="#67C587" opacity="0.45" transform="rotate(-5 58 42)" />
      {/* Small flower */}
      <circle cx="56" cy="38" r="3" fill="#FFD84D" opacity="0.6" />
      <circle cx="56" cy="38" r="1.5" fill="#FF9B54" opacity="0.5" />
    </svg>
  );
}

/** Decorative robot illustration — bottom right corner */
export function RobotDecoration() {
  return (
    <svg viewBox="0 0 100 120" fill="none" className="w-full h-auto" aria-hidden>
      {/* Antenna */}
      <line x1="50" y1="20" x2="50" y2="10" stroke="#8B6CFC" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="50" cy="8" r="3.5" fill="#FFD84D" opacity="0.6" />
      {/* Head */}
      <rect x="30" y="20" width="40" height="30" rx="10" fill="white" stroke="#E8E4DE" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="42" cy="35" r="4" fill="#6C5CE7" opacity="0.6" />
      <circle cx="58" cy="35" r="4" fill="#FF7B72" opacity="0.6" />
      <circle cx="43" cy="34" r="1.5" fill="white" />
      <circle cx="59" cy="34" r="1.5" fill="white" />
      {/* Mouth */}
      <path d="M42 42 Q50 47 58 42" stroke="#8B6CFC" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Body */}
      <rect x="34" y="52" width="32" height="28" rx="8" fill="white" stroke="#E8E4DE" strokeWidth="1.5" />
      {/* Heart / button on body */}
      <circle cx="50" cy="66" r="4" fill="#FF7B72" opacity="0.4" />
      {/* Arms */}
      <rect x="20" y="56" width="14" height="8" rx="4" fill="white" stroke="#E8E4DE" strokeWidth="1" />
      <rect x="66" y="56" width="14" height="8" rx="4" fill="white" stroke="#E8E4DE" strokeWidth="1" />
      {/* Legs */}
      <rect x="38" y="80" width="8" height="14" rx="4" fill="white" stroke="#E8E4DE" strokeWidth="1" />
      <rect x="54" y="80" width="8" height="14" rx="4" fill="white" stroke="#E8E4DE" strokeWidth="1" />
      {/* Feet */}
      <ellipse cx="42" cy="96" rx="7" ry="4" fill="#6C5CE7" opacity="0.3" />
      <ellipse cx="58" cy="96" rx="7" ry="4" fill="#FF7B72" opacity="0.3" />
      {/* Sparkles around */}
      <path d="M22 25 L24 28 L27 28 L24.5 30 L25.5 33 L22 31 L18.5 33 L19.5 30 L17 28 L20 28Z" fill="#FFD84D" opacity="0.35" />
      <path d="M78 45 L79.5 47.5 L82 47.5 L80 49 L80.8 51.5 L78 50 L75.2 51.5 L76 49 L74 47.5 L76.5 47.5Z" fill="#FF7B72" opacity="0.3" />
    </svg>
  );
}

/** Small inline character illustrations for building blocks / flashcards */
export function CharacterIcon({ type }: { type: "prompt" | "skill" | "connector" | "loop" | "routine" }) {
  const configs = {
    prompt: { color: "#4A7BF7", label: "💬", bg: "#F0F4FF" },
    skill: { color: "#8B6CFC", label: "🧰", bg: "#F5F0FF" },
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
export function AnimatedArrow({ color = "#6C5CE7", vertical = true }: { color?: string; vertical?: boolean }) {
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
