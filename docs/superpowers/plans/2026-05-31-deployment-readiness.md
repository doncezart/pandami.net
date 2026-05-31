# Deployment Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden pandami.net for production with SEO meta, analytics, cookie consent, legal pages, error handling, contact form replacement (Discord webhook + Turnstile), favicon, OG image, sitemap, and accessibility.

**Architecture:** Static assets go in `/static`. Global meta and analytics live in `+layout.svelte`. Each page manages its own canonical/og tags. Cookie banner uses a standalone Svelte component with localStorage persistence. Contact form server action replaces Resend with Discord webhook + Cloudflare Turnstile verification.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS 4, Playwright for e2e tests, `sharp` (one-off OG image generation), Cloudflare Turnstile, Discord webhooks, Umami analytics.

**Verified pre-conditions:**
- `app.html` already has `lang="en"` and viewport meta — no changes needed
- `.gitignore` already excludes `.env` and `.env.*`
- Navbar hamburger already has `aria-label="Open menu"`; MobileMenu already has `aria-label="Close menu"` and `role="dialog"`
- Contact form checkbox grid already collapses at 480px
- Services comparison table already has `overflow-x: auto`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `.env.example` | Create | Document all required env vars |
| `src/app.html` | Modify | Add JSON-LD structured data |
| `static/favicon.svg` | Create | Black P on white, SVG |
| `static/site.webmanifest` | Create | PWA manifest |
| `static/og.svg` | Create | 1200×630 branded OG card |
| `static/og.png` | Generate | Output of gen-og script |
| `scripts/gen-og.mjs` | Create | Converts og.svg → og.png via sharp |
| `static/sitemap.xml` | Create | All 5 pages |
| `static/robots.txt` | Modify | Add Sitemap: directive |
| `src/routes/+layout.svelte` | Modify | Global head meta, favicon links, Umami, skip link, CookieBanner |
| `src/routes/layout.css` | Modify | Focus styles, skip link visibility |
| `src/routes/+page.svelte` | Modify | Per-page og/canonical meta, `id="main-content"` |
| `src/routes/services/+page.svelte` | Modify | Per-page meta, `<main>` wrapper |
| `src/routes/contact/+page.svelte` | Modify | Per-page meta, Turnstile widget |
| `src/routes/contact/+page.server.ts` | Modify | Replace Resend with Discord webhook + Turnstile |
| `src/routes/privacy/+page.svelte` | Create | Privacy policy page |
| `src/routes/terms/+page.svelte` | Create | Terms of service page |
| `src/routes/+error.svelte` | Create | 404 and generic error page |
| `src/lib/components/CookieBanner.svelte` | Create | Cookie consent banner |
| `src/lib/components/Footer.svelte` | Modify | Add Privacy and Terms links |
| `src/lib/components/nav/Navbar.svelte` | Modify | aria-current on active nav links |
| `src/lib/components/home/Hero.svelte` | Modify | `data-umami-event` on CTA |
| `src/lib/components/home/PricingSection.svelte` | Modify | `data-umami-event` on plan CTAs |
| `tests/deployment.e2e.ts` | Create | Playwright e2e tests |

---

## Task 1: Environment variables

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create `.env.example`**

```
PUBLIC_UMAMI_URL=https://analytics.ceza.ro/script.js
PUBLIC_UMAMI_SITE_ID=b6905fa8-3cf4-48d2-a4c2-6e13efe1b740
PUBLIC_TURNSTILE_SITE_KEY=your-cloudflare-turnstile-site-key
TURNSTILE_SECRET_KEY=your-cloudflare-turnstile-secret-key
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
```

- [ ] **Step 2: Create `.env` from the example with your real values**

```bash
cp .env.example .env
# Then edit .env with real values
```

