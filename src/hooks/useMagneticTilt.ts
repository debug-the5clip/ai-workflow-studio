import { useCallback, useRef } from "react";

/**
 * Returns a ref + mouse-move / mouse-leave handlers that produce a subtle
 * 3-D tilt toward the cursor. Pair with the `.tilt-card` CSS class for
 * the transition + transform-style.
 *
 * Usage:
 *   const { ref, onMouseMove, onMouseLeave } = useMagneticTilt();
 *   <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="tilt-card ...">
 */
export function useMagneticTilt(maxTilt = 6) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -maxTilt;
      const rotateY = ((x - cx) / cx) * maxTilt;
      el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    },
    [maxTilt],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
