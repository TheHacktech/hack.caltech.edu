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

Sponsor sizes are grouped into separate rows (`largeplus`, `large`, `medium`, `small`). Mobile layouts wrap within each tier. Entries marked `example: true` are layout samples; confirm the sponsor roster before launch. The MLH badge is the original 2026 asset, pending an approved 2027 badge.

The local preview uses the existing Google Forms endpoints. Leave actual submissions for the appropriate live workflow.

## Hosting

Open pull requests against `master`. GitHub Actions installs the locked dependencies, checks TypeScript, and builds all three pages. Every successful push to `master`, including a merged pull request, updates `compiled-prod` with the contents of `dist/`. The compiled branch has its own fast-forward history. It includes the site at its root, so a web server can pull it without installing Node.

The same files work at a domain root or under a GitHub Pages project path. Both `/live/` and `/organizer-interest/` have directory indexes, and the original `.html` addresses still work. The Caltech deployment uses its existing repository until its checkout and cron are switched separately.

GitHub Pages serves the root of `compiled-prod`. The publish job explicitly requests a Pages build after updating that branch.
