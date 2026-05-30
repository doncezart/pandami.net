# Pandami Website Design Spec

**Date:** 2026-05-30  
**Project:** pandami.net  
**Stack:** SvelteKit 2 + Svelte 5 + Tailwind CSS 4 + TypeScript  
**Language:** English only  

---

## 1. Overview

Pandami is a full-service social media agency. The website's job is to convert overwhelmed business owners into inquiry submissions. It does this through a results-based narrative: first make the visitor feel the weight of what running social media actually demands, then show that Pandami removes every piece of that burden.

The design language mirrors diffusion.studio: clean, minimal, light theme, heavy whitespace, sharp typographic hierarchy. Color palette is white and black with red as the sole accent color for CTAs and highlights.

---

## 2. Site Structure

| Route | Page |
|---|---|
| `/` | Homepage |
| `/services` | Services with pricing |
| `/contact` | Contact and inquiry form |

All tool properties (FX Library, Meme Library, StreamAid streamers) are separate subdomains and are not built within this repo. They are linked externally from the navbar.

---

## 3. Navigation

### Navbar

The navbar is sticky, white background, thin bottom border. Contents from left to right:

- **Logo:** "Pandami" wordmark in bold black
- **Tools** (dropdown trigger)
- **Services** (link to `/services`)
- **Contact** (link to `/contact`)
- **Get Started** (pill-shaped red button, links to `/contact`)

### Tools Dropdown

Opens on hover or click. Three items:

| Item | Description | Behavior |
|---|---|---|
| **FX Library** | Browse visual and sound effects | Links to `fx.pandami.net` (new tab) |
| **Meme Library** | Ready-to-use meme formats for any niche | Links to meme subdomain (new tab) |
| **StreamAid** | Support your favorite partnered streamers | Opens a flyout submenu to the right |

### StreamAid Flyout Submenu

When the user hovers or clicks StreamAid, a secondary panel opens to the right of the dropdown. It contains one button per partnered streamer. Each button links to that streamer's subdomain (e.g., `streamername.pandami.net`) in a new tab. The list of streamers is data-driven from a config array in the codebase so new streamers can be added without touching component markup.

---

## 4. Homepage

### 4.1 Hero

Full-viewport-height section. White background. Content is centered vertically and horizontally.

**Headline (large, black, heavy weight):**
> "Social media is a full-time job. Let us work it."

**Subline (medium, gray, regular weight):**
> "All your social media needs taken care of. Strategy, content, scheduling, analytics, and everything in between."

**Two CTAs below the subline:**
- `Get Started` (red pill button, primary)
- `See what we do` (ghost/outline button, secondary, scrolls to the Solution section)

No hero image or illustration. The whitespace and typography carry the section, consistent with the diffusion.studio reference.

---

### 4.2 Problem Section: "It's not just posting."

**Section headline:** "It's not just posting."

**Body copy (short paragraph):**
> "Most people think social media is about showing up and sharing content. The reality is an operational system that runs every single day: planning, scripting, recording, editing, captioning, scheduling, posting, responding to comments and DMs, watching analytics, revising strategy, and doing it all again tomorrow."

**Visual element:** A horizontal scrolling row (on mobile: vertical list) of labelled task chips, rendered in light gray rounded tags:

`Planning` `Scripting` `Recording` `Editing` `Captioning` `Graphic design` `Scheduling` `Posting` `Community management` `Discord moderation` `Bot setup` `Analytics` `A/B testing` `Strategy revision`

**Closing line (large, bold, centered below the chips):**
> "And you still have a business to run."

---

### 4.3 Consistency Statement and Proof Points

**Section headline (large pull-quote style):**
> "The algorithm rewards consistency. That means posting multiple times a day, every day, without missing a beat. Business owners don't have that bandwidth. We do."

Below the pull-quote, a horizontal stat bar with four proof points. Each stat is a large red number followed by a black label:

| Stat (placeholder) | Label |
|---|---|
| `10,000+` | posts published for clients |
| `Multiple/day` | average publishing cadence |
| `50+ brands` | actively managed |
| `25M+ views` | generated on YouTube and short-form |

The "Multiple/day" stat is the anchor. It makes the consistency argument concrete and distinguishes Pandami from a client who posts once a week by themselves.

> **Note for owner:** Replace placeholder numbers with real figures before launch. The cadence stat can stay as-is since it describes the practice rather than a total.

---

### 4.4 Solution Section: "You define the goal. We handle everything else."

**Section headline:** "You define the goal. We handle everything else."

**Layout:** Card grid (3 columns on desktop, 2 on tablet, 1 on mobile). Each card has a small red icon, a bold label, and a one-sentence description.

| Label | Description |
|---|---|
| **Strategy** | We research your niche, audience, and competitors before a single post goes out. |
| **Content Production** | Scripting, recording direction, editing, thumbnails. Delivered ready to publish. |
| **Scheduling and Posting** | We manage the calendar and hit publish. You don't lift a finger. |
| **Community Building** | From social comments and DMs to full Discord server setup, moderation, bots, and automations. We build and run the community around your brand. |
| **Analytics and Reporting** | We watch the numbers and report back on what is actually working. |
| **Automation** | Workflows and tools that scale what is working without scaling the cost. |

---

### 4.5 Services Teaser

Two-column layout. Left side: headline and a short paragraph. Right side: a vertical list of service tier names in large minimal type.

**Left headline:** "Everything you need. Nothing you don't."

**Left body:**
> "Whether you need a full managed presence or just content production, we have a package built for your stage of growth."

**Right side (tier names, large type):** Starter / Growth / Full Service (or whatever tiers are defined on the Services page)

