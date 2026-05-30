# Pandami Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the pandami.net marketing website — Homepage, Services, and Contact pages — using SvelteKit 2 + Svelte 5 + Tailwind CSS 4, following the design spec at `docs/superpowers/specs/2026-05-30-pandami-website-design.md`.

**Architecture:** Data-driven config files (`pillars.ts`, `streamers.ts`, `services.ts`) feed all page sections and components. Each homepage section is an isolated Svelte component. The navbar Tools dropdown has a flyout submenu for StreamAid streamers. The contact form uses a SvelteKit form action with optional Resend email integration.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS 4, TypeScript, lucide-svelte, resend, Playwright (E2E), Vitest (unit)

---

## File Map

```
src/
  routes/
    layout.css                        MODIFY — add design tokens and font import
    +layout.svelte                    MODIFY — add Navbar, Footer, font preconnect
    +page.svelte                      MODIFY — homepage (compose section components)
    services/
      +page.svelte                    CREATE — services and pricing page
    contact/
      +page.svelte                    CREATE — contact form page
      +page.server.ts                 CREATE — form action with validation + Resend
  lib/
    components/
      nav/
        Navbar.svelte                 CREATE — sticky header with logo, nav, CTA
        ToolsDropdown.svelte          CREATE — click-to-open dropdown with flyout
        StreamAidFlyout.svelte        CREATE — streamer buttons panel
        MobileMenu.svelte             CREATE — hamburger menu content
      home/
        Hero.svelte                   CREATE — full-viewport hero section
        ProblemSection.svelte         CREATE — task chips + closing line
        ConsistencySection.svelte     CREATE — pull-quote + stat bar
        SolutionSection.svelte        CREATE — pillar card grid
        ServicesTeaser.svelte         CREATE — two-column teaser block
        CtaBlock.svelte               CREATE — black bg CTA section
      shared/
        PillButton.svelte             CREATE — pill button (primary/secondary/inverted)
        PillarCard.svelte             CREATE — icon + label + description card
        StatBlock.svelte              CREATE — red number + label
        TaskChip.svelte               CREATE — gray rounded tag
      Footer.svelte                   CREATE — dark footer with nav columns
    data/
      pillars.ts                      CREATE — six pillar definitions
      streamers.ts                    CREATE — streamer config array
      services.ts                     CREATE — pricing tier definitions
tests/
  homepage.e2e.ts                     CREATE — homepage section visibility tests
  navigation.e2e.ts                   CREATE — navbar, dropdown, routing tests
  contact.e2e.ts                      CREATE — contact form tests
```

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via pnpm)

- [ ] **Step 1: Install lucide-svelte and resend**

```bash
cd /home/cezar/pandami.net
pnpm add lucide-svelte resend
```

Expected output: packages added, no errors.

- [ ] **Step 2: Verify installs**

```bash
pnpm list lucide-svelte resend
```

Expected: both packages listed with version numbers.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add lucide-svelte and resend dependencies"
```

---

## Task 2: Design tokens and global styles

**Files:**
- Modify: `src/routes/layout.css`

- [ ] **Step 1: Replace layout.css with tokens and font**

```css
/* src/routes/layout.css */
@import 'tailwindcss';
@import url('https://fonts.bunny.net/css?family=inter:400,500,700,900&display=swap');

