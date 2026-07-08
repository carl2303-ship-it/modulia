"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anima suavemente a transição entre valores de preço.
 * Usa requestAnimationFrame com easing exponencial para efeito premium.
 */
export function useAnimatedPrice(targetPrice: number, duration = 600) {
  const [displayPrice, setDisplayPrice] = useState(targetPrice);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef({ value: targetPrice, time: 0 });

  useEffect(() => {
    const startValue = displayPrice;
    const diff = targetPrice - startValue;
    if (diff === 0) return;

    startRef.current = { value: startValue, time: performance.now() };

    const animate = (now: number) => {
      const elapsed = now - startRef.current.time;
      const progress = Math.min(elapsed / duration, 1);
      // Easing cubic-bezier luxury
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startRef.current.value + diff * eased);
      setDisplayPrice(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPrice, duration]);

  return displayPrice;
}

/** Formata preço em euros com separador de milhares */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
