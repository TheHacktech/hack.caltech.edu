import { siteUrl } from '../components/siteUrl';
import { useEffect, useState } from 'react';
import { Dialog } from '../components/Dialog';
import { mount } from '../components/mount';
import { reducedMotionQuery, useMediaQuery } from '../components/useMediaQuery';
import { Countdown } from './Countdown';
import { liveConfig } from './content';
import { isAppleTouchDevice } from './directions';
import { Schedule } from './Schedule';
import { VenueMap } from './VenueMap';
import '../styles/live.css';
import '../styles/live-react.css';

type View = 'home' | 'faq';

function InstallPrompt() {
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
    const standalone =
      navigatorWithStandalone.standalone || matchMedia('(display-mode: standalone)').matches;
    if (!isAppleTouchDevice() || standalone) return;
    try {
      if (sessionStorage.getItem('hacktechLiveInstallDismissed') === 'true') return;
    } catch {
      /* The prompt can still be dismissed if storage is unavailable. */
    }
    const timer = window.setTimeout(() => setOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem('hacktechLiveInstallDismissed', 'true');
    } catch {
      /* Storage is optional. */
    }
  }

  return (
    <Dialog
      className="live-dialog construction-modal-card"
      open={open}
      onClose={close}
      labelledBy="construction-title"
    >
      <div className="live-dialog-content">
        <button
          className="construction-modal-close"
          type="button"
          aria-label="Close notice"
          onClick={close}
        >
          ×
        </button>
        <p className="construction-modal-kicker">Quick setup</p>
        <h2 id="construction-title">Add Hacktech 2026 to your home screen</h2>
        <p>For the best live-site experience on iPhone, save this page as a home screen app!</p>
        <ol className="install-steps">
          <li>Open this page in Safari (you already did this)</li>
          <li>Tap the Share button</li>
          <li>Scroll down and tap "Add to Home Screen"</li>
          <li>Tap "Add"</li>
        </ol>
        <button
          className="construction-modal-ack"
          type="button"
          onClick={() => (acknowledged ? close() : setAcknowledged(true))}
        >
          {acknowledged ? 'Did you really get it?' : 'Got it'}
        </button>
      </div>
    </Dialog>
  );
}

function HackerPacket() {
  return (
    <section className="live-section live-container faq-view" aria-labelledby="faq-title">
      <div className="section-heading">
        <p className="eyebrow">Live FAQ</p>
        <h1 id="faq-title">Hacker packet</h1>
        <p className="faq-note">
          For best viewing experience, open this page on desktop. Updated every 5 mins.
        </p>
        <p className="faq-backup-link">
          Embed not loading?{' '}
          <a
            href="https://docs.google.com/document/d/1QIsTbvfO1CX6b4vCWRIvjMBgcjE_j1ucV3F4hlP13t0/edit?tab=t.0"
            target="_blank"
            rel="noopener"
          >
            Open the Google Doc
          </a>
        </p>
      </div>
      <iframe
        className="faq-frame"
        src={`${liveConfig.googleDocUrl}?embedded=true`}
        title="Hacktech 2026 FAQ Google Doc"
      />
    </section>
  );
}

function LivePage() {
  const [view, setView] = useState<View>('home');
  const reducedMotion = useMediaQuery(reducedMotionQuery);

  function showView(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  return (
    <>
      <header className="live-header">
        <div className="brand-lockup">
          <a
            className="live-brand"
            href="#home"
            aria-label="Hacktech live home"
            onClick={(event) => {
              event.preventDefault();
              showView('home');
            }}
          >
            <img src={siteUrl('images/logo-text.svg')} alt="Hacktech" />
          </a>
          <div className="live-indicator" aria-label="Live site status">
            <span className="live-dot" aria-hidden="true" />
            <span>Live</span>
          </div>
        </div>
        <nav className="live-tabs" aria-label="Live site navigation">
          <a
            className="live-nav-action live-nav-action-devpost live-tab-link"
            href={liveConfig.devpostUrl}
            target="_blank"
            rel="noopener"
          >
            Devpost
          </a>
          <a
            className="live-nav-action live-nav-action-discord"
            href="https://discord.gg/9ykYzMSxyU"
            target="_blank"
            rel="noopener"
          >
            Discord
          </a>
          <div className="live-tab-group">
            <button
              className={`live-tab${view === 'home' ? ' is-active' : ''}`}
              type="button"
              aria-pressed={view === 'home'}
              aria-controls="home"
              onClick={() => showView('home')}
            >
              Home
            </button>
            <button
              className={`live-tab${view === 'faq' ? ' is-active' : ''}`}
              type="button"
              aria-pressed={view === 'faq'}
              aria-controls="faq"
              onClick={() => showView('faq')}
            >
              FAQ
            </button>
          </div>
        </nav>
      </header>
      <main>
        <section
          className={`tab-panel${view === 'home' ? ' is-active' : ''}`}
          id="home"
          aria-label="Live event information"
        >
          <Countdown />
          <VenueMap visible={view === 'home'} />
          <Schedule />
        </section>
        <section
          className={`tab-panel${view === 'faq' ? ' is-active' : ''}`}
          id="faq"
          aria-label="Live FAQ"
        >
          {view === 'faq' && <HackerPacket />}
        </section>
      </main>
      <InstallPrompt />
      <footer className="live-footer">
        <div className="live-container live-footer-inner">
          <a className="footer-home-link" href={siteUrl()}>
            Back to hack.caltech.edu
          </a>
          <p>
            Made with 🤍 by{' '}
            <a href="https://jeffreyszhou.com/" target="_blank" rel="noopener">
              Jeffrey Zhou
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

mount(<LivePage />);