@theme {
  --color-bg: #FFFFFF;
  --color-text: #0A0A0A;
  --color-muted: #6B7280;
  --color-border: #E5E7EB;
  --color-accent: #DC2626;
  --color-accent-hover: #B91C1C;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Start dev server and verify body background is white**

```bash
pnpm dev
```

Open `http://localhost:5173` in a browser. Background should be white, no Tailwind preflight issues.

- [ ] **Step 3: Commit**

```bash
git add src/routes/layout.css
git commit -m "style: add design tokens and global styles"
```

---

## Task 3: Data config — pillars (TDD)

**Files:**
- Create: `src/lib/data/pillars.ts`
- Create: `src/lib/data/pillars.test.ts`

- [ ] **Step 1: Write the failing unit test**

```ts
// src/lib/data/pillars.test.ts
import { describe, it, expect } from 'vitest';
import { pillars } from './pillars.ts';

describe('pillars', () => {
  it('exports exactly six pillars', () => {
    expect(pillars).toHaveLength(6);
  });

  it('each pillar has id, label, description, and iconName', () => {
    for (const pillar of pillars) {
      expect(pillar.id, `pillar missing id`).toBeTruthy();
      expect(pillar.label, `pillar ${pillar.id} missing label`).toBeTruthy();
      expect(pillar.description, `pillar ${pillar.id} missing description`).toBeTruthy();
      expect(pillar.iconName, `pillar ${pillar.id} missing iconName`).toBeTruthy();
    }
  });

  it('all pillar IDs are unique', () => {
    const ids = pillars.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('community pillar has exactly two subItems', () => {
    const community = pillars.find((p) => p.id === 'community');
    expect(community).toBeDefined();
    expect(community!.subItems).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm test:unit src/lib/data/pillars.test.ts
```

Expected: FAIL — `Cannot find module './pillars.ts'`

- [ ] **Step 3: Create the pillars data file**

```ts
// src/lib/data/pillars.ts
export type PillarSubItem = {
  label: string;
  description: string;
};

export type Pillar = {
  id: string;
  label: string;
  description: string;
  iconName: string;
  subItems?: PillarSubItem[];
};

export const pillars: Pillar[] = [
  {
    id: 'strategy',
    label: 'Strategy',
    description:
      'We research your niche, audience, and competitors before a single post goes out.',
    iconName: 'Target',
  },
  {
    id: 'content',
    label: 'Content Production',
    description:
      'Scripting, recording direction, editing, thumbnails. Delivered ready to publish.',
    iconName: 'Film',
  },
  {
    id: 'scheduling',
    label: 'Scheduling and Posting',
    description: "We manage the calendar and hit publish. You don't lift a finger.",
    iconName: 'CalendarDays',
  },
  {
    id: 'community',
    label: 'Community Building',
    description:
      'From social comments and DMs to full Discord server setup, moderation, bots, and automations. We build and run the community around your brand.',
    iconName: 'Users',
    subItems: [
      {
        label: 'Social Media Communities',
        description:
          'Responding to comments, managing DMs, and fostering engagement across all platforms.',
      },
      {
        label: 'Discord Servers',
        description:
          'Full server creation, channel architecture, role structure, moderation rules, custom bots, and ongoing moderation.',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics and Reporting',
    description: 'We watch the numbers and report back on what is actually working.',
    iconName: 'BarChart2',
  },
  {
    id: 'automation',
    label: 'Automation',
    description: 'Workflows and tools that scale what is working without scaling the cost.',
    iconName: 'Zap',
  },
];
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pnpm test:unit src/lib/data/pillars.test.ts
```

Expected: PASS — 4 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/data/pillars.ts src/lib/data/pillars.test.ts
git commit -m "feat: add pillars data config with tests"
```

---

## Task 4: Data config — streamers and services (TDD)

**Files:**
- Create: `src/lib/data/streamers.ts`
- Create: `src/lib/data/streamers.test.ts`
- Create: `src/lib/data/services.ts`
- Create: `src/lib/data/services.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/data/streamers.test.ts
import { describe, it, expect } from 'vitest';
import { streamers } from './streamers.ts';

describe('streamers', () => {
  it('exports an array', () => {
    expect(Array.isArray(streamers)).toBe(true);
  });

  it('each streamer has a non-empty name and subdomain', () => {
    for (const streamer of streamers) {
      expect(streamer.name).toBeTruthy();
      expect(streamer.subdomain).toBeTruthy();
    }
  });
});
```

```ts
// src/lib/data/services.test.ts
import { describe, it, expect } from 'vitest';
import { tiers } from './services.ts';
import { pillars } from './pillars.ts';

describe('tiers', () => {
  it('exports exactly three tiers', () => {
    expect(tiers).toHaveLength(3);
  });

  it('each tier has required fields', () => {
    for (const tier of tiers) {
      expect(tier.name).toBeTruthy();
      expect(tier.tagline).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.pillarIds.length).toBeGreaterThan(0);
      expect(tier.platforms).toBeTruthy();
      expect(tier.turnaround).toBeTruthy();
    }
  });

  it('all pillarIds reference valid pillar IDs', () => {
    const validIds = pillars.map((p) => p.id);
    for (const tier of tiers) {
      for (const id of tier.pillarIds) {
        expect(validIds, `unknown pillar ID: ${id}`).toContain(id);
      }
    }
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pnpm test:unit src/lib/data/streamers.test.ts src/lib/data/services.test.ts
```

Expected: FAIL — module not found errors.

- [ ] **Step 3: Create streamers.ts**

```ts
// src/lib/data/streamers.ts
export type Streamer = {
  name: string;
  subdomain: string;
};

export const streamers: Streamer[] = [
  // Add streamers here when partnerships are confirmed.
  // Example: { name: 'StreamerName', subdomain: 'streamername.pandami.net' }
];
```

- [ ] **Step 4: Create services.ts**

```ts
// src/lib/data/services.ts
export type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  pillarIds: string[];
  platforms: string;
  turnaround: string;
};

export const tiers: PricingTier[] = [
  {
    name: 'Starter',
    tagline: 'For brands starting out on one platform.',
    price: 'from $X/mo',
    pillarIds: ['strategy', 'content', 'scheduling'],
    platforms: '1 platform',
    turnaround: '48 hours',
  },
  {
    name: 'Growth',
    tagline: 'For established brands scaling across platforms.',
    price: 'from $X/mo',
    pillarIds: ['strategy', 'content', 'scheduling', 'analytics'],
    platforms: '2 platforms',
    turnaround: '24 hours',
  },
  {
    name: 'Full Service',
    tagline: 'Complete handoff. All platforms, all pillars.',
    price: 'from $X/mo',
    pillarIds: ['strategy', 'content', 'scheduling', 'community', 'analytics', 'automation'],
    platforms: 'All platforms',
    turnaround: 'Same day',
  },
];
```

- [ ] **Step 5: Run the tests to verify they pass**

```bash
pnpm test:unit src/lib/data/streamers.test.ts src/lib/data/services.test.ts
```

Expected: PASS — 5 tests passing.

- [ ] **Step 6: Commit**

```bash
git add src/lib/data/streamers.ts src/lib/data/streamers.test.ts src/lib/data/services.ts src/lib/data/services.test.ts
git commit -m "feat: add streamers and services data configs with tests"
```

---

## Task 5: Shared components — PillButton, TaskChip, StatBlock

**Files:**
- Create: `src/lib/components/shared/PillButton.svelte`
- Create: `src/lib/components/shared/TaskChip.svelte`
- Create: `src/lib/components/shared/StatBlock.svelte`

- [ ] **Step 1: Create PillButton.svelte**

```svelte
<!-- src/lib/components/shared/PillButton.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    variant?: 'primary' | 'secondary' | 'inverted';
    href?: string;
    onclick?: () => void;
    children: Snippet;
  };

  let { variant = 'primary', href, onclick, children }: Props = $props();
</script>

{#if href}
  <a {href} class="btn {variant}">
    {@render children()}
  </a>
{:else}
  <button {onclick} class="btn {variant}" type="button">
    {@render children()}
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.9375rem;
    font-family: inherit;
    text-decoration: none;
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
    cursor: pointer;
    border: 2px solid transparent;
    white-space: nowrap;
  }

  .primary {
    background-color: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }

  .primary:hover {
    background-color: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }

  .secondary {
    background-color: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .secondary:hover {
    border-color: var(--color-text);
  }

  .inverted {
    background-color: #fff;
    color: var(--color-text);
    border-color: #fff;
  }

  .inverted:hover {
    background-color: rgba(255, 255, 255, 0.88);
    border-color: rgba(255, 255, 255, 0.88);
  }
</style>
```

- [ ] **Step 2: Create TaskChip.svelte**

```svelte
<!-- src/lib/components/shared/TaskChip.svelte -->
<script lang="ts">
  let { label }: { label: string } = $props();
</script>

<span class="chip">{label}</span>

<style>
  .chip {
    display: inline-block;
    padding: 0.375rem 0.875rem;
    border-radius: 9999px;
    background-color: #F3F4F6;
    color: var(--color-text);
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
  }
</style>
```

- [ ] **Step 3: Create StatBlock.svelte**

```svelte
<!-- src/lib/components/shared/StatBlock.svelte -->
<script lang="ts">
  let { value, label }: { value: string; label: string } = $props();
</script>

<div class="stat">
  <span class="value">{value}</span>
  <span class="label">{label}</span>
</div>

<style>
  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .value {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    color: var(--color-accent);
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .label {
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.4;
  }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/shared/
git commit -m "feat: add PillButton, TaskChip, StatBlock components"
```

---

## Task 6: PillarCard component

**Files:**
- Create: `src/lib/components/PillarCard.svelte`

- [ ] **Step 1: Create PillarCard.svelte**

The `iconName` values in `pillars.ts` are lucide-svelte component names. Import them by name and look up the correct one per pillar.

```svelte
<!-- src/lib/components/PillarCard.svelte -->
<script lang="ts">
  import {
    Target,
    Film,
    CalendarDays,
    Users,
    BarChart2,
    Zap,
  } from 'lucide-svelte';
  import type { Pillar } from '$lib/data/pillars.ts';

  const iconMap: Record<string, unknown> = {
    Target,
    Film,
    CalendarDays,
    Users,
    BarChart2,
    Zap,
  };

  let { pillar }: { pillar: Pillar } = $props();

  const Icon = $derived(iconMap[pillar.iconName] as typeof Target);
</script>

<div class="card">
  <div class="icon">
    <Icon size={22} />
  </div>
  <h3>{pillar.label}</h3>
  <p>{pillar.description}</p>
</div>

<style>
  .card {
    padding: 1.75rem;
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: box-shadow 150ms ease;
  }

  .card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
  }

  .icon {
    color: var(--color-accent);
    display: flex;
    align-items: center;
  }

  h3 {
    font-size: 1.0625rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0;
  }

  p {
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.6;
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/PillarCard.svelte
git commit -m "feat: add PillarCard component"
```

---

## Task 7: Navbar, ToolsDropdown, StreamAidFlyout, MobileMenu

**Files:**
- Create: `src/lib/components/nav/Navbar.svelte`
- Create: `src/lib/components/nav/ToolsDropdown.svelte`
- Create: `src/lib/components/nav/StreamAidFlyout.svelte`
- Create: `src/lib/components/nav/MobileMenu.svelte`

- [ ] **Step 1: Write the failing E2E test**

```ts
// tests/navigation.e2e.ts
import { test, expect } from '@playwright/test';

test('navbar renders logo, nav links, and CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Pandami' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get Started' }).first()).toBeVisible();
});

test('tools dropdown opens on click and shows all three items', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Tools/ }).click();
  await expect(page.getByText('FX Library')).toBeVisible();
  await expect(page.getByText('Meme Library')).toBeVisible();
  await expect(page.getByText('StreamAid')).toBeVisible();
});

