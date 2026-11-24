import { siteUrl } from '../components/siteUrl';
import { createElement, useEffect, useState } from 'react';
import { sponsorPacket } from './content';
import { goToSection } from './sectionNavigation';

const socialLinks = [
  { name: 'Facebook', icon: 'logo-facebook', href: 'https://www.facebook.com/thehacktech/' },
  { name: 'X', icon: 'logo-twitter', href: 'https://x.com/thehacktech?lang=en' },
  { name: 'Instagram', icon: 'logo-instagram', href: 'https://www.instagram.com/hacktechbycaltech/' },
  { name: 'Twitch', icon: 'logo-twitch', href: 'https://m.twitch.tv/teamhacktech/home' },
  { name: 'GitHub', icon: 'logo-github', href: 'https://github.com/TheHacktech/hack.caltech.edu' },
];

export function VenueMap() {
  return (
    <div className="container home-venue-map">
      <div className="venue-map-frame beveled-frame">
        <iframe
          title="Caltech event venue map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1620.9574245094923!2d-118.12406515684576!3d34.140600657516416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c3578e9cecc3%3A0x43f1b95ee71bc1a9!2sAvery%20House!5e1!3m2!1sen!2sus!4v1724978307008!5m2!1sen!2sus"
          width="100%"
          height="300"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export function Footer({ openInterest }: { openInterest: () => void }) {
  return (
    <footer className="footer" id="footer">
      <div className="section footer-top">
        <div className="container">
          <div className="footer-brand">
            <button type="button" className="logo-footer" onClick={() => goToSection('home')}>
              <img src={siteUrl('images/logo.svg')} width="75" loading="lazy" alt="Hacktech home" />
            </button>
            <ul className="social-list">
              {socialLinks.map(({ name, href, icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    aria-label={`Hacktech on ${name}`}
                    className="social-link"
                    target="_blank"
                    rel="noopener"
                  >
                    {createElement('ion-icon', { name: icon, 'aria-hidden': true })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-list">
            <p className="title footer-list-title has-after">Useful Links</p>
            <ul>
              <li>
                <a href="https://hackp.ac/coc" className="footer-link">
                  MLH Code of Conduct
                </a>
              </li>
              <li>
                <a href={sponsorPacket} className="footer-link" target="_blank" rel="noopener">
                  2027 Sponsor Packet
                </a>
              </li>
              <li>
                <a href="https://github.com/teamhacktech/teamhacktech.github.io" className="footer-link">
                  Old Website
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  aria-haspopup="dialog"
                  onClick={openInterest}
                >
                  Register Hacker Interest
                </button>
              </li>
              <li>
                <a href={siteUrl('organizer-interest')} className="footer-link">
                  Organizer Interest Form
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-list">
            <p className="title footer-list-title has-after">Contact Us</p>
            <div className="contact-item">
              <span className="span">Location:</span>
              <address className="contact-link">1200 E California Blvd, Pasadena, CA 91125</address>
            </div>
            <div className="contact-item">
              <span className="span">Questions:</span>
              <a href="mailto:hacktech@caltech.edu" className="contact-link">
                hacktech@caltech.edu
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            Made with 🤍 by{' '}
            <a href="https://jeffreyszhou.com/" className="name-link" target="_blank" rel="noopener">
              Jeffrey Zhou
            </a>
            . © 2026 Hacktech.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageUtilities() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const update = () => setShowBackTop(window.scrollY > 100);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => goToSection('home')}
        className={showBackTop ? 'back-top-btn active' : 'back-top-btn'}
        aria-label="Back to top"
        tabIndex={showBackTop ? 0 : -1}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20V4m-7 7 7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
