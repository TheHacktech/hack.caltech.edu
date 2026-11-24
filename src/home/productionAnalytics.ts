interface SiteWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

function loadScript(src: string) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.append(script);
}

// Count visits only on the public Caltech site.
export function enableProductionAnalytics() {
  if (!['hack.caltech.edu', 'www.hack.caltech.edu'].includes(location.hostname)) return;
  const site = window as SiteWindow;
  site.dataLayer ??= [];
  site.gtag = function () {
    site.dataLayer?.push(arguments);
  };
  site.gtag('js', new Date());
  site.gtag('config', 'G-72Z617HLV6');
  loadScript('https://www.googletagmanager.com/gtag/js?id=G-72Z617HLV6');
}
