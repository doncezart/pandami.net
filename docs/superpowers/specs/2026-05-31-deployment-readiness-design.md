# Pandami.net — Deployment Readiness Design
**Date:** 2026-05-31

## Scope

Pre-deployment hardening for pandami.net. Covers SEO meta, accessibility, analytics, cookie consent, legal pages, error handling, contact form replacement, favicon, OG image, sitemap, and mobile responsiveness.

---

## 1. HTML Foundation

**`app.html`**
- Add `lang="en"` to `<html>`
- Ensure `<meta name="viewport" content="width=device-width, initial-scale=1">` is present

**`+layout.svelte` global head** (tags that are identical across all pages — no per-page duplicates to avoid SvelteKit head merge conflicts)
- `og:site_name=Pandami`, `og:type=website`, `og:image` (absolute URL to `/og.png`)
- `twitter:card=summary_large_image`
- JSON-LD `ProfessionalService` schema: `{ name: 'Pandami', url: 'https://pandami.net', description: '...', email: 'contact@pandami.net' }`
- Umami analytics script (conditional on `PUBLIC_UMAMI_URL` and `PUBLIC_UMAMI_SITE_ID` being set)
- Favicon links, webmanifest link

**Per-page meta (all existing and new pages — never repeating layout-set properties)**
- `og:title`, `og:description`, `og:url` (absolute)
- `<link rel="canonical">` with absolute URL
- `twitter:title`, `twitter:description`

---

## 2. Favicon

- `/static/favicon.svg` — 32×32 SVG, white background, black "P" in bold Inter/system font, rounded square shape
- `/static/site.webmanifest` — `{ name: "Pandami", short_name: "Pandami", icons: [{src: "/favicon.svg", ...}], theme_color: "#0A0A0A", background_color: "#FFFFFF", display: "standalone" }`
- Layout head: `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` and `<link rel="manifest" href="/site.webmanifest">`

---

## 3. OG Image

- `/static/og.svg` — 1200×630 branded card: white background, "Pandami" wordmark top-left, tagline centred, red (`#DC2626`) accent bar at bottom
- `/scripts/gen-og.mjs` — plain ESM Node script using `sharp` that reads `og.svg` and writes `og.png` to `/static`
- `og:image` always points to `https://pandami.net/og.png` (absolute)
- Run once before deployment: `node scripts/gen-og.mjs`

---

## 4. Sitemap + robots.txt

**`/static/sitemap.xml`**

Lists the following with `changefreq=monthly` and today's `lastmod`:
- `https://pandami.net/`
- `https://pandami.net/services`
- `https://pandami.net/contact`
- `https://pandami.net/privacy`
- `https://pandami.net/terms`

**`/static/robots.txt`** — append `Sitemap: https://pandami.net/sitemap.xml`

---

## 5. Analytics (Umami)

**Env vars**
- `PUBLIC_UMAMI_URL` — default `https://analytics.ceza.ro/script.js`
- `PUBLIC_UMAMI_SITE_ID` — default `b6905fa8-3cf4-48d2-a4c2-6e13efe1b740`

**Layout** renders the script tag using env vars. Script only injected when both vars are set.

**Tracked events via `data-umami-event`**
| Element | Event name |
|---|---|
| Hero primary CTA | `hero-cta` |
| Pricing plan CTA (each plan) | `pricing-cta-{plan.id}` |
| Contact form submit button | `contact-submit` |
| Cookie banner acknowledge | `cookie-accept` |

**Tracked programmatically** (in form `enhance` callback)
- `contact-success` on form success
- `contact-error` on validation failure

---

## 6. Cookie Banner

**`src/lib/components/CookieBanner.svelte`**

- Mounts inside layout, `position: fixed; bottom: 0; left: 0; right: 0`
- Checks `localStorage.getItem('pandami-consent')` on mount; if set, renders nothing
- Copy: "This site uses cookies to understand how people use it. Browsing further means you're fine with that."
- One button: "Got it" — sets localStorage key and hides banner
- Style: `background: var(--color-text)`, white text, red "Got it" button (matching `PillButton` visually), `padding: 1rem 1.25rem`
- No SSR issues: check is inside `onMount`

---

## 7. Accessibility

**Skip link**
- First element in `+layout.svelte` body: visually hidden `<a href="#main-content">Skip to content</a>`
- Becomes visible on `:focus-visible`
- `<main>` gets `id="main-content"` on all pages

**ARIA**
- Navbar hamburger button: `aria-label="Open menu"`, `aria-expanded={menuOpen}`
- Mobile menu close button: `aria-label="Close menu"`
- Footer `<nav>` blocks: `aria-label="Pages"` and `aria-label="Tools"`
- Active nav links: `aria-current="page"` (using `$page.url.pathname`)

