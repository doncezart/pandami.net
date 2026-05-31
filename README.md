# pandami.net

Marketing website for Pandami, a social media management agency. Built to be fast, accessible, and ready for production.

## What it does

- Landing page presenting Pandami's services and pricing
- Contact form with bot protection (Cloudflare Turnstile) that delivers inquiries to a Discord channel
- Privacy policy and terms of service pages
- Cookie consent banner
- Privacy-first analytics via Umami (no cookies, no personal data)

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit 2](https://kit.svelte.dev) with Svelte 5 (runes) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animations | [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| Icons | [Lucide Svelte](https://lucide.dev) |
| Analytics | [Umami](https://umami.is) (self-hosted, cookie-free) |
| Bot protection | [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile) |
| Contact delivery | Discord webhook |
| Runtime | Node.js 22 via `@sveltejs/adapter-node` |
| Testing | [Playwright](https://playwright.dev) (E2E) |

## Hosting

Hosted at [pandami.net](https://pandami.net) via Docker Compose on a self-hosted [Coolify](https://coolify.io) instance.

Coolify connects to the GitHub repository at `https://github.com/doncezart/pandami.net` and automatically rebuilds and redeploys the container on every push to `master`.

## Running locally

```bash
pnpm install
cp .env.example .env   # fill in real values
pnpm dev
```

Dev server runs at `http://localhost:5173`.

## Running with Docker

```bash
cp .env.example .env   # fill in real values
docker compose up --build
```

App runs at `http://localhost:3000`.

## Environment variables

See `.env.example` for all required variables:

| Variable | Description |
|---|---|
| `PUBLIC_UMAMI_URL` | URL of the Umami script (`/script.js` endpoint) |
| `PUBLIC_UMAMI_SITE_ID` | Umami website ID |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server-only) |
| `DISCORD_WEBHOOK_URL` | Discord webhook URL for contact form delivery (server-only) |

## Auto-deployment (Coolify)

On each `git push` to `master`, Coolify receives a GitHub webhook, rebuilds the Docker image from the `Dockerfile`, and restarts the container with zero downtime. No manual steps required.

## Scripts

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm preview      # preview production build
pnpm check        # svelte-check type checking
pnpm test         # run Playwright E2E tests
node scripts/gen-og.mjs  # regenerate static/og.png from static/og.svg
```
