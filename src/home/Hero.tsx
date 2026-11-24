import { useEffect, useRef } from 'react';
import { Particles } from '../components/Particles';
import { reducedMotionQuery, useMediaQuery } from '../components/useMediaQuery';
import { eventDate } from './content';

interface HeroProps {
  openInterest: () => void;
  openInquiry: () => void;
}

export function Hero({ openInterest, openInquiry }: HeroProps) {
  const banner = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery(reducedMotionQuery);
  const desktop = useMediaQuery('(min-width: 992px) and (pointer: fine)');

  useEffect(() => {
    const layers = banner.current;
    if (!layers || reducedMotion || !desktop) return;
    let frame = 0;
    function update() {
      if (!layers) return;
      const scroll = Math.min(window.scrollY, 420);
      layers.style.setProperty('--hero-people-y', `${scroll * 0.038}px`);
      layers.style.setProperty('--hero-bars-y', `${scroll * 0.09}px`);
    }
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      layers.style.removeProperty('--hero-people-y');
      layers.style.removeProperty('--hero-bars-y');
    };
  }, [desktop, reducedMotion]);

  return (
    <section className="hero has-before" id="home" aria-label="Hacktech">
      <Particles />
      <div className="container">
        <h1 className="hero-title-wrapper">
          <img src="/images/logo-text.svg" alt="Hacktech" className="hero-title-image" />
        </h1>
        <p className="section-subtitle hero-date">
          <time dateTime="2027-02-26">{eventDate}</time>
        </p>
        <div className="hero-actions">
          <div className="btn-wrapper">
            <button
              type="button"
              className="btn"
              aria-haspopup="dialog"
              aria-controls="hacker-interest"
              onClick={openInterest}
            >
              I'm a Hacker
            </button>
            <span className="notification-bubble" aria-hidden="true">
              !
            </span>
          </div>
          <button
            type="button"
            className="btn"
            aria-haspopup="dialog"
            aria-controls="application-modal"
            onClick={openInquiry}
          >
            I'm a Sponsor/Judge!
          </button>
        </div>
        <div className="hero-banner" ref={banner}>
          <img
            src="/images/hero-people.webp"
            width="900"
            height="439"
            alt="Hacktech participants gathered on campus"
            className="w-100 hero-people"
            fetchPriority="high"
          />
          <img src="/images/hero-banner-bg.webp" alt="" className="hero-banner-bg hero-bars" />
        </div>
      </div>
    </section>
  );
}
