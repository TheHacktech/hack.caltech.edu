# Hacktech website

The Hacktech homepage, live event guide, and organizer interest page, built with React, TypeScript, and Vite. Each route has its own HTML entry point, so the venue map code only loads on the live site.

**GitHub Pages serves staging, and Caltech serves production.** Merging into `master` updates the team preview. Production checks for a new release daily at 8:17 a.m. Pacific. A maintainer can also release manually at any time. [Staging preview](https://thehacktech.github.io/hack.caltech.edu/) · [Live Caltech site](https://hack.caltech.edu/)

If you have an older clone of the HTML site, point its remote to the [HTML archive](https://github.com/TheHacktech/hack.caltech.edu-old) before fetching or pushing. The original repo name now belongs to this React site.

## Make your first change

1. Install Node.js 24, which includes npm. Clone this repo and create a branch from `master`. Here’s an example for a change to the FAQ.

   ```sh
   git clone https://github.com/TheHacktech/hack.caltech.edu.git
   cd hack.caltech.edu
   git switch -c update-faq origin/master
   npm ci
   npm run dev
   ```

2. Open the local address Vite prints. Edits appear as you save. The three pages are the homepage at `/`, the live event guide at `/live`, and the organizer form at `/organizer-interest`. Both local previews and staging use the live Google Forms endpoints, so stop before submitting when testing the forms.

3. Run `npm run build` to check TypeScript and compile the site into `dist/`. To inspect that exact build locally, run `npm run preview`. Commit your source edits and push your branch. For the FAQ example, run the following commands.

   ```sh
   git add src/home/content.ts
   git commit -m "Update FAQ copy"
   git push -u origin update-faq
   ```

4. Open a pull request on GitHub with `master` as the base branch. GitHub Actions runs the build on the PR. Once the PR is reviewed and merged, Actions publishes a fresh build to staging. Open the staging link above and check your change on desktop and mobile.

## Changing the content

- `src/home/content.ts` holds the date, sponsors, stats, and FAQ copy.
- `src/organizer/content.ts` holds the organizer timeline, photos, company logos, and roles. Keep the Google Forms choice values in sync with the published organizer form.
- `src/live/content.ts` is the archived 2026 event schedule and venue list.
- `src/components/googleForms.ts` contains the shared submission code. Google Forms accepts the browser requests but does not provide a readable confirmation to the site.
- `src/styles/` holds the original visual system and route-specific styles. `public/` contains the images, PDFs, manifest, and Apache rewrite rules.

Sponsor sizes are grouped into separate rows (`largeplus`, `large`, `medium`, `small`). Mobile layouts wrap within each tier. The logos represent past partners. Update the note and roster together when announcing the 2027 sponsors. The MLH badge is the original 2026 asset, pending an approved 2027 badge.

## Branches and releases

| Branch | What belongs here | How it updates |
| --- | --- | --- |
| `master` | React and TypeScript source, images, and project configuration | Contributors merge their work here through pull requests. |
| `staging` | Compiled files served by GitHub Pages | Every push to `master`, including a merged PR, triggers a build and publishes it here when it passes. |
| `prod` | Compiled files served by the Caltech server | The daily release or a manual **Deploy production** run publishes here. |

Make site edits on a branch based on `master`. Actions manages the files on `staging` and `prod`. If your merged edit is missing from staging, check the run for your commit under [Build and deploy staging](https://github.com/TheHacktech/hack.caltech.edu/actions/workflows/build.yml), then check the [Pages deployment](https://github.com/TheHacktech/hack.caltech.edu/actions?query=branch%3Astaging).

### When changes go live

At **8:17 a.m. Pacific** each day, Actions compares the source commit on `master` with the one recorded on `prod`. If they match, it skips the build and publish steps. If they differ, the automatic release proceeds only when `staging` has a successful build of that same commit. A change still building on staging waits for the next daily check or a manual release. GitHub may start scheduled runs a little late.

### Release manually

1. Review the latest changes on staging. The release workflow builds the latest `master`, so check whether anything else has merged since you tested.
2. Open [Deploy production](https://github.com/TheHacktech/hack.caltech.edu/actions/workflows/production.yml), choose **Run workflow**, select `master`, and run it.
3. Wait for the production job to finish. The newest deployment commit on `prod` records the source revision it built. If `master` advances during the build, the job stops. Review the newer staging version before running it again.
4. Open the [live Caltech site](https://hack.caltech.edu/) after the next scheduled check. Every 30 seconds Portal compares the GitHub `prod` commit with the revision it serves. When they differ, it fetches and fast-forwards the checkout. Matching revisions require only a remote ref lookup. GitHub Actions performs the build.

Both compiled branches contain the complete static site at their root, including directory indexes for the clean URLs and the original `.html` entry points.
