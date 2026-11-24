import { useEffect, useRef } from 'react';
import { reducedMotionQuery, useMediaQuery } from './useMediaQuery';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useMediaQuery(reducedMotionQuery);
  const desktop = useMediaQuery('(min-width: 601px)');

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context || reducedMotion || !desktop) return;

    let frame = 0;
    let visible = false;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = element.clientWidth;
      height = element.clientHeight;
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(56, Math.max(18, Math.round((width * height) / 35_000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 0.6,
      }));
    };

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      for (const [index, point] of particles.entries()) {
        point.x = (point.x + point.vx + width) % width;
        point.y = (point.y + point.vy + height) % height;
        context.fillStyle = 'rgba(255,255,255,.33)';
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();

        for (let next = index + 1; next < particles.length; next++) {
          const other = particles[next];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance >= 155) continue;
          context.strokeStyle = `rgba(255,255,255,${0.23 * (1 - distance / 155)})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
      frame = requestAnimationFrame(draw);
    }

    function updateAnimation() {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAnimation();
    });
    intersection.observe(element);
    document.addEventListener('visibilitychange', updateAnimation);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', updateAnimation);
    };
  }, [reducedMotion, desktop]);

  if (reducedMotion || !desktop) return null;
  return (
    <div id="particles-js" aria-hidden="true">
      <canvas />
    </div>
  );
}