**Focus styles**
- `layout.css`: `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: 2px; }`

---

## 8. Legal Pages

### `/privacy`

Sections:
1. What we collect — contact form submissions (name, email, services, optional message); anonymous analytics via Umami (self-hosted, no personal data stored); bot protection via Cloudflare Turnstile (Cloudflare's privacy policy applies)
2. How it's used — responding to inquiries; understanding site usage
3. Retention — form submissions kept in Discord until manually deleted; analytics data stays on self-hosted Umami
4. Your rights — email contact@pandami.net to request data deletion
5. Changes — last updated date

Tone: plain English, short paragraphs, no numbered legal clauses.

### `/terms`

Sections:
1. Using the site — no warranty on uptime or accuracy; don't misuse the contact form
2. Intellectual property — all content and design belongs to Pandami
3. Third-party links — not responsible for external sites
4. Governing law — Romania
5. Contact

Tone: same as privacy — short, plain, human.

Both pages share a simple layout: eyebrow label + `<h1>` + prose sections with `<h2>` headings. Max-width 720px, generous line-height. Consistent with contact page hero styling.

**Footer update** — bottom bar gains "Privacy" and "Terms" links alongside the copyright line.

---

## 9. 404 / Error Page

**`src/routes/+error.svelte`**

- Uses `$page.status` and `$page.error?.message`
- Status 404: heading "Page not found", sub "The page you're looking for doesn't exist or has been moved.", CTA button "Back to home" (`href="/"`)
- Other statuses: heading "Something went wrong", sub "Error {status}. Try refreshing or come back later."
- Full-page centered layout, styled consistently with the rest of the site

---

## 10. Contact Form

**Removed:** Resend integration

**Added:**
- Cloudflare Turnstile widget in form
- Discord webhook for form delivery

**Env vars**
- `PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key (public)
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret (private)
- `DISCORD_WEBHOOK_URL` — Discord webhook URL (private)

**Client changes**
- Load Turnstile script: `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>` in page `<svelte:head>`
- Add `<div class="cf-turnstile" data-sitekey="{PUBLIC_TURNSTILE_SITE_KEY}" data-theme="light"></div>` above submit button
- Hidden input `cf-turnstile-response` is populated automatically by the widget

**Server action changes**
1. Read `cf-turnstile-response` token from form data
2. Verify: `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` with `{ secret, response: token, remoteip }`
3. If verification fails: return `fail(400, { error: 'Bot check failed. Please try again.' })`
4. Build Discord embed payload
5. `fetch(DISCORD_WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ embeds: [...] }) })`
6. Return `{ success: true }`

**Discord embed format**
```
Title: New contact inquiry
Color: 14423100 (matches #DC2626)
Fields: Name, Email, Services, Message
Footer: pandami.net contact form
```

---

## 11. Mobile Responsiveness

Audit target: all pages at 375px and 768px.

Components to check:
- `Navbar.svelte` — mobile menu toggle already exists, verify z-index and scroll lock
- `PricingSection.svelte` — plans collapse to 1-col at 540px (already done)
- Services comparison table — sticky first column, horizontal scroll
- Contact form — fieldset checkbox grid at narrow widths
- Footer — already collapses to column at 640px

Fix approach: add targeted `@media` rules where overflow or clipping is found during implementation.

---

## Environment Variables Summary

| Variable | Scope | Description |
|---|---|---|
| `PUBLIC_UMAMI_URL` | Public | Umami script URL |
| `PUBLIC_UMAMI_SITE_ID` | Public | Umami website ID |
| `PUBLIC_TURNSTILE_SITE_KEY` | Public | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Private | Turnstile verification secret |
| `DISCORD_WEBHOOK_URL` | Private | Discord webhook for form delivery |

---

## Files Created / Modified

### New files
- `app.html` (modified)
- `static/favicon.svg`
- `static/site.webmanifest`
- `static/og.svg`
- `static/og.png` (generated by script)
- `static/sitemap.xml`
- `scripts/gen-og.mjs`
- `src/routes/privacy/+page.svelte`
- `src/routes/terms/+page.svelte`
- `src/routes/+error.svelte`
- `src/lib/components/CookieBanner.svelte`
- `.env.example`

### Modified files
- `static/robots.txt`
- `src/routes/+layout.svelte`
- `src/routes/layout.css`
- `src/routes/+page.svelte`
- `src/routes/services/+page.svelte`
- `src/routes/contact/+page.svelte`
- `src/routes/contact/+page.server.ts`
- `src/lib/components/Footer.svelte`
- `src/lib/components/nav/Navbar.svelte`
- `src/lib/components/nav/MobileMenu.svelte`
