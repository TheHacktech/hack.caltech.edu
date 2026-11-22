// Vite emits every production module one directory below the site root, in assets/.
// Resolving from the module keeps links portable on both Caltech and GitHub Pages.
const siteRoot = new URL(import.meta.env.DEV ? '/' : '../', import.meta.url);

export function siteUrl(path = '') {
  return new URL(path, siteRoot).href;
}
