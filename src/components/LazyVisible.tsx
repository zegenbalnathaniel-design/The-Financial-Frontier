"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Defers mounting its children until it scrolls near the viewport. Below-the-fold
 * visuals (the chart grid, the ~85vh PDF iframe) stay out of the initial commit, so
 * first paint and early scrolling don't pay for work the reader can't see yet. Once
 * mounted, children stay mounted (no thrash on scroll-out).
 */
export default function LazyVisible({
  children,
  rootMargin = "300px",
  minHeight,
  className,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={!show && minHeight ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  );
}
