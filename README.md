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

| Branch | What it contains | How it updates |
| --- | --- | --- |
| `master` | React and TypeScript source | Merge a pull request or push a change. Pull requests run the build. |
| `staging` | Compiled website for GitHub Pages | Every successful push to `master` publishes the build and refreshes the [staging preview](https://thehacktech.github.io/hack.caltech.edu-v2/). |
| `prod` | Compiled website for the Caltech cron to pull | In [Deploy production](https://github.com/TheHacktech/hack.caltech.edu-v2/actions/workflows/production.yml), select **Run workflow** on `master`. |

Review the staging preview before releasing. A manual production run builds the latest `master`. If another change lands during that build, the release stops so you can review the new revision and run it again. Each deployment commit records the source revision.

Both compiled branches serve the site from their root and support the clean page URLs and their original `.html` addresses. The Caltech production URL is [hack.caltech.edu](https://hack.caltech.edu/). Its existing cron deployment requires a separate cutover to start pulling `prod`.
