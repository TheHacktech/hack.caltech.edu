import { AnimatedCount } from './AnimatedCount';
import { Gallery } from './Gallery';
import { Tracks } from './Tracks';
import { stats } from './content';

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-column">
          <h2 className="h2 section-title" id="about-title">
            About <span className="span">Hacktech</span>
          </h2>
          <h3 className="about-subtitle" id="stats-label">2025 Stats Recap</h3>
          <dl className="hero-stats-overlay" aria-labelledby="stats-label">
            {stats.map(({ count, suffix, label }) => (
              <div className="stat" key={label}>
                <dt className="stat-text">{label}</dt>
                <AnimatedCount count={count} suffix={suffix} />
              </div>
            ))}
          </dl>
          <div className="about-story">
            <p>
              Hacktech is Caltech’s annual intercollegiate hackathon. Students come to our campus
              in Pasadena for 36 hours to build a project, either on their own or in teams of up to four.
              In 2025, more than 400 hackers joined us from over 60 universities.
            </p>
            <p>
              You can come with an idea you’ve wanted to try or find one when you get here.
              If it’s your first hackathon, start with a problem you know well and see how much of
              a working prototype you can put together over a weekend. For a look at what past
              teams built, browse the projects on{' '}
              <a href="https://hacktech2025.devpost.com/" target="_blank" rel="noopener">our 2025 Devpost ↗</a>.
            </p>
          </div>
          <Gallery />
          <Tracks />
        </div>
      </div>
    </section>
  );
}
