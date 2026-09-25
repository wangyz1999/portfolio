# Contribution calendar

The portfolio renders its own contribution calendar from a saved snapshot of the public GitHub calendar. No third-party chart service, browser API request, token, or client-side GitHub dependency is required.

- `npm run build` refreshes `src/data/github-contributions.json` from GitHub's public contribution HTML before building. `npm run sync:github` refreshes it independently.
- The static site changes only when rebuilt and deployed. The compact chart shows month labels, a color legend, and interactive daily details.
- If GitHub is unavailable or changes its HTML, the refresh retains the last successful snapshot and prints a warning. No counts are inferred or fabricated. A first build without any usable snapshot fails rather than displaying invented activity.
- Commit the snapshot with the site so offline builds have a fallback. A daily refresh workflow is configured in `.github/workflows/github-activity.yml`.
- Theme colors are `--heat-0` through `--heat-4` in `src/styles/global.css`; layout and interaction live in `ContributionCalendar.astro`.
- The parser validates daily counts, intensity, date continuity, and calendar length. Run `npm run test:github` for parser and calendar alignment checks.
- Contributions are GitHub's profile counts, not a commits-only metric. Only information already visible on the public calendar is downloaded.

## Automatic refresh

- The GitHub Actions workflow runs daily at 10:23 UTC (03:23 Pacific daylight time / 02:23 Pacific standard time). It can also be run manually from the Actions tab.
- It uses Node's built-in features, runs the parser checks, then refreshes the public contribution snapshot. No package install, personal token, or build-hook secret is needed.
- Only `src/data/github-contributions.json` is committed by the bot. Its push is intended to trigger the site's existing Netlify Git-connected deployment, whose configured build command refreshes the data again before rendering the site.
- Activation requires pushing the workflow and the calendar implementation to the repository's default branch, with GitHub Actions enabled and Netlify continuous deployment active for that branch. The refresh job requests repository contents write permission; branch rules must allow the bot's snapshot commit. No repository settings are changed by adding this file.
- The workflow has been added locally; a live scheduled run and Netlify deployment must be verified after publishing. If GitHub is unavailable, the last successful snapshot remains in place and no refresh commit is made.
- GitHub schedules can be delayed, and schedules in public repositories can be disabled after 60 days without repository activity. Workflow failures appear in GitHub Actions.
