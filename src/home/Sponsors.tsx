import { useEffect, useRef, useState } from 'react';
import { sponsors } from './content';

type Sponsor = (typeof sponsors)[number];

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const tile = useRef<HTMLLIElement>(null);
  const nameId = `sponsor-${sponsor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const logo = (
    <img
      src={`/images/${sponsor.logo}`}
      alt={sponsor.name}
      loading="lazy"
      decoding="async"
      className={sponsor.lightBackground ? 'logo-light-background' : undefined}
    />
  );

  useEffect(() => {
    if (!pinned) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !tile.current?.contains(event.target)) setPinned(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [pinned]);

  return (
    <li
      ref={tile}
      className={`sponsor-logo sponsor-logo--${sponsor.size}`}
      data-dismissed={dismissed}
      onPointerLeave={() => setDismissed(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDismissed(false);
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return;
        setPinned(false);
        setDismissed(true);
        tile.current?.querySelector('button')?.focus();
      }}
    >
      {sponsor.size === 'small' ? (
        <a className="sponsor-logo-trigger" href={sponsor.url} target="_blank" rel="noopener">
          {logo}
        </a>
      ) : (
        <>
          <button
            type="button"
            className="sponsor-logo-trigger"
            aria-label={`About ${sponsor.name}`}
            aria-controls={nameId}
            aria-pressed={pinned}
            onClick={() => {
              setDismissed(pinned);
              setPinned(!pinned);
            }}
          >
            {logo}
          </button>
          <div className="sponsor-popover" id={nameId} data-pinned={pinned}>
            <h3>{sponsor.name}</h3>
            <p>{sponsor.description ?? 'Learn more about this Hacktech sponsor on their website.'}</p>
            <a href={sponsor.url} target="_blank" rel="noopener">
              Visit website ↗
            </a>
          </div>
        </>
      )}
    </li>
  );
}

export function Sponsors() {
  return (
    <section className="section sponsors" id="sponsor" aria-labelledby="sponsor-title">
      <svg width="0" height="0" className="sponsor-logo-filters" aria-hidden="true">
        <defs>
          <filter id="sponsor-white-logo" colorInterpolationFilters="sRGB">
            {/* Convert dark ink to white and use source luminance as transparency. */}
            <feColorMatrix
              type="matrix"
              values="
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              -.2126 -.7152 -.0722 0 1"
            />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.45" intercept="-.08" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className="container">
        <p className="section-subtitle">Huge thanks to our</p>
        <h2 className="h2 section-title" id="sponsor-title">
          Hacktech <span className="span">Sponsors</span>
        </h2>
        <p className="section-text">
          Our sponsors are essential, providing support that helps us create an amazing event. We’re
          grateful for their partnership! More sponsors to come!
        </p>
        <ul className="sponsor-logos" aria-label="Hacktech sponsors">
          {sponsors.map((sponsor) => (
            <SponsorLogo key={sponsor.name} sponsor={sponsor} />
          ))}
        </ul>
      </div>
    </section>
  );
}
