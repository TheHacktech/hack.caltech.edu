import { siteUrl } from '../components/siteUrl';
import { useEffect, useRef, useState } from 'react';

const navigation = [
  ['#home', 'home'],
  ['#about', 'about'],
  ['#sponsor', 'sponsors'],
  ['#faq', 'faq'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    }
    const desktop = window.matchMedia('(min-width: 992px)');
    const closeMenu = () => setOpen(false);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeMenu);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeMenu);
    };
  }, [open]);

  return (
    <header ref={header} className="header">
      <div className="container">
        <div className="header-bar">
          <a
            id="mlh-trust-badge"
            href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
            target="_blank"
            rel="noopener"
            aria-label="Major League Hacking 2026 season"
          >
            <img
              src={siteUrl('images/mlh-trust-badge-2026-white.svg')}
              alt="Major League Hacking 2026 Hackathon Season"
            />
          </a>
          <a className="logo" href="#home" onClick={() => setOpen(false)}>
            <img src={siteUrl('images/logo.webp')} className="logo-img" alt="Hacktech home" />
          </a>
          <nav
            className={open ? 'navbar active' : 'navbar'}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            <ul className="navbar-list">
              {navigation.map(([href, label]) => (
                <li className="navbar-item" key={href}>
                  <a href={href} className="navbar-link" onClick={() => setOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={toggle}
            type="button"
            className={open ? 'nav-toggle-btn active' : 'nav-toggle-btn'}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen(!open)}
          >
            <span className="line line-1" />
            <span className="line line-2" />
            <span className="line line-3" />
          </button>
        </div>
      </div>
    </header>
  );
}
