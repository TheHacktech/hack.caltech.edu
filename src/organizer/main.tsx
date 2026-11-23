import { siteUrl } from '../components/siteUrl';
import { mount } from '../components/mount';
import { Particles } from '../components/Particles';
import { companyLogos, timeline } from './content';
import { OrganizerForm } from './OrganizerForm';
import { PhotoCollage } from './PhotoCollage';
import '../styles/style.css';
import '../styles/organizer.css';

function OrganizerPage() {
  return (
    <>
      <Particles />
      <aside className="kickoff-banner" aria-label="Kickoff meeting update">
        <p>
          <strong>Kickoff moved to Tuesday, October 20 · 8:30–10 PM PST.</strong> We’ve moved from Monday
          due to a Fleming event that night.
        </p>
      </aside>
      <header className="organizer-header">
        <a href={siteUrl()} aria-label="Hacktech home">
          <img src={siteUrl('images/logo-text.svg')} alt="Hacktech" width="180" />
        </a>
        <a className="home-link" href={siteUrl()}>
          Back to home
        </a>
      </header>
      <main className="organizer-main">
        <section className="organizer-intro" aria-labelledby="organizer-title">
          <h1 id="organizer-title">
            Become an <span>organizer</span>
          </h1>
          <h2>Who we are</h2>
          <p className="intro">
            We organize Hacktech, Caltech’s nonprofit, 36-hour hackathon. Our goal is to bring 500+
            hackers to campus each year and give them a weekend to build something they’re excited about.
          </p>
          <p className="intro">
            Help find <strong>sponsors</strong>, build our <strong>website and tools</strong>, create{' '}
            <strong>designs and social content</strong>, or plan{' '}
            <strong>workshops and event operations</strong> as part of the organizing team.
          </p>
        </section>
        <PhotoCollage />
        <section className="organizer-timeline" aria-labelledby="timeline-title">
          <h2 id="timeline-title">Timeline</h2>
          <ol className="team-timeline">
            {timeline.map(({ date, label, summary }) => (
              <li key={date}>
                <time dateTime={date}>{label}</time>
                <strong>{summary}</strong>
              </li>
            ))}
          </ol>
        </section>
        <section className="organizer-sponsors" aria-labelledby="past-sponsors-title">
          <h2 id="past-sponsors-title">Companies We’ve Worked With</h2>
          <ul className="company-logos">
            {companyLogos.map(({ file, name, width, height }) => (
              <li key={file}>
                <img
                  src={siteUrl(`images/organizers/companies/${file}`)}
                  alt={name}
                  width={width}
                  height={height}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </section>
        <OrganizerForm />
        <p className="hacker-note">
          <strong>Here to hack, too?</strong> You can help organize or volunteer and still participate as
          a hacker. This form is just for interest in the organizing team.
        </p>
      </main>
    </>
  );
}

mount(<OrganizerPage />);
