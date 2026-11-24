import { Fragment, useEffect, useState } from 'react';
import { liveConfig } from './content';

const start = Date.parse(liveConfig.hackingStartsAt);
const end = Date.parse(liveConfig.hackingEndsAt);
const units = ['Days', 'Hours', 'Mins', 'Sec'];

export function Countdown() {
  const [now, setNow] = useState(Date.now);
  const ended = now >= end;
  useEffect(() => {
    if (ended) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [ended]);

  const began = now >= start;
  const remaining = Math.max(0, Math.floor(((began ? end : start) - now) / 1000));
  const parts = [
    Math.floor(remaining / 86400),
    Math.floor((remaining % 86400) / 3600),
    Math.floor((remaining % 3600) / 60),
    remaining % 60,
  ];

  return (
    <section className="hero-live" aria-label="Hacktech countdown">
      <div className="hero-live-bg" aria-hidden="true" />
      <div className="live-container hero-live-content">
        <section className="countdown-panel" aria-label="Hacktech countdown">
          <div className="countdown-labels" aria-hidden="true">
            {units.map((unit) => (
              <span key={unit}>{unit}</span>
            ))}
          </div>
          <div className="countdown-readout" aria-hidden="true">
            {parts.map((part, index) => (
              <Fragment key={units[index]}>
                {index > 0 && <span>:</span>}
                <span>{String(part).padStart(2, '0')}</span>
              </Fragment>
            ))}
          </div>
          <div className="countdown-status" role="status">
            {ended ? 'Hacktech 2026 has ended' : began ? 'Until hacking ends' : 'Until hacking starts'}
          </div>
        </section>
      </div>
    </section>
  );
}
