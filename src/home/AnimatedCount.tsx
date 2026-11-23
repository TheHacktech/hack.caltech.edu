import { useEffect, useRef, useState } from 'react';
import { reducedMotionQuery, useMediaQuery } from '../components/useMediaQuery';

/** Count up once when the statistic enters the viewport. */
export function AnimatedCount({ count, suffix }: { count: number; suffix: string }) {
  const element = useRef<HTMLElement>(null);
  const [value, setValue] = useState(count);
  const reducedMotion = useMediaQuery(reducedMotionQuery);

  useEffect(() => {
    if (reducedMotion || !element.current) {
      setValue(count);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        setValue(Math.round(count * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.5 });

    observer.observe(element.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [count, reducedMotion]);

  return (
    <dd ref={element} className="stat-number" aria-label={`${count}${suffix}`}>
      <span aria-hidden="true">{value}{suffix}</span>
    </dd>
  );
}
