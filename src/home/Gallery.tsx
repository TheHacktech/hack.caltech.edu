import { useEffect, useRef, useState } from 'react';
import { reducedMotionQuery, useMediaQuery } from '../components/useMediaQuery';

const photos = Array.from({ length: 6 }, (_, index) => ({
  src: `/2025/previews/${index + 1}.webp`,
  alt: `Hacktech Preview ${index + 1}`,
}));

export function Gallery() {
  const gallery = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const reducedMotion = useMediaQuery(reducedMotionQuery);

  const move = (step: number) => setCurrent((index) => (index + photos.length + step) % photos.length);

  useEffect(() => {
    const element = gallery.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    const updateVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || !visible || !tabVisible || reducedMotion) return;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % photos.length), 4000);
    return () => clearInterval(timer);
  }, [paused, hovered, focused, visible, tabVisible, reducedMotion, current]);

  return (
    <div className="about-gallery">
      <div className="gallery-wrapper">
        <div
          ref={gallery}
          className="gallery-container"
          role="region"
          aria-label="Hacktech 2025 photos"
          tabIndex={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }}
          onTouchStart={(event) => {
            swipeStart.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (swipeStart.current === null) return;
            const distance =
              (event.changedTouches[0]?.clientX ?? swipeStart.current) - swipeStart.current;
            if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
            swipeStart.current = null;
          }}
        >
          <div className="gallery-track">
            {photos.map((photo, index) => (
              <img
                key={photo.src}
                {...photo}
                width="1440"
                height="810"
                loading="lazy"
                decoding="async"
                className={index === current ? 'gallery-image active' : 'gallery-image'}
                aria-hidden={index !== current}
              />
            ))}
          </div>
          <button
            type="button"
            className="gallery-nav gallery-prev"
            aria-label="Previous image"
            onClick={() => move(-1)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="gallery-nav gallery-next"
            aria-label="Next image"
            onClick={() => move(1)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          {!reducedMotion && (
            <button
              className="gallery-pause"
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? 'Play' : 'Pause'}
            </button>
          )}
          <div className="gallery-dots">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                className={index === current ? 'gallery-dot active' : 'gallery-dot'}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === current}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
