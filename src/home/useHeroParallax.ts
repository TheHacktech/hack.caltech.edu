import { useEffect, type RefObject } from 'react';
import { reducedMotionQuery, useMediaQuery } from '../components/useMediaQuery';

/** Scroll moves each layer at a different speed; reversing scroll reverses the motion. */
export function useHeroParallax(hero: RefObject<HTMLElement | null>) {
  const reducedMotion = useMediaQuery(reducedMotionQuery);

  useEffect(() => {
    const element = hero.current;
    if (!element || reducedMotion) return;
    let height = 1;
    let frame = 0;
    const nativeScroll = CSS.supports('animation-timeline: scroll(root)') &&
      CSS.supports('animation-range: 0px 100px');

    function update() {
      frame = 0;
      const scroll = Math.max(0, Math.min(window.scrollY, height));
      element!.style.setProperty('--hero-lag', `${(scroll * 0.6).toFixed(2)}px`);
      element!.style.setProperty('--hero-edge-opacity', String(Math.min(scroll / 180, 1)));
      const flareProgress = scroll / height;
      element!.style.setProperty('--flare-progress', flareProgress.toFixed(4));
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function measure() {
      height = Math.max(1, element!.offsetHeight);
      element!.style.setProperty('--hero-height', `${height}px`);
      if (!nativeScroll) scheduleUpdate();
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    if (!nativeScroll) window.addEventListener('scroll', scheduleUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      observer.disconnect();
      element.style.removeProperty('--hero-lag');
      element.style.removeProperty('--hero-edge-opacity');
      element.style.removeProperty('--hero-height');
      element.style.removeProperty('--flare-progress');
    };
  }, [hero, reducedMotion]);
}