test('tools dropdown closes when clicking outside', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Tools/ }).click();
  await expect(page.getByText('FX Library')).toBeVisible();
  await page.locator('h1').click();
  await expect(page.getByText('FX Library')).not.toBeVisible();
});

test('StreamAid flyout opens on click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Tools/ }).click();
  await page.getByText('StreamAid').click();
  // Flyout panel is visible (even if empty when no streamers are configured)
  await expect(page.locator('.flyout')).toBeVisible();
});

test('services link navigates to /services', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL('/services');
});

test('get started button navigates to /contact', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get Started' }).first().click();
  await expect(page).toHaveURL('/contact');
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm run build && pnpm test:e2e tests/navigation.e2e.ts
```

Expected: FAIL — elements not found because the navbar does not exist yet.

- [ ] **Step 3: Create StreamAidFlyout.svelte**

```svelte
<!-- src/lib/components/nav/StreamAidFlyout.svelte -->
<script lang="ts">
  import { streamers } from '$lib/data/streamers.ts';
</script>

<div class="flyout" role="menu">
  {#if streamers.length === 0}
    <p class="empty">No streamers yet.</p>
  {:else}
    {#each streamers as streamer}
      <a
        href="https://{streamer.subdomain}"
        target="_blank"
        rel="noopener noreferrer"
        class="streamer-btn"
        role="menuitem"
      >
        {streamer.name}
      </a>
    {/each}
  {/if}
</div>

<style>
  .flyout {
    position: absolute;
    top: calc(100% + 12px);
    left: calc(220px + 8px);
    background: #fff;
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    min-width: 180px;
    overflow: hidden;
    z-index: 101;
    animation: slideIn 120ms ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-4px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .streamer-btn {
    display: block;
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border);
    transition: background-color 100ms ease;
  }

  .streamer-btn:last-child {
    border-bottom: none;
  }

  .streamer-btn:hover {
    background-color: #F9FAFB;
  }

  .empty {
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
    color: var(--color-muted);
    margin: 0;
  }
</style>
```

- [ ] **Step 4: Create ToolsDropdown.svelte**

```svelte
<!-- src/lib/components/nav/ToolsDropdown.svelte -->
<script lang="ts">
  import StreamAidFlyout from './StreamAidFlyout.svelte';

  let open = $state(false);
  let streamAidOpen = $state(false);

  function toggle() {
    open = !open;
    if (!open) streamAidOpen = false;
  }

  function close() {
    open = false;
    streamAidOpen = false;
  }
</script>

<svelte:window
  onclick={(e) => {
    if (!(e.target as Element).closest('.tools-wrapper')) close();
  }}
/>

<div class="tools-wrapper">
  <button class="trigger" aria-haspopup="true" aria-expanded={open} onclick={toggle}>
    Tools
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </button>

  {#if open}
    <div class="dropdown" role="menu">
      <a
        href="https://fx.pandami.net"
        target="_blank"
        rel="noopener noreferrer"
        class="item"
        role="menuitem"
      >
        <span class="item-label">FX Library</span>
        <span class="item-desc">Browse visual and sound effects</span>
      </a>
      <a
        href="https://meme.pandami.net"
        target="_blank"
        rel="noopener noreferrer"
        class="item"
        role="menuitem"
      >
        <span class="item-label">Meme Library</span>
        <span class="item-desc">Ready-to-use meme formats for any niche</span>
      </a>
      <div
        class="item streamaid"
        role="menuitem"
        tabindex="0"
        onclick={() => (streamAidOpen = !streamAidOpen)}
        onkeydown={(e) => e.key === 'Enter' && (streamAidOpen = !streamAidOpen)}
      >
        <span class="item-label">
          StreamAid
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
        <span class="item-desc">Support your favorite partnered streamers</span>
      </div>
    </div>
  {/if}

  {#if open && streamAidOpen}
    <StreamAidFlyout />
  {/if}
</div>

<style>
  .tools-wrapper {
    position: relative;
  }

  .trigger {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    transition: color 150ms ease;
  }

  .trigger:hover {
    color: var(--color-accent);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    background: #fff;
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    min-width: 220px;
    overflow: hidden;
    z-index: 100;
    animation: fadeDown 120ms ease;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.875rem 1rem;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 100ms ease;
    border-bottom: 1px solid var(--color-border);
  }

  .item:last-child {
    border-bottom: none;
  }

  .item:hover {
    background-color: #F9FAFB;
  }

  .item-label {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .item-desc {
    font-size: 0.8125rem;
    color: var(--color-muted);
  }
</style>
```

- [ ] **Step 5: Create MobileMenu.svelte**

```svelte
<!-- src/lib/components/nav/MobileMenu.svelte -->
<script lang="ts">
  let { onclose }: { onclose: () => void } = $props();
</script>

<div class="mobile-menu">
  <nav>
    <p class="section-label">Tools</p>
    <a href="https://fx.pandami.net" target="_blank" rel="noopener noreferrer" onclick={onclose}>
      FX Library
    </a>
    <a href="https://meme.pandami.net" target="_blank" rel="noopener noreferrer" onclick={onclose}>
      Meme Library
    </a>
    <a href="https://streamaid.pandami.net" target="_blank" rel="noopener noreferrer" onclick={onclose}>
      StreamAid
    </a>
    <div class="divider"></div>
    <a href="/services" onclick={onclose}>Services</a>
    <a href="/contact" onclick={onclose}>Contact</a>
    <a href="/contact" class="mobile-cta" onclick={onclose}>Get Started</a>
  </nav>
</div>

<style>
  .mobile-menu {
    background: #fff;
    border-top: 1px solid var(--color-border);
    padding: 0.75rem 1.5rem 1.5rem;
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  .section-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted);
    margin: 0.75rem 0 0.25rem;
  }

  nav a {
    display: block;
    padding: 0.625rem 0;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border);
    transition: color 100ms ease;
  }

  nav a:hover {
    color: var(--color-accent);
  }

  .divider {
    height: 1px;
    background: var(--color-border);
    margin: 0.5rem 0;
  }

  .mobile-cta {
    margin-top: 0.75rem;
    background: var(--color-accent) !important;
    color: #fff !important;
    text-align: center;
    border-radius: 9999px;
    padding: 0.75rem !important;
    font-weight: 700 !important;
    border-bottom: none !important;
    transition: background-color 150ms ease !important;
  }

  .mobile-cta:hover {
    background: var(--color-accent-hover) !important;
    color: #fff !important;
  }
</style>
```

- [ ] **Step 6: Create Navbar.svelte**

```svelte
<!-- src/lib/components/nav/Navbar.svelte -->
<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
  import ToolsDropdown from './ToolsDropdown.svelte';
  import MobileMenu from './MobileMenu.svelte';

  let mobileOpen = $state(false);
</script>

<header class="navbar">
  <div class="inner">
    <a href="/" class="logo">Pandami</a>

    <nav class="desktop-nav" aria-label="Main navigation">
      <ToolsDropdown />
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </nav>

    <div class="cta">
      <PillButton href="/contact">Get Started</PillButton>
    </div>

    <button
      class="hamburger"
      aria-label="Toggle navigation menu"
      aria-expanded={mobileOpen}
      onclick={() => (mobileOpen = !mobileOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  {#if mobileOpen}
    <MobileMenu onclose={() => (mobileOpen = false)} />
  {/if}
</header>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: #fff;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 64px;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .logo {
    font-size: 1.25rem;
    font-weight: 900;
    color: var(--color-text);
    text-decoration: none;
    letter-spacing: -0.02em;
    flex-shrink: 0;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 1.75rem;
    flex: 1;
  }

  .desktop-nav a {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text);
    text-decoration: none;
    transition: color 150ms ease;
  }

  .desktop-nav a:hover {
    color: var(--color-accent);
  }

  .cta {
    flex-shrink: 0;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    .desktop-nav,
    .cta {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }
</style>
```

- [ ] **Step 7: Build and run the E2E test to verify it passes**

```bash
pnpm run build && pnpm test:e2e tests/navigation.e2e.ts
```

Expected: PASS — 6 tests passing. If the StreamAid flyout test fails because `.flyout` is not in the DOM when streamers is empty, update `StreamAidFlyout.svelte` to always render the `<div class="flyout">` wrapper (which it does).

- [ ] **Step 8: Commit**

```bash
git add src/lib/components/nav/ tests/navigation.e2e.ts
git commit -m "feat: add navbar with tools dropdown and StreamAid flyout"
```

---

## Task 8: Footer

**Files:**
- Create: `src/lib/components/Footer.svelte`

- [ ] **Step 1: Create Footer.svelte**

```svelte
<!-- src/lib/components/Footer.svelte -->
<footer>
  <div class="inner">
    <div class="brand">
      <a href="/" class="logo">Pandami</a>
      <p>All your social media needs taken care of.</p>
    </div>
    <nav aria-label="Footer navigation">
      <div class="col">
        <span class="col-label">Pages</span>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="col">
        <span class="col-label">Tools</span>
        <a href="https://fx.pandami.net" target="_blank" rel="noopener noreferrer">FX Library</a>
        <a href="https://meme.pandami.net" target="_blank" rel="noopener noreferrer">Meme Library</a>
        <a href="https://streamaid.pandami.net" target="_blank" rel="noopener noreferrer">StreamAid</a>
      </div>
    </nav>
  </div>
  <div class="bottom">
    <p>&copy; {new Date().getFullYear()} Pandami. All rights reserved.</p>
  </div>
</footer>

<style>
  footer {
    background: var(--color-text);
    color: #fff;
    padding: 4rem 1.5rem 0;
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .brand {
    flex: 1;
  }

  .logo {
    font-size: 1.25rem;
    font-weight: 900;
    color: #fff;
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .brand p {
    margin-top: 0.75rem;
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
  }

  nav {
    display: flex;
    gap: 3rem;
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .col-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0.25rem;
  }

  .col a {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: color 150ms ease;
  }

  .col a:hover {
    color: #fff;
  }

  .bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.25rem 0;
  }

  .bottom p {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }

  @media (max-width: 640px) {
    .inner {
      flex-direction: column;
    }

    nav {
      gap: 2rem;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/Footer.svelte
git commit -m "feat: add Footer component"
```

---

## Task 9: Update root layout

**Files:**
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Replace +layout.svelte**

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.bunny.net" />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
```

- [ ] **Step 2: Build and verify no errors**

```bash
pnpm run build
```

Expected: build succeeds with no TypeScript or Svelte errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "feat: integrate Navbar and Footer into root layout"
```

---

## Task 10: Homepage sections

**Files:**
- Create: `src/lib/components/home/Hero.svelte`
- Create: `src/lib/components/home/ProblemSection.svelte`
- Create: `src/lib/components/home/ConsistencySection.svelte`
- Create: `src/lib/components/home/SolutionSection.svelte`
- Create: `src/lib/components/home/ServicesTeaser.svelte`
- Create: `src/lib/components/home/CtaBlock.svelte`

- [ ] **Step 1: Write failing E2E tests for homepage**

```ts
// tests/homepage.e2e.ts
import { test, expect } from '@playwright/test';

test('hero headline and CTAs are visible', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /Social media is a full-time job/ }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get Started' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'See what we do' })).toBeVisible();
});

test('problem section shows headline and task chips', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: "It's not just posting." })).toBeVisible();
  await expect(page.getByText('Planning')).toBeVisible();
  await expect(page.getByText('Discord moderation')).toBeVisible();
  await expect(page.getByText('And you still have a business to run.')).toBeVisible();
});

test('consistency section shows pull-quote and stats', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/The algorithm rewards consistency/)).toBeVisible();
  await expect(page.getByText('10,000+')).toBeVisible();
  await expect(page.getByText('posts published for clients')).toBeVisible();
});

