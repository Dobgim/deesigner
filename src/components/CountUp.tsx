import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Numeric target to count to. */
  end: number;
  /** Text rendered before the number (e.g. "$"). */
  prefix?: string;
  /** Text rendered after the number (e.g. "+", "%"). */
  suffix?: string;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 up to `end` once the element scrolls into view.
 * Used for the marketing stat figures on the home page.
 */
const CountUp: React.FC<CountUpProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 1800,
  className,
}) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutCubic for a natural deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
};

export default CountUp;
