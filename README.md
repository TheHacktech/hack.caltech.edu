# Hacktech website v2

The Hacktech homepage, live event guide, and organizer interest page, built with React, TypeScript, and Vite. Each route has its own HTML entry point, so the venue map code only loads on the live site.

## Local development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite. The routes are `/`, `/live`, and `/organizer-interest`.

To check TypeScript and build the static production files:

```sh
npm run build
npm run preview
```

## Changing the content

- `src/home/content.ts` holds the date, sponsors, stats, and FAQ copy.
- `src/organizer/content.ts` holds the organizer timeline, photos, company logos, and roles. Keep the Google Forms choice values in sync with the published organizer form.
- `src/live/content.ts` is the archived 2026 event schedule and venue list.
- `src/components/googleForms.ts` contains the shared submission code. Google Forms accepts the browser requests but does not provide a readable confirmation to the site.
- `src/styles/` holds the original visual system and route-specific styles. `public/` contains the images, PDFs, manifest, and Apache rewrite rules.

The local preview uses the existing Google Forms endpoints. Leave actual submissions for the appropriate live workflow.

## Hosting

The output in `dist/` contains the entire site. On Caltech it can be served from the web root with the included `.htaccess`, which maps `/live` and `/organizer-interest` to their HTML entry points. GitHub Actions checks the build on pull requests and pushes to `main`. To use the existing cron-based production setup, publish the built files to a deployment branch and switch the Portal checkout and cron entry together.
