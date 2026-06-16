# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Yunzhe Wang's personal academic portfolio site (https://yunzhe.wang), built on Astro
(forked from the `astro-cactus` theme). Deployed on Netlify. Static output (`dist/`).

## Commands

```bash
pnpm dev        # local dev server (astro dev) — the project uses pnpm (pnpm-lock.yaml)
pnpm build      # production build to dist/  (runs `astro build`)
pnpm preview    # serve the built dist/ locally
pnpm check      # astro check — type-checks .astro files and content collections
pnpm sync       # regenerate astro:content types after editing content.config.ts
pnpm format     # prettier -w across the repo
```

Lint: `npx eslint .` (flat config in `.eslintrc.js`; astro + ts + jsx-a11y + import).
There is no test suite. Validate changes with `pnpm check` and `pnpm build`.

Netlify build (see `netlify.toml`) reinstalls `sharp` for linux/x64 before `pnpm build`;
locally you don't need that step.

## Architecture

Astro content-collection site. The three content types live in `src/content/{research,project,post}/`
as Markdown, with frontmatter schemas defined and validated in `src/content.config.ts`
(zod). After changing a schema, run `pnpm sync` so `astro:content` types update.

Data flow for a typical page: `getCollection("research")` → a util in `src/utils/`
filters/sorts → a `*Preview.astro` component renders each entry → wrapped in a layout.

- **`src/utils/`** — collection query helpers, re-exported from `src/utils/index.ts`.
  Key behaviors: `sortResearchByDate` drops entries with `hidden: true`; `selectedResearch`
  keeps only `selected: true` (these appear on the Home page "Selected Work" list);
  `selectBySlug` filters projects by an explicit slug list.
- **`src/layouts/`** — `Base.astro` is the shell (head, header, footer, theme). `Research.astro`,
  `Project.astro`, `BlogPost.astro` wrap content-detail pages.
- **`src/pages/`** — routes. `research.astro`/`project.astro` are list pages;
  `research/[slug].astro` etc. are dynamic detail pages. `og-image/[slug].png.ts` generates
  OpenGraph PNGs at build time via satori + resvg.
- **Path aliases** (`tsconfig.json`): `@/components/*`, `@/layouts/*`, `@/utils`,
  `@/data/*`, `@/site-config`. Note `@/components/*` and `@/layouts/*` resolve to `.astro`
  files (extension is implied — import `@/components/SocialList`, not `...SocialList.astro`).

### Hidden pages — important

This is a deliberate design choice (per the site owner): the visible nav is only
**Home / Research / Project** (plus external GitHub & Scholar links). Pages like
`/posts`, `/tags`, `/hobbies`, `/snowball` remain **deployed but hidden** — reachable by
direct URL, excluded from the sitemap, and disallowed for crawlers. This is enforced in
**three places that must stay in sync**:

1. `astro.config.ts` — `HIDDEN_PATHS` array (sitemap `filter`)
2. `public/robots.txt` — `Disallow:` lines
3. `src/data/constants.ts` — `MENU_LINKS` (the nav itself)

When hiding/unhiding a page, update all three. Don't add a page to `MENU_LINKS` expecting
it to be the only change.

### Content & config touchpoints

- `src/site.config.ts` — global meta (author, title, description, theme colors, date format).
  Comments in the file point to exactly where each field is consumed.
- `src/data/constants.ts` — `MENU_LINKS` (nav) and `SOCIAL_LINKS`.
- Research frontmatter supports `selected`, `hidden`, `category`, `venue`, `authors`,
  `author_idx`, `tags`, `links` (a string→string map rendered as labeled links).
- Project list on `project.astro` is a hardcoded ordered `projectList` of slugs — a project
  `.md` only shows up if its slug is in that array.
- Theme: Tailwind colors map to CSS vars (`--theme-bg`, `--theme-accent`, etc.) defined in
  `src/styles/global.css`; light/dark toggled by `ThemeToggle.astro`.

## Working agreement

Working and committing directly on the `main` branch is fine for this repo.

### Commit rule

Commit as you go, in **meaningful, self-contained units** — one logical change per commit
(code + its `doc/` update together), not one giant catch-all. Stage deliberately with
explicit `git add <paths>` (avoid blanket `git add -A`/`git add .`); never stage build
artifacts, `output/`, or `.venv/`. Only commit when the slice builds/runs.

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):
`<type>[optional scope]: <description>`, where type is `feat`, `fix`, `docs`, `chore`,
`refactor`, `test`, `build`, etc. Use a body to explain the *why*; mark breaking changes
with `!` after the type/scope or a `BREAKING CHANGE:` footer.
