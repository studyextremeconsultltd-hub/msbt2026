import { type ReactNode, useEffect, useRef, useState } from "react";

type DeferredMountProps = {
  children: ReactNode;
  /** Root margin for early prefetch before entering viewport */
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
};

/** Mount children only when near the viewport — cuts unused JS/work on first paint. */
export default function DeferredMount({
  children,
  rootMargin = "200px 0px",
  minHeight,
  className = "",
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;

    if (!("IntersectionObserver" in window)) {
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
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);

  return (
    <div ref={ref} className={className} style={minHeight != null ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  );
}
