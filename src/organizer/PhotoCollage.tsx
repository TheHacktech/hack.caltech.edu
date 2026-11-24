import { useRef, useState } from 'react';
import { reducedMotionQuery, useMediaQuery } from '../components/useMediaQuery';
import { organizerPhotos } from './content';

export function PhotoCollage() {
  const strip = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const mobile = useMediaQuery('(max-width: 600px)');
  const reducedMotion = useMediaQuery(reducedMotionQuery);

  function scrollToPhoto(index: number) {
    const element = strip.current;
    const photo = element?.children.item(index);
    if (!element || !photo) return;
    const bounds = element.getBoundingClientRect();
    const photoBounds = photo.getBoundingClientRect();
    element.scrollTo({
      left: element.scrollLeft + photoBounds.left - bounds.left - (bounds.width - photoBounds.width) / 2,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  function updateCurrentPhoto() {
    const element = strip.current;
    if (!element || !mobile) return;
    const center = element.getBoundingClientRect().left + element.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;
    for (const [index, photo] of Array.from(element.children).entries()) {
      const bounds = photo.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - center);
      if (distance < closestDistance) {
        closest = index;
        closestDistance = distance;
      }
    }
    setCurrent(closest);
  }

  return (
    <section className="organizer-photos" aria-label="Life on the Hacktech team">
      <div
        className="photo-collage"
        id="photo-collage"
        ref={strip}
        tabIndex={mobile ? 0 : -1}
        aria-label="Hacktech team photos; swipe or use arrow keys on mobile"
        onScroll={updateCurrentPhoto}
        onKeyDown={(event) => {
          if (!mobile || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
          event.preventDefault();
          scrollToPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
        }}
      >
        {organizerPhotos.map(({ file, alt, height, feature }) => (
          <figure className={feature ? 'polaroid polaroid-dinner' : 'polaroid'} key={file}>
            <img
              src={`/images/organizers/${file}`}
              alt={alt}
              width="1100"
              height={height}
              decoding="async"
            />
          </figure>
        ))}
      </div>
      <div className="photo-controls" hidden={!mobile}>
        <button
          type="button"
          className="photo-prev"
          aria-label="Previous team photo"
          aria-controls="photo-collage"
          disabled={current === 0}
          onClick={() => scrollToPhoto(current - 1)}
        >
          ←
        </button>
        <span className="photo-count" aria-live="polite" aria-atomic="true">
          {current + 1} / {organizerPhotos.length}
        </span>
        <button
          type="button"
          className="photo-next"
          aria-label="Next team photo"
          aria-controls="photo-collage"
          disabled={current === organizerPhotos.length - 1}
          onClick={() => scrollToPhoto(current + 1)}
        >
          →
        </button>
      </div>
    </section>
  );
}