For testing without real Turnstile credentials, use Cloudflare's test keys:
- `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` (always passes)
- `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA`

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "chore: add env.example with required variables"
```

---

## Task 2: JSON-LD structured data in app.html

**Files:**
- Modify: `src/app.html`

The structured data is identical on every page, so it belongs in `app.html` (not the layout, which would re-render it per-page).

- [ ] **Step 1: Write failing Playwright test**

Create `tests/deployment.e2e.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('homepage has JSON-LD structured data', async ({ page }) => {
  await page.goto('/');
  const ldJson = await page.$('script[type="application/ld+json"]');
  expect(ldJson).not.toBeNull();
  const content = await ldJson!.textContent();
  const data = JSON.parse(content!);
  expect(data['@type']).toBe('ProfessionalService');
  expect(data.name).toBe('Pandami');
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "JSON-LD"
```

Expected: FAIL — no ld+json script found.

- [ ] **Step 3: Add JSON-LD to `src/app.html`**

Replace the closing `</head>` tag with:

```html
	<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"Pandami","url":"https://pandami.net","description":"Social media management agency handling strategy, content production, community management, and reporting.","email":"contact@pandami.net"}</script>
	%sveltekit.head%
</head>
```

(The JSON-LD goes before `%sveltekit.head%` so page-level head tags come after it.)

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "JSON-LD"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app.html tests/deployment.e2e.ts
git commit -m "feat: add JSON-LD ProfessionalService schema"
```

---

## Task 3: Favicon and webmanifest

**Files:**
- Create: `static/favicon.svg`
- Create: `static/site.webmanifest`

- [ ] **Step 1: Create `static/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#ffffff"/>
  <text x="16" y="24" font-family="system-ui,-apple-system,sans-serif" font-size="22" font-weight="700" text-anchor="middle" fill="#0A0A0A">P</text>
</svg>
```

- [ ] **Step 2: Create `static/site.webmanifest`**

```json
{
  "name": "Pandami",
  "short_name": "Pandami",
  "description": "All your social media needs taken care of.",
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ],
  "theme_color": "#0A0A0A",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "start_url": "/"
}
```

- [ ] **Step 3: Commit**

```bash
git add static/favicon.svg static/site.webmanifest
git commit -m "feat: add SVG favicon and web manifest"
```

---

## Task 4: OG image

**Files:**
- Create: `static/og.svg`
- Create: `scripts/gen-og.mjs`
- Generate: `static/og.png`

- [ ] **Step 1: Install sharp as a dev dependency**

```bash
pnpm add -D sharp
```

- [ ] **Step 2: Create `static/og.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect y="590" width="1200" height="40" fill="#DC2626"/>
  <text x="80" y="230" font-family="system-ui,-apple-system,sans-serif" font-size="108" font-weight="900" fill="#0A0A0A">Pandami</text>
  <text x="80" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="36" fill="#6B7280">All your social media needs taken care of.</text>
  <text x="80" y="555" font-family="system-ui,-apple-system,sans-serif" font-size="24" fill="#6B7280">pandami.net</text>
</svg>
```

- [ ] **Step 3: Create `scripts/gen-og.mjs`**

```js
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svgBuffer = readFileSync(join(root, 'static', 'og.svg'));
const pngBuffer = await sharp(svgBuffer)
  .resize(1200, 630)
  .png()
  .toBuffer();

writeFileSync(join(root, 'static', 'og.png'), pngBuffer);
console.log('Generated static/og.png (1200x630)');
```

- [ ] **Step 4: Generate the PNG**

```bash
node scripts/gen-og.mjs
```

Expected output: `Generated static/og.png (1200x630)`

- [ ] **Step 5: Commit**

```bash
git add static/og.svg static/og.png scripts/gen-og.mjs
git commit -m "feat: add OG social preview image"
```

---

## Task 5: Sitemap and robots.txt

**Files:**
- Create: `static/sitemap.xml`
- Modify: `static/robots.txt`

- [ ] **Step 1: Create `static/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pandami.net/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pandami.net/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pandami.net/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pandami.net/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://pandami.net/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Update `static/robots.txt`**

Replace the entire file with:

```
User-agent: *
Disallow:

Sitemap: https://pandami.net/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add static/sitemap.xml static/robots.txt
git commit -m "feat: add sitemap and update robots.txt"
```

---

## Task 6: Global layout — head meta, favicon links, Umami, skip link

**Files:**
- Modify: `src/routes/+layout.svelte`

This task adds: global OG meta tags, favicon link tags, Umami analytics injection via `onMount`, skip-to-content link, and the `CookieBanner` component import (the component itself is created in Task 10).

- [ ] **Step 1: Write failing test for OG meta**

Add to `tests/deployment.e2e.ts`:

```typescript
test('homepage has global og:site_name and og:image', async ({ page }) => {
  await page.goto('/');
  const siteName = await page.$eval(
    'meta[property="og:site_name"]',
    (el) => el.getAttribute('content')
  );
  expect(siteName).toBe('Pandami');

  const ogImage = await page.$eval(
    'meta[property="og:image"]',
    (el) => el.getAttribute('content')
  );
  expect(ogImage).toBe('https://pandami.net/og.png');
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "og:site_name"
```

Expected: FAIL

- [ ] **Step 3: Replace `src/routes/+layout.svelte` entirely**

```svelte
<script lang="ts">
  import './layout.css';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Scrollbar from '$lib/components/shared/Scrollbar.svelte';
  import type { Snippet } from 'svelte';
  import { PUBLIC_UMAMI_URL, PUBLIC_UMAMI_SITE_ID } from '$env/static/public';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  onMount(async () => {
    if (PUBLIC_UMAMI_URL && PUBLIC_UMAMI_SITE_ID) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = PUBLIC_UMAMI_URL;
      script.setAttribute('data-website-id', PUBLIC_UMAMI_SITE_ID);
      document.head.appendChild(script);
    }

    const { default: Lenis } = await import('lenis');
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.bunny.net" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta property="og:site_name" content="Pandami" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://pandami.net/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>
<Scrollbar />
<Navbar />
{@render children()}
<Footer />
```

Note: `CookieBanner` import and usage will be added in Task 10 once that component exists.

- [ ] **Step 4: Run type check and test**

```bash
pnpm check
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "og:site_name"
```

Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add src/routes/+layout.svelte tests/deployment.e2e.ts
git commit -m "feat: add global OG meta, favicon links, Umami analytics"
```

---

## Task 7: Focus styles and skip link CSS

**Files:**
- Modify: `src/routes/layout.css`

- [ ] **Step 1: Add focus styles and skip link to the end of `src/routes/layout.css`**

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0 0 0.375rem 0.375rem;
  text-decoration: none;
  transition: top 0.1s;
}

.skip-link:focus {
  top: 0;
}
```

- [ ] **Step 2: Run type check**

```bash
pnpm check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/layout.css
git commit -m "feat: add focus-visible styles and skip-to-content link"
```

---

## Task 8: Per-page meta tags and main IDs

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/services/+page.svelte`
- Modify: `src/routes/contact/+page.svelte`

Each page gets: `og:title`, `og:description`, `og:url`, `canonical`, `twitter:title`, `twitter:description`. The layout never duplicates these. Pages also get `id="main-content"` on their `<main>` (or a wrapping `<main>`) for the skip link.

- [ ] **Step 1: Write failing test for canonical**

Add to `tests/deployment.e2e.ts`:

```typescript
test('homepage has canonical URL', async ({ page }) => {
  await page.goto('/');
  const canonical = await page.$eval(
    'link[rel="canonical"]',
    (el) => el.getAttribute('href')
  );
  expect(canonical).toBe('https://pandami.net/');
});

test('services page has canonical URL', async ({ page }) => {
  await page.goto('/services');
  const canonical = await page.$eval(
    'link[rel="canonical"]',
    (el) => el.getAttribute('href')
  );
  expect(canonical).toBe('https://pandami.net/services');
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "canonical"
```

Expected: FAIL

- [ ] **Step 3: Replace `<svelte:head>` block in `src/routes/+page.svelte`**

```svelte
<svelte:head>
  <title>Pandami — All your social media needs taken care of</title>
  <meta name="description" content="Pandami handles your social media from strategy to daily posting to community. Focus on your business and we handle the rest." />
  <link rel="canonical" href="https://pandami.net/" />
  <meta property="og:title" content="Pandami — All your social media needs taken care of" />
  <meta property="og:description" content="Pandami handles your social media from strategy to daily posting to community. Focus on your business and we handle the rest." />
  <meta property="og:url" content="https://pandami.net/" />
  <meta name="twitter:title" content="Pandami — All your social media needs taken care of" />
  <meta name="twitter:description" content="Pandami handles your social media from strategy to daily posting to community. Focus on your business and we handle the rest." />
</svelte:head>
```

Also add `id="main-content"` to the existing `<main>` tag:

```svelte
<main id="main-content">
```

- [ ] **Step 4: Update `src/routes/services/+page.svelte`**

The services page has no `<main>` wrapper. Add one around all content, and update the `<svelte:head>` block.

Replace the existing `<svelte:head>` block (currently just has `<title>` and `<meta name="description">`):

```svelte
<svelte:head>
  <title>Services — Pandami</title>
  <meta name="description" content="From page audits to full production and community management. See exactly what each plan covers." />
  <link rel="canonical" href="https://pandami.net/services" />
  <meta property="og:title" content="Services — Pandami" />
  <meta property="og:description" content="From page audits to full production and community management. See exactly what each plan covers." />
  <meta property="og:url" content="https://pandami.net/services" />
  <meta name="twitter:title" content="Services — Pandami" />
  <meta name="twitter:description" content="From page audits to full production and community management. See exactly what each plan covers." />
</svelte:head>
```

Wrap all template content (the `{#each serviceBlocks...}` sections, standalone section, plans section, `<CtaBlock />`) with:

```svelte
<main id="main-content">
  <!-- existing sections go here -->
</main>
```

- [ ] **Step 5: Update `src/routes/contact/+page.svelte`**

Replace existing `<svelte:head>` block:

```svelte
<svelte:head>
  <title>Contact — Pandami</title>
  <meta name="description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <link rel="canonical" href="https://pandami.net/contact" />
  <meta property="og:title" content="Contact — Pandami" />
  <meta property="og:description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <meta property="og:url" content="https://pandami.net/contact" />
  <meta name="twitter:title" content="Contact — Pandami" />
  <meta name="twitter:description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
</svelte:head>
```

Add `id="main-content"` to the existing `<main>` tag.

- [ ] **Step 6: Run tests and type check**

```bash
pnpm check
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "canonical"
```

Expected: both PASS.

- [ ] **Step 7: Commit**

```bash
git add src/routes/+page.svelte src/routes/services/+page.svelte src/routes/contact/+page.svelte tests/deployment.e2e.ts
git commit -m "feat: add per-page og/canonical meta and main IDs"
```

---

## Task 9: aria-current on active nav links

**Files:**
- Modify: `src/lib/components/nav/Navbar.svelte`

- [ ] **Step 1: Update `src/lib/components/nav/Navbar.svelte`**

Add the `page` store import and `aria-current` to nav links. Replace the `<script>` block and desktop nav section:

```svelte
<script lang="ts">
  import ToolsDropdown from './ToolsDropdown.svelte';
  import MobileMenu from './MobileMenu.svelte';
  import { page } from '$app/stores';

  let mobileOpen = $state(false);

  function openMobile() {
    mobileOpen = true;
  }

  function closeMobile() {
    mobileOpen = false;
  }
</script>
```

Update the desktop nav links:

```svelte
<nav class="desktop-nav">
  <ToolsDropdown />
  <a
    href="/services"
    class="nav-link"
    aria-current={$page.url.pathname === '/services' ? 'page' : undefined}
  >Services</a>
  <a
    href="/contact"
    class="nav-link"
    aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}
  >Contact</a>
</nav>
```

- [ ] **Step 2: Run type check**

```bash
pnpm check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/nav/Navbar.svelte
git commit -m "feat: add aria-current to active nav links"
```

---

## Task 10: Cookie banner

**Files:**
- Create: `src/lib/components/CookieBanner.svelte`
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Write failing test**

Add to `tests/deployment.e2e.ts`:

```typescript
test('cookie banner shows on first visit and can be dismissed', async ({ page, context }) => {
  // Clear storage to simulate first visit
  await context.clearCookies();
  await page.evaluate(() => localStorage.clear());

  await page.goto('/');
  const banner = page.locator('[aria-label="Cookie notice"]');
  await expect(banner).toBeVisible();

  await page.click('text=Got it');
  await expect(banner).not.toBeVisible();

  const consent = await page.evaluate(() => localStorage.getItem('pandami-consent'));
  expect(consent).toBe('1');
});

test('cookie banner does not show on repeat visit', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('pandami-consent', '1'));
  await page.goto('/');
  const banner = page.locator('[aria-label="Cookie notice"]');
  await expect(banner).not.toBeVisible();
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "cookie banner"
```

Expected: FAIL — banner element not found.

- [ ] **Step 3: Create `src/lib/components/CookieBanner.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'pandami-consent';
  let visible = $state(false);

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1');
    visible = false;
  }

  onMount(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      visible = true;
    }
  });
</script>

{#if visible}
  <div class="cookie-banner" role="region" aria-label="Cookie notice">
    <p class="text">
      This site uses cookies to understand how people use it. Browsing further means you're fine with that.
    </p>
    <button class="accept-btn" onclick={accept} data-umami-event="cookie-accept">
      Got it
    </button>
  </div>
{/if}

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1rem 1.25rem;
    background: var(--color-text);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .text {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.5;
    max-width: 640px;
  }

  .accept-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 0.4375rem 1.125rem;
    background: var(--color-accent);
    color: #ffffff;
    border: none;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s;
    white-space: nowrap;
  }

  .accept-btn:hover {
    background: var(--color-accent-hover);
  }

  @media (max-width: 540px) {
    .cookie-banner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
```

- [ ] **Step 4: Add `CookieBanner` to `src/routes/+layout.svelte`**

Add the import at the top of the script block:

```svelte
import CookieBanner from '$lib/components/CookieBanner.svelte';
```

Add the component after `<Footer />`:

```svelte
<Footer />
<CookieBanner />
```

- [ ] **Step 5: Run tests**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "cookie banner"
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/CookieBanner.svelte src/routes/+layout.svelte tests/deployment.e2e.ts
git commit -m "feat: add cookie consent banner"
```

---

## Task 11: Error page

**Files:**
- Create: `src/routes/+error.svelte`

- [ ] **Step 1: Write failing test**

Add to `tests/deployment.e2e.ts`:

```typescript
test('404 page shows correct content and back button', async ({ page }) => {
  await page.goto('/this-page-does-not-exist-at-all');
  await expect(page.locator('h1')).toContainText('Page not found');
  const backBtn = page.locator('a[href="/"]');
  await expect(backBtn).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "404 page"
```

Expected: FAIL — heading text does not match (default SvelteKit error page).

- [ ] **Step 3: Create `src/routes/+error.svelte`**

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<svelte:head>
  <title>{$page.status} — Pandami</title>
</svelte:head>

<main class="error-page" id="main-content">
  <div class="inner">
    <p class="status">{$page.status}</p>
    {#if $page.status === 404}
      <h1>Page not found</h1>
      <p class="desc">The page you're looking for doesn't exist or has been moved.</p>
    {:else}
      <h1>Something went wrong</h1>
      <p class="desc">Try refreshing the page or come back later.</p>
    {/if}
    <PillButton href="/" variant="dark">Back to home</PillButton>
  </div>
</main>

<style>
  .error-page {
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.25rem;
  }

  .inner {
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .status {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .desc {
    margin: 0;
    font-size: 1.0625rem;
    color: var(--color-muted);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "404 page"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/routes/+error.svelte tests/deployment.e2e.ts
git commit -m "feat: add custom 404/error page"
```

---

## Task 12: Privacy policy page

**Files:**
- Create: `src/routes/privacy/+page.svelte`

- [ ] **Step 1: Write failing test**

Add to `tests/deployment.e2e.ts`:

```typescript
test('privacy page loads with correct title', async ({ page }) => {
  const response = await page.goto('/privacy');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Privacy Policy/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "privacy page"
```

Expected: FAIL — 404 since route does not exist yet.

- [ ] **Step 3: Create `src/routes/privacy/+page.svelte`**

```svelte
<svelte:head>
  <title>Privacy Policy — Pandami</title>
  <meta name="description" content="How Pandami collects, uses, and protects your information." />
  <link rel="canonical" href="https://pandami.net/privacy" />
  <meta property="og:title" content="Privacy Policy — Pandami" />
  <meta property="og:description" content="How Pandami collects, uses, and protects your information." />
  <meta property="og:url" content="https://pandami.net/privacy" />
  <meta name="twitter:title" content="Privacy Policy — Pandami" />
  <meta name="twitter:description" content="How Pandami collects, uses, and protects your information." />
</svelte:head>

<main class="legal-page" id="main-content">
  <div class="inner">
    <header class="page-header">
      <p class="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <p class="updated">Last updated: May 2026</p>
    </header>

    <div class="prose">
      <p>
        We care about keeping things simple and honest. Here is what we do with
        your data.
      </p>

      <h2>What we collect</h2>
      <p>
        When you use the contact form, we receive your name, email address, the
        services you are interested in, and anything you add in the optional
        message field. That information comes through to us as a notification.
        We do not store it in a database on our end.
      </p>
      <p>
        We use Umami, a self-hosted analytics tool, to understand how people
        find and use this site. Umami does not use cookies and does not collect
        personal data. It tells us things like which pages are popular and
        roughly where visitors come from — nothing tied to you as an individual.
      </p>
      <p>
        The contact form uses Cloudflare Turnstile for bot protection. Cloudflare
        may process your IP address during the challenge. Their
        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a>
        covers how they handle that.
      </p>

      <h2>How we use it</h2>
      <p>
        Your contact information is used only to respond to your inquiry. We do
        not add you to any mailing list, sell your data, or share it with third
        parties outside of what is described here.
      </p>

      <h2>Retention</h2>
      <p>
        Your message lives in our Discord as a notification. We do not archive
        contact submissions in a separate system. If you want us to delete it,
        just say so.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to delete any personal data we hold about you. Email
        <a href="mailto:contact@pandami.net">contact@pandami.net</a> and we will
        take care of it.
      </p>

      <h2>Changes</h2>
      <p>
        If anything here changes significantly, we will update this page. The
        date at the top shows when it was last revised.
      </p>
    </div>
  </div>
</main>

<style>
  .legal-page {
    min-height: calc(100vh - 64px);
    padding: 5rem 1.25rem 6rem;
  }

  .inner {
    max-width: 720px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .eyebrow {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .updated {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-muted);
  }

  .prose {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .prose p {
    margin: 0 0 1rem;
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text);
  }

  .prose h2 {
    margin: 2rem 0 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .prose a {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .prose a:hover {
    color: var(--color-accent-hover);
  }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "privacy page"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/routes/privacy/+page.svelte tests/deployment.e2e.ts
git commit -m "feat: add privacy policy page"
```

---

## Task 13: Terms of service page

**Files:**
- Create: `src/routes/terms/+page.svelte`

- [ ] **Step 1: Write failing test**

Add to `tests/deployment.e2e.ts`:

```typescript
test('terms page loads with correct title', async ({ page }) => {
  const response = await page.goto('/terms');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Terms of Service/);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "terms page"
```

Expected: FAIL

- [ ] **Step 3: Create `src/routes/terms/+page.svelte`**

```svelte
<svelte:head>
  <title>Terms of Service — Pandami</title>
  <meta name="description" content="Terms and conditions for using Pandami and its services." />
  <link rel="canonical" href="https://pandami.net/terms" />
  <meta property="og:title" content="Terms of Service — Pandami" />
  <meta property="og:description" content="Terms and conditions for using Pandami and its services." />
  <meta property="og:url" content="https://pandami.net/terms" />
  <meta name="twitter:title" content="Terms of Service — Pandami" />
  <meta name="twitter:description" content="Terms and conditions for using Pandami and its services." />
</svelte:head>

<main class="legal-page" id="main-content">
  <div class="inner">
    <header class="page-header">
      <p class="eyebrow">Legal</p>
      <h1>Terms of Service</h1>
      <p class="updated">Last updated: May 2026</p>
    </header>

    <div class="prose">
      <p>
        These are the ground rules for using pandami.net. Nothing surprising.
      </p>

      <h2>Using this site</h2>
      <p>
        This site exists to describe what Pandami offers and to let you get in
        touch. Do not use the contact form to spam or to send messages designed
        to cause harm. We reserve the right to ignore or block submissions that
        look like abuse.
      </p>
      <p>
        The information on this site is provided as-is. We do our best to keep
        it accurate and up to date, but we cannot guarantee it will always be
        perfect.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site — text, design, structure — belongs to Pandami.
        You are welcome to share links or quote small sections with attribution,
        but reproducing the site's content wholesale without permission is not
        okay.
      </p>

      <h2>Third-party links</h2>
      <p>
        We link to third-party services including our tools and external
        platforms. We are not responsible for what happens on those sites.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by Romanian law. Any disputes would fall under
        Romanian jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:contact@pandami.net">contact@pandami.net</a>.
      </p>
    </div>
  </div>
</main>

<style>
  .legal-page {
    min-height: calc(100vh - 64px);
    padding: 5rem 1.25rem 6rem;
  }

  .inner {
    max-width: 720px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .eyebrow {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .updated {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-muted);
  }

  .prose {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .prose p {
    margin: 0 0 1rem;
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text);
  }

  .prose h2 {
    margin: 2rem 0 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .prose a {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .prose a:hover {
    color: var(--color-accent-hover);
  }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "terms page"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/routes/terms/+page.svelte tests/deployment.e2e.ts
git commit -m "feat: add terms of service page"
```

---

## Task 14: Footer — Privacy and Terms links

**Files:**
- Modify: `src/lib/components/Footer.svelte`

- [ ] **Step 1: Write failing test**

Add to `tests/deployment.e2e.ts`:

```typescript
test('footer has privacy and terms links', async ({ page }) => {
  await page.goto('/');
  const privacyLink = page.locator('footer a[href="/privacy"]');
  const termsLink = page.locator('footer a[href="/terms"]');
  await expect(privacyLink).toBeVisible();
  await expect(termsLink).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "footer has privacy"
```

Expected: FAIL

- [ ] **Step 3: Update footer in `src/lib/components/Footer.svelte`**

Replace the `.bottom` div:

```svelte
    <div class="bottom">
      <span class="copy">© {year} Pandami. All rights reserved.</span>
      <nav class="legal-links" aria-label="Legal">
        <a href="/privacy" class="legal-link">Privacy</a>
        <a href="/terms" class="legal-link">Terms</a>
      </nav>
    </div>
```

Add CSS at the end of the `<style>` block (before closing `</style>`):

```css
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .legal-links {
    display: flex;
    gap: 1.25rem;
  }

  .legal-link {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.28);
    text-decoration: none;
    transition: color 0.15s;
  }

  .legal-link:hover {
    color: rgba(255, 255, 255, 0.65);
  }
```

Also add `aria-label` to the existing footer nav blocks. Replace:

```svelte
      <nav class="links-col">
        <span class="col-title">Pages</span>
```

with:

```svelte
      <nav class="links-col" aria-label="Pages">
        <span class="col-title">Pages</span>
```

And replace:

```svelte
      <nav class="links-col">
        <span class="col-title">Tools</span>
```

with:

```svelte
      <nav class="links-col" aria-label="Tools">
        <span class="col-title">Tools</span>
```

- [ ] **Step 4: Run test and type check**

```bash
pnpm check
pnpm build && npx playwright test tests/deployment.e2e.ts --grep "footer has privacy"
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/Footer.svelte tests/deployment.e2e.ts
git commit -m "feat: add privacy and terms links to footer"
```

---

## Task 15: Contact form — server action (Discord webhook + Turnstile)

**Files:**
- Modify: `src/routes/contact/+page.server.ts`

- [ ] **Step 1: Replace `src/routes/contact/+page.server.ts` entirely**

```typescript
import { fail } from '@sveltejs/kit';
import { TURNSTILE_SECRET_KEY, DISCORD_WEBHOOK_URL } from '$env/static/private';
import type { Actions } from './$types';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(token: string, remoteip: string): Promise<boolean> {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: token, remoteip }),
    });
    const data = await res.json() as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const actions: Actions = {
  default: async ({ request, getClientAddress }) => {
    const data = await request.formData();
    const name = (data.get('name') as string | null)?.trim() ?? '';
    const email = (data.get('email') as string | null)?.trim() ?? '';
    const services = data.getAll('services') as string[];
    const message = (data.get('message') as string | null)?.trim() ?? '';
    const turnstileToken = (data.get('cf-turnstile-response') as string | null) ?? '';

    if (!name) {
      return fail(400, { error: 'Name is required.', name, email, services, message });
    }
    if (!email || !isValidEmail(email)) {
      return fail(400, { error: 'A valid email address is required.', name, email, services, message });
    }
    if (services.length === 0) {
      return fail(400, { error: 'Please select at least one service.', name, email, services, message });
    }
    if (!turnstileToken) {
      return fail(400, { error: 'Please complete the bot check before submitting.', name, email, services, message });
    }

    const remoteip = getClientAddress();
    const turnstileOk = await verifyTurnstile(turnstileToken, remoteip);
    if (!turnstileOk) {
      return fail(400, { error: 'Bot check failed. Please try again.', name, email, services, message });
    }

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: 'New contact inquiry',
              color: 14423100,
              fields: [
                { name: 'Name', value: name, inline: true },
                { name: 'Email', value: email, inline: true },
                { name: 'Services', value: services.join(', ') },
                { name: 'Message', value: message || '(none)' },
              ],
              footer: { text: 'pandami.net contact form' },
            },
          ],
        }),
      });
    } catch (err) {
      console.error('Discord webhook error:', err);
    }

    return { success: true };
  },
};
```

- [ ] **Step 2: Run type check**

```bash
pnpm check
```

Expected: no errors. If you see errors about `TURNSTILE_SECRET_KEY` or `DISCORD_WEBHOOK_URL` not being defined, confirm your `.env` file has those keys set.

- [ ] **Step 3: Commit**

```bash
git add src/routes/contact/+page.server.ts
git commit -m "feat: replace Resend with Discord webhook and Cloudflare Turnstile"
```

---

## Task 16: Contact form — Turnstile widget and analytics tracking

**Files:**
- Modify: `src/routes/contact/+page.svelte`

- [ ] **Step 1: Add Turnstile import and site key to the script block**

Add to the top of the `<script>` block in `src/routes/contact/+page.svelte`:

```svelte
import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
```

- [ ] **Step 2: Update `<svelte:head>` to load Turnstile script**

The Turnstile script needs to load on the contact page. The existing `<svelte:head>` already has the page meta. Add the Turnstile script tag to it:

```svelte
<svelte:head>
  <title>Contact — Pandami</title>
  <meta name="description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <link rel="canonical" href="https://pandami.net/contact" />
  <meta property="og:title" content="Contact — Pandami" />
  <meta property="og:description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <meta property="og:url" content="https://pandami.net/contact" />
  <meta name="twitter:title" content="Contact — Pandami" />
  <meta name="twitter:description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>
```

- [ ] **Step 3: Add Turnstile widget inside the form and tracking to the submit button**

Find the `<PillButton type="submit" variant="primary">` line and replace the block above it (from the textarea field to the button) with:

```svelte
          <div class="field">
            <label for="message">Anything else you'd like us to know?</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Tell us about your business, your current situation, goals..."
            >{form?.message ?? ''}</textarea>
          </div>

          <div class="cf-turnstile" data-sitekey={PUBLIC_TURNSTILE_SITE_KEY} data-theme="light"></div>

          <PillButton
            type="submit"
            variant="primary"
            data-umami-event="contact-submit"
          >
            {submitting ? 'Sending…' : 'Send Message'}
          </PillButton>
```

- [ ] **Step 4: Add analytics tracking for form success/error to the `enhance` callback**

Replace the existing `use:enhance` callback:

```svelte
          use:enhance={() => {
            submitting = true;
            return async ({ update, result }) => {
              await update();
              submitting = false;
              if (result.type === 'success') {
                window.umami?.track('contact-success');
              } else {
                window.umami?.track('contact-error');
              }
            };
          }}
```

- [ ] **Step 5: Add the Turnstile widget CSS so it doesn't break the form layout**

Add to the `<style>` block:

```css
  .cf-turnstile {
    min-height: 65px;
  }
```

- [ ] **Step 6: Run type check**

```bash
pnpm check
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/routes/contact/+page.svelte
git commit -m "feat: add Cloudflare Turnstile widget and analytics tracking to contact form"
```

---

## Task 17: Analytics event tracking on CTAs

**Files:**
- Modify: `src/lib/components/home/Hero.svelte`
- Modify: `src/lib/components/home/PricingSection.svelte`

`PillButton` passes all extra props through `{...rest}` to the underlying `<a>` or `<button>`, so `data-umami-event` just works.

- [ ] **Step 1: Add `data-umami-event` to the Hero CTA in `src/lib/components/home/Hero.svelte`**

Find the Hero's primary CTA and add the attribute:

```svelte
<PillButton href="/contact" variant="dark" data-umami-event="hero-cta">Get Started</PillButton>
```

- [ ] **Step 2: Add `data-umami-event` to plan CTAs in `src/lib/components/home/PricingSection.svelte`**

Find the `<PillButton href={plan.ctaHref} variant={plan.variant}>` line and update it:

```svelte
<PillButton
  href={plan.ctaHref}
  variant={plan.variant}
  data-umami-event="pricing-cta-{plan.id}"
>
  {plan.ctaLabel}
</PillButton>
```

- [ ] **Step 3: Run type check**

```bash
pnpm check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/home/Hero.svelte src/lib/components/home/PricingSection.svelte
git commit -m "feat: add Umami event tracking to hero and pricing CTAs"
```

---

## Task 18: Build verification and full test run

- [ ] **Step 1: Run full type check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 2: Run production build**

```bash
pnpm build
```

Expected: successful build with no errors. If you see warnings about missing env vars during build, ensure your `.env` file is populated.

- [ ] **Step 3: Run all Playwright tests**

```bash
npx playwright test
```

Expected: all tests pass. The webServer config will build and preview automatically.

- [ ] **Step 4: Manual checks in the dev server**

```bash
pnpm dev
```

Verify at `http://localhost:6969`:
- [ ] Favicon appears in browser tab
- [ ] Cookie banner shows on first load, disappears after "Got it"
- [ ] Skip link appears when you press Tab on page load
- [ ] `/privacy` and `/terms` routes load and look correct
- [ ] `/some-nonexistent-page` shows the custom 404
- [ ] Contact form shows the Turnstile widget above the submit button
- [ ] Footer has Privacy and Terms links in the bottom bar

- [ ] **Step 5: Generate og.png if not already done**

```bash
node scripts/gen-og.mjs
```

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: deployment readiness complete"
```

---

## Post-deployment checklist

After deploying:

1. Submit sitemap to Google Search Console: `https://pandami.net/sitemap.xml`
2. Test OG image using [opengraph.xyz](https://opengraph.xyz) or Facebook Sharing Debugger
3. Verify Umami is receiving page views by checking the analytics dashboard
4. Set real Cloudflare Turnstile keys (not the test keys) in production environment variables
5. Set real Discord webhook URL in production environment variables
