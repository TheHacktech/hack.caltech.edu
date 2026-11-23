import { useId, type CSSProperties } from 'react';

// Traced from the original 1476 × 372 artwork: four overlapping slanted
// rectangles on each side, with the same pink-to-orange-to-yellow gradients.
const flares = [
  { x: 120, y: 0, width: 200, opacity: 0.74, drop: 96, delay: 260, pink: '#ed004b', red: '#ff303d' },
  { x: 20, y: 80, width: 200, opacity: 0.58, drop: 35, delay: 300, pink: '#ff246e', red: '#ff3666' },
  { x: 0, y: 206, width: 200, opacity: 0.76, drop: 12, delay: 340, pink: '#ed0040', red: '#ff3a31' },
  { x: 230, y: 124, width: 225, opacity: 0.77, drop: 62, delay: 380, pink: '#ff2631', red: '#ff3029' },
];

export function HeroFlares() {
  const id = useId();

  return (
    <svg className="hero-flares" viewBox="0 0 1476 372" aria-hidden="true" focusable="false">
      <defs>
        {flares.map(({ x, y, width, pink, red }, index) => (
          <linearGradient
            key={index}
            id={`${id}-flare-${index}`}
            gradientUnits="userSpaceOnUse"
            x1={x}
            y1={y}
            x2={x + width + (372 - y) / 3}
            y2="372"
          >
            <stop offset="0" stopColor={pink} />
            <stop offset="0.12" stopColor={red} />
            <stop offset="0.68" stopColor="#ff922c" />
            <stop offset="1" stopColor="#ffd02b" />
          </linearGradient>
        ))}
      </defs>
      {[false, true].map((mirrored) => (
        <g key={String(mirrored)} opacity="0.77" transform={mirrored ? 'translate(1476 0) scale(-1 1)' : undefined}>
          {flares.map(({ x, y, width, opacity, drop, delay }, index) => {
            // Extend below the visible scene so the floor stays filled during motion.
            const bottom = 404;
            const lean = (bottom - y) / 3;
            const style = {
              '--flare-drop': `${drop * (mirrored ? 0.84 : 1)}px`,
              '--flare-delay': `${delay + (mirrored ? 30 : 0)}ms`,
            } as CSSProperties;

            return (
              <g key={index} className="hero-flare-motion" style={style}>
                <g className="hero-flare-entrance">
                  <polygon
                    points={`${x},${y} ${x + width},${y} ${x + width + lean},${bottom} ${x + lean},${bottom}`}
                    fill={`url(#${id}-flare-${index})`}
                    opacity={opacity / 0.77}
                  />
                </g>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
