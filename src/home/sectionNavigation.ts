export function goToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;

  // Move the keyboard starting point along with the viewport.
  section.tabIndex = -1;
  section.focus({ preventScroll: true });
  section.scrollIntoView({ block: 'start' });
}

export function openLegacySection() {
  const id = window.location.hash.slice(1);
  if (!['home', 'about', 'sponsor', 'faq', 'top', 'main-content', 'tracks', 'awards'].includes(id)) return;

  const url = new URL(window.location.href);
  url.hash = '';
  window.history.replaceState(window.history.state, '', url);
  goToSection(id === 'top' ? 'home' : id);
}