test('solution section shows headline and all six pillar cards', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'You define the goal. We handle everything else.' }),
  ).toBeVisible();
  await expect(page.getByText('Strategy')).toBeVisible();
  await expect(page.getByText('Content Production')).toBeVisible();
  await expect(page.getByText('Scheduling and Posting')).toBeVisible();
  await expect(page.getByText('Community Building')).toBeVisible();
  await expect(page.getByText('Analytics and Reporting')).toBeVisible();
  await expect(page.getByText('Automation')).toBeVisible();
});

test('services teaser shows tiers and link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Everything you need. Nothing you don\'t.')).toBeVisible();
  await expect(page.getByRole('link', { name: /View all services/ })).toBeVisible();
  await expect(page.getByText('Starter')).toBeVisible();
});

test('CTA block is visible at bottom', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Ready to hand it all over?')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start a project' })).toBeVisible();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pnpm run build && pnpm test:e2e tests/homepage.e2e.ts
```

Expected: FAIL — homepage only has the default SvelteKit placeholder content.

- [ ] **Step 3: Create Hero.svelte**

```svelte
<!-- src/lib/components/home/Hero.svelte -->
<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<section class="hero">
  <div class="inner">
    <h1>Social media is a full-time job.<br />Let us work it.</h1>
    <p>
      All your social media needs taken care of. Strategy, content, scheduling, analytics,
      and everything in between.
    </p>
    <div class="ctas">
      <PillButton href="/contact">Get Started</PillButton>
      <PillButton href="#solution" variant="secondary">See what we do</PillButton>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 1.5rem;
    text-align: center;
  }

  .inner {
    max-width: 760px;
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 900;
    color: var(--color-text);
    line-height: 1.08;
    letter-spacing: -0.03em;
    margin: 0 0 1.5rem;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--color-muted);
    line-height: 1.6;
    margin: 0 0 2.5rem;
  }

  .ctas {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
```

- [ ] **Step 4: Create ProblemSection.svelte**

```svelte
<!-- src/lib/components/home/ProblemSection.svelte -->
<script lang="ts">
  import TaskChip from '$lib/components/shared/TaskChip.svelte';

  const tasks = [
    'Planning',
    'Scripting',
    'Recording',
    'Editing',
    'Captioning',
    'Graphic design',
    'Scheduling',
    'Posting',
    'Community management',
    'Discord moderation',
    'Bot setup',
    'Analytics',
    'A/B testing',
    'Strategy revision',
  ];
</script>

<section class="problem">
  <div class="inner">
    <h2>It's not just posting.</h2>
    <p>
      Most people think social media is about showing up and sharing content. The reality is an
      operational system that runs every single day: planning, scripting, recording, editing,
      captioning, scheduling, posting, responding to comments and DMs, watching analytics,
      revising strategy, and doing it all again tomorrow.
    </p>
    <div class="chips">
      {#each tasks as task}
        <TaskChip label={task} />
      {/each}
    </div>
    <p class="closing">And you still have a business to run.</p>
  </div>
</section>

<style>
  .problem {
    padding: 7rem 1.5rem;
    background: #FAFAFA;
  }

  .inner {
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.03em;
    margin: 0 0 1.5rem;
  }

  p {
    font-size: 1.0625rem;
    color: var(--color-muted);
    line-height: 1.7;
    margin: 0 0 2.5rem;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    margin-bottom: 3rem;
  }

  .closing {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    color: var(--color-text);
    text-align: center;
    letter-spacing: -0.02em;
    margin: 0;
  }
</style>
```

- [ ] **Step 5: Create ConsistencySection.svelte**

```svelte
<!-- src/lib/components/home/ConsistencySection.svelte -->
<script lang="ts">
  import StatBlock from '$lib/components/shared/StatBlock.svelte';

  const stats = [
    { value: '10,000+', label: 'posts published for clients' },
    { value: 'Multiple/day', label: 'average publishing cadence' },
    { value: '50+', label: 'brands actively managed' },
    { value: '25M+', label: 'views on YouTube and short-form' },
  ];
</script>

<section class="consistency">
  <div class="inner">
    <blockquote>
      The algorithm rewards consistency. That means posting multiple times a day, every day,
      without missing a beat. Business owners don't have that bandwidth. We do.
    </blockquote>
    <div class="stats">
      {#each stats as stat}
        <StatBlock value={stat.value} label={stat.label} />
      {/each}
    </div>
  </div>
</section>

<style>
  .consistency {
    padding: 7rem 1.5rem;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 900px;
    margin: 0 auto;
  }

  blockquote {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.45;
    letter-spacing: -0.02em;
    margin: 0 0 4rem;
    padding: 0;
    border: none;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 3rem;
  }
</style>
```

- [ ] **Step 6: Create SolutionSection.svelte**

```svelte
<!-- src/lib/components/home/SolutionSection.svelte -->
<script lang="ts">
  import PillarCard from '$lib/components/PillarCard.svelte';
  import { pillars } from '$lib/data/pillars.ts';
</script>

<section id="solution" class="solution">
  <div class="inner">
    <h2>You define the goal. We handle everything else.</h2>
    <div class="grid">
      {#each pillars as pillar}
        <PillarCard {pillar} />
      {/each}
    </div>
  </div>
</section>

<style>
  .solution {
    padding: 7rem 1.5rem;
  }

  .inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  h2 {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.03em;
    margin: 0 0 3.5rem;
    max-width: 600px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 560px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 7: Create ServicesTeaser.svelte**

```svelte
<!-- src/lib/components/home/ServicesTeaser.svelte -->
<script lang="ts">
  import { tiers } from '$lib/data/services.ts';
</script>

<section class="teaser">
  <div class="inner">
    <div class="left">
      <h2>Everything you need. Nothing you don't.</h2>
      <p>
        Whether you need a full managed presence or just content production, we have a package
        built for your stage of growth.
      </p>
      <a href="/services" class="link">View all services and pricing &rarr;</a>
    </div>
    <div class="right" aria-hidden="true">
      {#each tiers as tier}
        <span class="tier-name">{tier.name}</span>
      {/each}
    </div>
  </div>
</section>

<style>
  .teaser {
    padding: 7rem 1.5rem;
    background: #FAFAFA;
  }

  .inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  h2 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.02em;
    margin: 0 0 1rem;
  }

  p {
    font-size: 1.0625rem;
    color: var(--color-muted);
    line-height: 1.7;
    margin: 0 0 1.5rem;
  }

  .link {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-accent);
    text-decoration: none;
    transition: opacity 150ms ease;
  }

  .link:hover {
    opacity: 0.8;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tier-name {
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.03em;
    opacity: 0.12;
    line-height: 1.1;
    transition: opacity 150ms ease, color 150ms ease;
    cursor: default;
    user-select: none;
  }

  .tier-name:hover {
    opacity: 1;
    color: var(--color-accent);
  }

  @media (max-width: 768px) {
    .inner {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
</style>
```

- [ ] **Step 8: Create CtaBlock.svelte**

```svelte
<!-- src/lib/components/home/CtaBlock.svelte -->
<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<section class="cta">
  <div class="inner">
    <h2>Ready to hand it all over?</h2>
    <PillButton href="/contact" variant="inverted">Start a project</PillButton>
  </div>
</section>

<style>
  .cta {
    padding: 7rem 1.5rem;
    background: var(--color-text);
    text-align: center;
  }

  .inner {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.03em;
    margin: 0;
  }
</style>
```

- [ ] **Step 9: Assemble homepage in +page.svelte**

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte';
  import ProblemSection from '$lib/components/home/ProblemSection.svelte';
  import ConsistencySection from '$lib/components/home/ConsistencySection.svelte';
  import SolutionSection from '$lib/components/home/SolutionSection.svelte';
  import ServicesTeaser from '$lib/components/home/ServicesTeaser.svelte';
  import CtaBlock from '$lib/components/home/CtaBlock.svelte';
</script>

<svelte:head>
  <title>Pandami — All your social media needs taken care of</title>
  <meta
    name="description"
    content="Pandami is a full-service social media agency. Strategy, content, scheduling, analytics, community building, and automation. You define the goal, we handle everything else."
  />
</svelte:head>

<Hero />
<ProblemSection />
<ConsistencySection />
<SolutionSection />
<ServicesTeaser />
<CtaBlock />
```

- [ ] **Step 10: Build and run the homepage E2E tests**

```bash
pnpm run build && pnpm test:e2e tests/homepage.e2e.ts
```

Expected: PASS — 6 tests passing.

- [ ] **Step 11: Commit**

```bash
git add src/lib/components/home/ src/routes/+page.svelte tests/homepage.e2e.ts
git commit -m "feat: add homepage sections and assembly"
```

---

## Task 11: Services page

**Files:**
- Create: `src/routes/services/+page.svelte`

- [ ] **Step 1: Write the failing E2E test**

```ts
// Add to tests/navigation.e2e.ts (append to file)

test('services page shows headline and all six pillar sections', async ({ page }) => {
  await page.goto('/services');
  await expect(page.getByRole('heading', { name: 'What we take off your plate.' })).toBeVisible();
  await expect(page.getByText('Strategy')).toBeVisible();
  await expect(page.getByText('Community Building')).toBeVisible();
  await expect(page.getByText('Discord Servers')).toBeVisible();
});

test('services page shows three pricing tiers', async ({ page }) => {
  await page.goto('/services');
  await expect(page.getByText('Starter')).toBeVisible();
  await expect(page.getByText('Growth')).toBeVisible();
  await expect(page.getByText('Full Service')).toBeVisible();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pnpm run build && pnpm test:e2e tests/navigation.e2e.ts
```

Expected: FAIL on the two new services tests.

- [ ] **Step 3: Create services/+page.svelte**

```svelte
<!-- src/routes/services/+page.svelte -->
<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
  import { pillars } from '$lib/data/pillars.ts';
  import { tiers } from '$lib/data/services.ts';
</script>

<svelte:head>
  <title>Services — Pandami</title>
  <meta
    name="description"
    content="Full-service social media management. Explore Pandami's service pillars and pricing tiers."
  />
</svelte:head>

<div class="page">
  <header class="page-header">
    <div class="inner">
      <h1>What we take off your plate.</h1>
      <p>Every pillar, every platform, fully managed.</p>
    </div>
  </header>

  <section class="pillars">
    <div class="inner">
      {#each pillars as pillar}
        <div class="pillar-block" id={pillar.id}>
          <div class="pillar-header">
            <h2>{pillar.label}</h2>
            <p>{pillar.description}</p>
          </div>
          {#if pillar.subItems && pillar.subItems.length > 0}
            <div class="sub-items">
              {#each pillar.subItems as item}
                <div class="sub-item">
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </section>

  <section class="pricing">
    <div class="inner">
      <h2>Pricing</h2>
      <p class="pricing-note">
        Replace "from $X/mo" with real prices before going live.
      </p>
      <div class="tiers">
        {#each tiers as tier, i}
          <div class="tier-card" class:featured={i === 2}>
            <h3>{tier.name}</h3>
            <p class="tagline">{tier.tagline}</p>
            <div class="price">{tier.price}</div>
            <ul class="features">
              <li>{tier.platforms}</li>
              <li>Turnaround: {tier.turnaround}</li>
              {#each tier.pillarIds as id}
                {@const pillar = pillars.find((p) => p.id === id)}
                {#if pillar}
                  <li>{pillar.label}</li>
                {/if}
              {/each}
            </ul>
            <PillButton href="/contact">Get started</PillButton>
          </div>
        {/each}
      </div>
    </div>
  </section>
</div>

<style>
  .page {
    padding-top: 0;
  }

  .page-header {
    padding: 6rem 1.5rem 5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .page-header h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.03em;
    margin: 0 0 1rem;
  }

  .page-header p {
    font-size: 1.25rem;
    color: var(--color-muted);
    margin: 0;
  }

  .pillars {
    padding: 0 1.5rem 6rem;
  }

  .pillar-block {
    padding: 3.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .pillar-block:first-child {
    padding-top: 4rem;
  }

  .pillar-header h2 {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--color-text);
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
  }

  .pillar-header p {
    font-size: 1.0625rem;
    color: var(--color-muted);
    line-height: 1.7;
    margin: 0;
    max-width: 640px;
  }

  .sub-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin-top: 2rem;
  }

  .sub-item {
    padding: 1.5rem;
    background: #FAFAFA;
    border-radius: 0.75rem;
    border: 1px solid var(--color-border);
  }

  .sub-item h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.5rem;
  }

  .sub-item p {
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.6;
    margin: 0;
  }

  .pricing {
    background: #FAFAFA;
    padding: 5rem 1.5rem 6rem;
    border-top: 1px solid var(--color-border);
  }

  .pricing h2 {
    font-size: 2rem;
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.03em;
    margin: 0 0 0.5rem;
  }

  .pricing-note {
    font-size: 0.9375rem;
    color: var(--color-muted);
    margin: 0 0 3rem;
  }

  .tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    align-items: start;
  }

  .tier-card {
    background: #fff;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tier-card.featured {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 1px var(--color-accent);
  }

  .tier-card h3 {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--color-text);
    margin: 0;
  }

  .tagline {
    font-size: 0.9375rem;
    color: var(--color-muted);
    margin: 0;
    line-height: 1.5;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-accent);
    letter-spacing: -0.02em;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .features li {
    font-size: 0.9375rem;
    color: var(--color-text);
    padding-left: 1.5rem;
    position: relative;
  }

  .features li::before {
    content: '\2713';
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: 700;
  }

  @media (max-width: 900px) {
    .tiers {
      grid-template-columns: 1fr;
    }

    .sub-items {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 4: Build and run the tests to verify they pass**

```bash
pnpm run build && pnpm test:e2e tests/navigation.e2e.ts
```

Expected: PASS — all 8 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/routes/services/+page.svelte
git commit -m "feat: add services page with pillar sections and pricing tiers"
```

---

## Task 12: Contact page and form action

**Files:**
- Create: `src/routes/contact/+page.svelte`
- Create: `src/routes/contact/+page.server.ts`

- [ ] **Step 1: Set up environment variables**

Create a `.env` file at the project root:

```
# src/.env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your@email.com
```

Add `.env` to `.gitignore` (it likely already is):

```bash
grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore
```

- [ ] **Step 2: Write the failing E2E tests**

```ts
// tests/contact.e2e.ts
import { test, expect } from '@playwright/test';

test('contact page renders the form with all fields', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { name: "Let's talk." })).toBeVisible();
  await expect(page.getByLabel('Name *')).toBeVisible();
  await expect(page.getByLabel('Email *')).toBeVisible();
  await expect(page.getByRole('group', { name: /What do you need help with/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
});

test('form shows validation when required fields are empty', async ({ page }) => {
  await page.goto('/contact');
  // Click submit without filling fields — HTML5 required kicks in
  await page.getByRole('button', { name: 'Send message' }).click();
  // Browser should keep focus on the first required field
  await expect(page.getByLabel('Name *')).toBeFocused();
});

test('form submits successfully with valid data', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name *').fill('Jane Smith');
  await page.getByLabel('Email *').fill('jane@example.com');
  await page.getByLabel('Strategy').check();
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Message received.')).toBeVisible({ timeout: 5000 });
});

test('form shows server error on missing service selection', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name *').fill('Jane Smith');
  await page.getByLabel('Email *').fill('jane@example.com');
  // Disable HTML5 validation to test server-side error
  await page.evaluate(() => {
    document.querySelector('form')?.setAttribute('novalidate', '');
  });
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Please select at least one service.')).toBeVisible({ timeout: 5000 });
});
```

- [ ] **Step 3: Run the tests to verify they fail**

```bash
pnpm run build && pnpm test:e2e tests/contact.e2e.ts
```

Expected: FAIL — `/contact` returns a 404.

- [ ] **Step 4: Create contact/+page.server.ts**

```ts
// src/routes/contact/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name')?.toString().trim() ?? '';
    const email = data.get('email')?.toString().trim() ?? '';
    const company = data.get('company')?.toString().trim() ?? '';
    const services = data.getAll('services').map(String);
    const budget = data.get('budget')?.toString() ?? '';
    const message = data.get('message')?.toString().trim() ?? '';

    if (!name) {
      return fail(400, { error: 'Name is required.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { error: 'A valid email address is required.' });
    }

    if (services.length === 0) {
      return fail(400, { error: 'Please select at least one service.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (apiKey && toEmail) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        `Services: ${services.join(', ')}`,
        budget ? `Budget: ${budget}` : null,
        message ? `Message:\n${message}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      const { error } = await resend.emails.send({
        from: 'website@pandami.net',
        to: toEmail,
        replyTo: email,
        subject: `New inquiry from ${name}`,
        text: body,
      });

      if (error) {
        console.error('[Resend error]', error);
        return fail(500, { error: 'Could not send your message. Please try again.' });
      }
    } else {
      // Dev mode: log to console when email is not configured
      console.log('[Contact form submission]', {
        name,
        email,
        company,
        services,
        budget,
        message,
      });
    }

    return { success: true };
  },
};
```

- [ ] **Step 5: Create contact/+page.svelte**

```svelte
<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();

  const serviceOptions = [
    { id: 'strategy', label: 'Strategy' },
    { id: 'content', label: 'Content Production' },
    { id: 'scheduling', label: 'Scheduling and Posting' },
    { id: 'community', label: 'Community Building and Discord' },
    { id: 'analytics', label: 'Analytics and Reporting' },
    { id: 'automation', label: 'Automation' },
  ];

  const budgetOptions = [
    'Under $500',
    '$500 - $1,500',
    '$1,500 - $5,000',
    '$5,000+',
    'Not sure yet',
  ];
</script>

<svelte:head>
  <title>Contact — Pandami</title>
  <meta
    name="description"
    content="Start a project with Pandami. Tell us what you need and we will get back to you within one business day."
  />
</svelte:head>

<div class="page">
  <div class="inner">
    <header>
      <h1>Let's talk.</h1>
      <p>Tell us what you need and we will get back to you within one business day.</p>
    </header>

    {#if form?.success}
      <div class="success" role="alert">
        <h2>Message received.</h2>
        <p>We will be in touch shortly.</p>
      </div>
    {:else}
      <form method="POST" use:enhance>
        {#if form?.error}
          <div class="error" role="alert">{form.error}</div>
        {/if}

        <div class="field">
          <label for="name">Name *</label>
          <input id="name" name="name" type="text" required autocomplete="name" />
        </div>

        <div class="field">
          <label for="email">Email *</label>
          <input id="email" name="email" type="email" required autocomplete="email" />
        </div>

        <div class="field">
          <label for="company">Company or brand name</label>
          <input id="company" name="company" type="text" autocomplete="organization" />
        </div>

        <fieldset>
          <legend>What do you need help with? *</legend>
          <div class="checkboxes">
            {#each serviceOptions as option}
              <label class="checkbox-label">
                <input type="checkbox" name="services" value={option.id} />
                {option.label}
              </label>
            {/each}
          </div>
        </fieldset>

        <div class="field">
          <label for="budget">Monthly budget range</label>
          <select id="budget" name="budget">
            <option value="">Prefer not to say</option>
            {#each budgetOptions as opt}
              <option value={opt}>{opt}</option>
            {/each}
          </select>
        </div>

        <div class="field">
          <label for="message">Anything else to add?</label>
          <textarea id="message" name="message" rows={5}></textarea>
        </div>

        <button type="submit" class="submit">Send message</button>
      </form>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: 6rem 1.5rem;
    min-height: calc(100svh - 64px);
  }

  .inner {
    max-width: 640px;
    margin: 0 auto;
  }

  header {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.03em;
    margin: 0 0 0.75rem;
  }

  header p {
    font-size: 1.0625rem;
    color: var(--color-muted);
    margin: 0;
    line-height: 1.6;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text);
  }

  input,
  select,
  textarea {
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    font-size: 1rem;
    font-family: inherit;
    color: var(--color-text);
    background: #fff;
    transition: border-color 150ms ease;
    width: 100%;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  textarea {
    resize: vertical;
  }

  fieldset {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem 1.25rem;
  }

  legend {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text);
    padding: 0 0.25rem;
  }

  .checkboxes {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin-top: 0.75rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.9375rem;
    font-weight: 400;
    color: var(--color-text);
    cursor: pointer;
  }

  .checkbox-label input[type='checkbox'] {
    width: auto;
    accent-color: var(--color-accent);
    cursor: pointer;
  }

  .submit {
    padding: 0.875rem 2rem;
    background: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 150ms ease;
    align-self: flex-start;
  }

  .submit:hover {
    background: var(--color-accent-hover);
  }

  .error {
    padding: 0.875rem 1rem;
    background: #FEF2F2;
    border: 1px solid #FECACA;
    border-radius: 0.5rem;
    color: var(--color-accent);
    font-size: 0.9375rem;
    font-weight: 500;
  }

  .success {
    padding: 2.5rem;
    background: #F0FDF4;
    border: 1px solid #BBF7D0;
    border-radius: 0.75rem;
    text-align: center;
  }

  .success h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #166534;
    margin: 0 0 0.5rem;
  }

  .success p {
    color: #166534;
    margin: 0;
  }
</style>
```

- [ ] **Step 6: Build and run the contact E2E tests**

```bash
pnpm run build && pnpm test:e2e tests/contact.e2e.ts
```

Expected: PASS — 4 tests passing. Note: the success test passes because when `RESEND_API_KEY` is not set in the build/preview environment, the action logs to console and returns `{ success: true }`.

- [ ] **Step 7: Run the full test suite**

```bash
pnpm run build && pnpm test:e2e
```

Expected: PASS — all tests in `tests/homepage.e2e.ts`, `tests/navigation.e2e.ts`, and `tests/contact.e2e.ts` passing.

- [ ] **Step 8: Commit**

```bash
git add src/routes/contact/ tests/contact.e2e.ts
git commit -m "feat: add contact page with form action and E2E tests"
```

---

## Task 13: Run all unit tests and final build check

- [ ] **Step 1: Run all unit tests**

```bash
pnpm test:unit
```

Expected: PASS — pillars (4), streamers (2), services (3) = 9 tests passing.

- [ ] **Step 2: Run the full E2E suite**

```bash
pnpm run build && pnpm test:e2e
```

Expected: all tests passing across all three test files.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final build verification — all tests passing"
```

---

## Post-Launch Checklist (not part of the plan, but required before going live)

- Replace all `from $X/mo` in `src/lib/data/services.ts` with real prices
- Replace placeholder proof-point numbers in `ConsistencySection.svelte`
- Set `RESEND_API_KEY` and `CONTACT_EMAIL` in your production environment
- Add the Meme Library subdomain URL to `ToolsDropdown.svelte` and `MobileMenu.svelte`
- Populate `streamers` array in `src/lib/data/streamers.ts` with real streamer entries
- Set up the `pandami.net` DNS and deploy via the adapter of your choice
