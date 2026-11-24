import { siteUrl } from '../components/siteUrl';
import { useRef } from 'react';
import { eventDate } from './content';
import { useHeroParallax } from './useHeroParallax';
import { HeroFlares } from './HeroFlares';

interface HeroProps {
  openInterest: () => void;
  openInquiry: () => void;
}

export function Hero({ openInterest, openInquiry }: HeroProps) {
  const hero = useRef<HTMLElement>(null);
  useHeroParallax(hero);

  return (
    <section ref={hero} className="hero" id="home" aria-label="Hacktech">
      <div className="container">
        <h1 className="hero-title-wrapper">
          <img src={siteUrl('images/logo-text.svg')} alt="Hacktech" className="hero-title-image" />
        </h1>
        <p className="section-subtitle hero-date">
          <time dateTime="2027-02-26">{eventDate}</time>
        </p>
        <div className="hero-actions">
          <div className="btn-wrapper">
            <button
              type="button"
              className="btn action-button"
              aria-haspopup="dialog"
              aria-controls="hacker-interest"
              onClick={openInterest}
            >
              I'm a Hacker!
            </button>
            <span className="notification-bubble" aria-hidden="true">
              1
            </span>
          </div>
          <button
            type="button"
            className="btn action-button"
            aria-haspopup="dialog"
            aria-controls="application-modal"
            onClick={openInquiry}
          >
            I'm a Sponsor/Judge!
          </button>
        </div>
      </div>
      <div className="hero-scene">
        <HeroFlares />
        <div className="hero-layer hero-layer--people">
          <img
            src={siteUrl('images/hero-people.webp')}
            width="900"
            height="439"
            alt="Hacktech participants gathered on campus"
            className="hero-people"
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="hero-divider" aria-hidden="true" />
    </section>
  );
}
