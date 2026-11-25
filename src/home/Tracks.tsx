import { Gallery } from './Gallery';
import { winnerPhotos } from './galleryPhotos';
import { useId, useState, type ReactNode } from 'react';
import '../styles/tracks.css';

interface Category {
  name: string;
  description: string;
  icon: ReactNode;
}

const tracks: Category[] = [
  {
    name: 'Healthcare',
    description: 'Help patients and caregivers coordinate care, from arranging rides to appointments to keeping track of questions for the next visit.',
    icon: <>
      <path d="M5 17C0 5 14 1 20 10c7-10 21-4 15 8-2 4-8 10-15 15l-7-6" />
      <path className="track-pulse" pathLength="1" d="M2 21h9l4-8 5 14 4-9 3 3h10" />
    </>,
  },
  {
    name: 'Education',
    description: 'Give students a way to learn by experimenting, like a circuit simulator that lets them swap parts and see why a bulb goes dark.',
    icon: <>
      <path d="M20 12c-4-4-10-5-16-5v23c6 0 12 1 16 5 4-4 10-5 16-5V7c-6 0-12 1-16 5Zm0 0v23" />
      <g className="track-pages"><path d="m9 14 6 2m-6 5 6 2m10-7 6-2m-6 9 6-2" /></g>
    </>,
  },
  {
    name: 'AI Agents',
    description: 'Build an agent that handles a task across several steps, like comparing calendars and asking before it sends a meeting invite.',
    icon: <>
      <path d="M20 5v5m-6 0h12a7 7 0 0 1 7 7v8a7 7 0 0 1-7 7H14a7 7 0 0 1-7-7v-8a7 7 0 0 1 7-7Z" />
      <circle cx="20" cy="4" r="2" />
      <g className="agent-eyes" fill="currentColor" stroke="none">
        <circle cx="15" cy="19" r="2" /><circle cx="25" cy="19" r="2" />
      </g>
      <path d="M17 26h6" />
    </>,
  },
];

const awards: Category[] = [
  {
    name: 'AI',
    description: 'Use AI to make an everyday task easier, like finding a handwritten family recipe by searching for an ingredient.',
    icon: <>
      <rect x="9" y="9" width="22" height="22" rx="4" />
      <path d="M15 4v5m10-5v5M15 31v5m10-5v5M4 15h5m-5 10h5m22-10h5m-5 10h5" />
      <path className="track-pulse" pathLength="1" d="m20 13 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
    </>,
  },
  {
    name: 'UI/UX',
    description: 'Design an interface that helps someone do one thing especially well, like finding a step-free entrance on a campus map.',
    icon: <>
      <rect x="3" y="6" width="33" height="25" rx="3" />
      <path d="M3 13h33m-28-3h1m3 0h1" />
      <path className="track-pages" d="m19 18 13 7-6 1 3 6-3 2-3-6-4 4Z" />
    </>,
  },
  {
    name: 'Tech Stack',
    description: 'Combine tools in an unexpected way, like pairing a receipt printer with live bus data to print a pocket timetable.',
    icon: <>
      <path className="track-pages" d="m20 4 16 8-16 8-16-8Z" />
      <path d="m4 20 16 8 16-8M4 28l16 8 16-8" />
    </>,
  },
];

function CategorySelector({ options, headingId }: { options: Category[]; headingId: string }) {
  const [selected, setSelected] = useState(0);
  const descriptionId = useId();
  return (
    <>
      <div className="track-options" role="group" aria-labelledby={headingId}>
        <span
          className="track-highlight"
          aria-hidden="true"
          style={{ transform: `translateX(${selected * 100}%)` }}
        />
        {options.map(({ name, icon }, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={selected === index}
            aria-controls={descriptionId}
            onClick={() => setSelected(index)}
          >
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
            {name}
          </button>
        ))}
      </div>
      <div className="track-description" id={descriptionId} aria-live="polite" aria-atomic="true">
        {options.map(({ name, description }, index) => (
          <p key={name} aria-hidden={selected !== index}>{description}</p>
        ))}
      </div>
    </>
  );
}

export function Tracks() {
  return (
    <>
      <section className="tracks" id="tracks" aria-labelledby="tracks-title">
        <h3 className="about-subtitle" id="tracks-title">What are the <em>Tracks</em> for 2027?</h3>
        <CategorySelector options={tracks} headingId="tracks-title" />
      </section>
      <section className="tracks" id="awards" aria-labelledby="awards-title">
        <h3 className="about-subtitle" id="awards-title">Hacktech <em>“Best Use Of”</em> Awards</h3>
        <CategorySelector options={awards} headingId="awards-title" />
        <div className="award-entry">
          <p>
            Submit your project to whichever of the three tracks above fits it best. Our judges will
            select a winner for Best Healthcare Project, Best Education Project, and Best AI Agents
            Project. Whichever track you enter, you can also opt into one additional Hacktech award
            by choosing Best Use of AI, Best UI/UX, or Most Creative Tech Stack.
          </p>
          <Gallery label="Hacktech 2026 award winners" photos={winnerPhotos} width={1440} height={810} />
          <p>
            Sponsors often offer separate tracks and awards you can compete in. We’ll announce any
            confirmed for 2027 soon, and each sponsor will manage and judge its own category.
          </p>
        </div>
      </section>
    </>
  );
}
