import { useEffect, useRef } from 'react';
import { reducedMotionQuery, useMediaQuery } from './useMediaQuery';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pushX: number;
  pushY: number;
  radius: number;
}

export function Particles({ prominent = false }: { prominent?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useMediaQuery(reducedMotionQuery);
  const desktop = useMediaQuery('(min-width: 601px)');
  const enabled = !reducedMotion && (desktop || prominent);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context || !enabled) return;

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
      const count = Math.min(prominent ? 90 : 56, Math.max(24, Math.round((width * height) / (prominent ? 22_000 : 35_000))));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        pushX: 0,
        pushY: 0,
        radius: prominent ? Math.random() * 2 + 2 : Math.random() * 2 + 0.6,
      }));
    };

    function scatter(event: MouseEvent) {
      if (!visible || !element || !event.detail || !(event.target instanceof Element)) return;
      if (event.target.closest('a, button, input, select, textarea, label, summary, dialog, [contenteditable="true"]')) return;
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      for (const point of particles) {
        const dx = point.x - x;
        const dy = point.y - y;
        const distance = Math.hypot(dx, dy);
        if (distance >= 220) continue;
        const speed = 8 * (1 - distance / 220);
        const angle = Math.atan2(dy, dx);
        point.pushX = Math.cos(angle) * speed;
        point.pushY = Math.sin(angle) * speed;
      }
    }

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      for (const [index, point] of particles.entries()) {
        point.x = (point.x + point.vx + point.pushX + width) % width;
        point.y = (point.y + point.vy + point.pushY + height) % height;
        point.pushX *= 0.94;
        point.pushY *= 0.94;
        context.fillStyle = prominent ? 'rgba(255,255,255,.62)' : 'rgba(255,255,255,.33)';
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();

        for (let next = index + 1; next < particles.length; next++) {
          const other = particles[next];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          const reach = prominent ? 185 : 155;
          if (distance >= reach) continue;
          context.strokeStyle = `rgba(255,255,255,${(prominent ? 0.32 : 0.23) * (1 - distance / reach)})`;
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
    if (prominent) document.addEventListener('click', scatter);
    document.addEventListener('visibilitychange', updateAnimation);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener('click', scatter);
      document.removeEventListener('visibilitychange', updateAnimation);
    };
  }, [enabled, prominent]);

  if (!enabled) return null;
  return (
    <div id="particles-js" aria-hidden="true">
      <canvas ref={canvas} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
