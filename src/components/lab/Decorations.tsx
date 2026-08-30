/**
 * Reusable playful SVG decorations — inspired by the reference's hand-drawn
 * floating elements (squiggles, arrows, dots, stars, circles).
 *
 * All colors come from the periwinkle palette tokens.
 */

export function Squiggle({ className = "", color = "#FF7B72" }: { className?: string; color?: string }) {
  return (
    <svg className={className} width="48" height="16" viewBox="0 0 48 16" fill="none" aria-hidden>
      <path
        d="M2 14C8 6 14 2 20 6C26 10 32 14 38 8C44 2 46 4 46 4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function CurvedArrow({ className = "", color = "#2563EB", flip = false }: { className?: string; color?: string; flip?: boolean }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path
        d="M8 32C12 20 20 12 32 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M26 6L32 8L30 14"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Dot({ className = "", color = "#FFD84D", size = 8 }: { className?: string; color?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 8 8" aria-hidden>
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

export function Star({ className = "", color = "#FFD84D", size = 20 }: { className?: string; color?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 1L12.5 7.5L19 8L14 12.5L15.5 19L10 15.5L4.5 19L6 12.5L1 8L7.5 7.5L10 1Z"
        fill={color}
      />
    </svg>
  );
}

export function Circle({ className = "", color = "#7C5CFC", size = 24, hollow = false }: { className?: string; color?: string; size?: number; hollow?: boolean }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" fill={hollow ? "none" : color} opacity={hollow ? 1 : 0.2} />
    </svg>
  );
}

export function Plus({ className = "", color = "#67C587", size = 16 }: { className?: string; color?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2V14M2 8H14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** A cluster of floating decorations for a section — pick preset or customize */
export function FloatingDecorations({ preset = "default" }: { preset?: "hero" | "workflow" | "learn" | "default" }) {
  const sets = {
    hero: (
      <>
        <Squiggle className="absolute left-[5%] top-[15%] float-slow opacity-40" color="#FF7B72" />
        <Dot className="absolute right-[8%] top-[10%] float-medium" color="#FFD84D" size={10} />
        <Star className="absolute left-[12%] bottom-[20%] wiggle opacity-50" color="#FFD84D" />
        <Circle className="absolute right-[15%] bottom-[15%] float-slow opacity-30" color="#7C5CFC" hollow />
        <Dot className="absolute left-[25%] top-[5%] pulse-soft" color="#67C587" size={6} />
        <CurvedArrow className="absolute right-[5%] top-[40%] float-medium opacity-25" color="#2563EB" />
        <Dot className="absolute left-[3%] top-[50%] float-slow" color="#FF8FA3" size={8} />
        <Circle className="absolute right-[3%] top-[25%] wiggle opacity-20" color="#FF9B54" size={16} hollow />
      </>
    ),
    workflow: (
      <>
        <Squiggle className="absolute right-[8%] top-[10%] float-slow opacity-30" color="#7C5CFC" />
        <Dot className="absolute left-[5%] top-[30%] float-medium" color="#FFD84D" size={8} />
        <Star className="absolute right-[12%] bottom-[10%] wiggle opacity-40" color="#FF7B72" size={16} />
        <Circle className="absolute left-[10%] bottom-[20%] float-slow opacity-25" color="#2563EB" hollow />
      </>
    ),
    learn: (
      <>
        <Squiggle className="absolute left-[3%] top-[20%] float-slow opacity-25" color="#67C587" />
        <Dot className="absolute right-[6%] top-[15%] pulse-soft" color="#FF7B72" size={10} />
        <CurvedArrow className="absolute left-[8%] bottom-[15%] float-medium opacity-20" color="#7C5CFC" flip />
        <Star className="absolute right-[10%] bottom-[25%] wiggle opacity-35" color="#FFD84D" size={14} />
      </>
    ),
    default: (
      <>
        <Dot className="absolute left-[5%] top-[20%] float-slow" color="#FFD84D" size={8} />
        <Circle className="absolute right-[8%] top-[30%] float-medium opacity-25" color="#7C5CFC" hollow />
        <Star className="absolute left-[10%] bottom-[20%] wiggle opacity-30" color="#FF7B72" size={14} />
      </>
    ),
  };

  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>{sets[preset]}</div>;
}