**CTA below the two columns:** `View all services and pricing` (text link with arrow)

---

### 4.6 CTA Block

Full-width section with a black background. Content centered.

**Headline (white, large):** "Ready to hand it all over?"

**Button:** `Start a project` (white background, black text, pill-shaped)

Links to `/contact`.

---

## 5. Services Page

The Services page leads with the same results-based framing: what the client stops having to do, not just what Pandami delivers.

**Page headline:** "What we take off your plate."

**Structure:** Services are grouped into the pillars from the Solution section. Each pillar section has:
- A bold category label
- A one-paragraph description of what it covers and what the client no longer has to think about
- A pricing tier table or card row beneath it

**Community Building pillar** gets expanded treatment on this page. Under the pillar heading, two sub-sections are listed:

1. **Social Media Communities** -- responding to comments, managing DMs, fostering engagement across platforms
2. **Discord Servers** -- full server creation, channel architecture, role structure, moderation rules, custom bots, and ongoing moderation. Clients who want a Discord community around their brand get a complete managed solution: Pandami sets it up from scratch and keeps it running.

**Pricing tiers** (names and amounts are placeholders, to be filled in by owner):

| Tier | Who it is for | Price |
|---|---|---|
| Starter | Brands starting out, one platform | from $X/mo |
| Growth | Established brands scaling across two or more platforms | from $X/mo |
| Full Service | Complete handoff, all platforms, all pillars | from $X/mo |

Pricing cards show: included pillars (checkmarks), platform count, turnaround time, and a CTA button to `/contact`.

---

## 6. Contact Page

**Page headline:** "Let's talk."

**Form fields:**

| Field | Type | Required |
|---|---|---|
| Name | Text input | Yes |
| Email | Email input | Yes |
| Company or brand name | Text input | No |
| What do you need help with? | Multi-select checkboxes (the pillars: Strategy, Content Production, Scheduling and Posting, Community Building and Discord, Analytics and Reporting, Automation) | Yes (at least one) |
| Monthly budget range | Select dropdown | No |
| Anything else to add? | Textarea | No |

**Budget range options:** Under $500 / $500-$1,500 / $1,500-$5,000 / $5,000+ / Not sure yet

**Submission:** SvelteKit form action (no third-party form service). On success, the page shows a confirmation message inline without a redirect. The form sends an email or writes to a backend endpoint (implementation detail for the plan).

---

## 7. Visual Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-text` | `#0A0A0A` | Headlines, body copy |
| `--color-muted` | `#6B7280` | Sublines, secondary text |
| `--color-border` | `#E5E7EB` | Borders, dividers |
| `--color-accent` | `#DC2626` | CTAs, stat numbers, icon accents |
| `--color-accent-hover` | `#B91C1C` | Hover state for red elements |

### Typography

- **Headlines:** 700-900 weight, tight tracking, black
- **Body:** 400-500 weight, relaxed line height, dark gray
- **Stat numbers:** 700 weight, red
- Font family: system font stack or Inter (TBD during implementation)

### Spacing

Generous vertical padding between sections (80px-120px on desktop). Sections do not bleed into each other. Whitespace is used intentionally as a design element.

### Components

- **Pill button:** Fully rounded, red fill (primary) or outlined (secondary), hover darkens fill
- **Task chip:** Rounded tag, light gray background, small body text
- **Stat block:** Large number (red) stacked above label (black)
- **Pillar card:** White background, thin border, red icon top-left, bold label, body copy
- **Navbar dropdown:** White background, box shadow, appears on hover with a short fade-in transition
- **StreamAid flyout:** Appears to the right of the dropdown panel, lists streamer buttons that link to their respective subdomains

---

## 8. Component and File Structure

```
src/
  routes/
    +layout.svelte          # Global layout with navbar and footer
    +page.svelte            # Homepage (composes section components)
    services/
      +page.svelte          # Services and pricing
    contact/
      +page.svelte          # Contact form
      +page.server.ts       # Form action
  lib/
    components/
      nav/
        Navbar.svelte
        ToolsDropdown.svelte
        StreamAidFlyout.svelte
      home/
        Hero.svelte
        ProblemSection.svelte
        ConsistencySection.svelte
        SolutionSection.svelte
        ServicesTeaser.svelte
        CtaBlock.svelte
      shared/
        PillButton.svelte
        PillarCard.svelte
        StatBlock.svelte
        TaskChip.svelte
    data/
      streamers.ts          # Config array: { name, subdomain } per streamer
      pillars.ts            # Six pillar definitions reused across pages
      services.ts           # Pricing tiers and included features
```

---

## 9. Data Config

Streamers, pillars, and pricing tiers are defined as typed config arrays in `src/lib/data/`. This means content changes (adding a streamer, updating a price) only require editing a data file, not touching component markup.

**`streamers.ts` shape:**
```ts
export type Streamer = { name: string; subdomain: string };
export const streamers: Streamer[] = [
  // { name: 'StreamerName', subdomain: 'streamername.pandami.net' }
];
```

**`pillars.ts` shape:**
```ts
export type Pillar = { id: string; label: string; description: string; icon: string };
```

The Community Building pillar carries an optional `subItems` field for use on the Services page:
```ts
export type PillarSubItem = { label: string; description: string };
export type Pillar = {
  id: string;
  label: string;
  description: string;
  icon: string;
  subItems?: PillarSubItem[];
};
```

---

## 10. Out of Scope

- Blog
- About/Team page
- Individual tool pages (FX Library, Meme Library, StreamAid streamer pages are separate projects)
- Authentication or client portal
- CMS integration
- Animations beyond simple CSS transitions
