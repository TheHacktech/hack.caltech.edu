import { Gallery } from './Gallery';
import { stats } from './content';

export function About() {
  return (
    <section className="section about" id="about">
      <h2 className="h2 section-title">
        <span className="span">Hacktech</span> 2025 RECAP
      </h2>
      <p className="section-subtitle" id="stats-label">
        2025 Stats:
      </p>
      <dl className="hero-stats-overlay" aria-labelledby="stats-label">
        {stats.map(({ count, suffix, label }) => (
          <div className="stat" key={label}>
            <dt className="stat-text">{label}</dt>
            <dd className="stat-number">
              {count}
              {suffix}
            </dd>
          </div>
        ))}
      </dl>
      <div className="container about-container about-lead">
        <div className="about-text">
          <p className="section-text-about">
            Hacktech is Caltech's annual intercollegiate hackathon. During the 36‑hour event,
            participants will collaborate in teams of 1 to 4 members to develop projects that align with
            our themes. Whether you're a seasoned coder or a beginner, Hacktech invites you to join a
            vibrant community of problem solvers, dreamers, and builders on Caltech's campus. Check out
            our{' '}
            <a href="https://hacktech2025.devpost.com/" target="_blank" rel="noopener">
              2025 Devpost ↗
            </a>{' '}
            to see the amazing projects our hackers built during our 2025 event!
          </p>
        </div>
      </div>
      <Gallery />
      <div className="container about-container about-tracks">
        <div className="about-text">
          <p className="section-text-about">
            <strong>
              For 2026, our tracks have not yet been finalized, but for reference, here were our 2025
              tracks: Healthcare, Finance/Data Analytics, and Sustainability.
            </strong>
          </p>
          <p className="section-text-about">
            <strong>What's New for 2026?</strong> This year we are excited to implement much of your
            feedback from last year's event, and plan to continue hosting a fully in-person event with
            the same general venue setup as last year. Check back here later to see updates on our tracks
            and other event details!
          </p>
        </div>
        <div className="about-image">
          <img src="/images/hacker.webp" width="300" loading="lazy" alt="Hacker illustration" />
        </div>
      </div>
    </section>
  );
}
