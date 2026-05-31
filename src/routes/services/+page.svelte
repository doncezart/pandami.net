<script lang="ts">
  import CtaBlock from '$lib/components/home/CtaBlock.svelte';

  const serviceBlocks = [
    {
      label: 'Strategy and Research',
      heading: 'Research shapes every decision.',
      description:
        'We start by understanding your position, your audience, and your competition. Every decision we make is grounded in data, not guesswork.',
      items: [
        {
          title: 'Page performance audit',
          body: 'A complete review of every active platform. Content performance, audience quality, and presence health measured to establish a clear baseline.',
        },
        {
          title: 'Competitor review',
          body: 'A structured look at who else is in your space. What they publish, how their audience responds, and where they are leaving gaps you can fill.',
        },
        {
          title: 'Brand positioning',
          body: 'We define how your brand sounds and looks across platforms. Tone, visual identity, and messaging that holds together no matter where someone finds you.',
        },
        {
          title: 'Content strategy',
          body: 'A content plan built around your goals and your audience. Content pillars, formats, posting cadence, and platform priorities all defined.',
        },
        {
          title: 'Strategy refinement',
          body: 'Social media performance data shifts constantly. We review results monthly and adjust the strategy to keep it working as conditions change.',
        },
        {
          title: 'Trend-responsive content',
          body: 'When something relevant breaks in your space, we respond with content while the moment still matters. Speed is the advantage here.',
        },
      ],
    },
    {
      label: 'Content Production',
      heading: 'We produce the content. You focus on the business.',
      description:
        'From reactive short clips to long-form video and platform-specific visuals. Everything produced, edited, and ready to publish.',
      items: [
        {
          title: 'Short-form video',
          body: 'Reels, TikToks, and YouTube Shorts produced for platform algorithms. Scripted or reactive, optimised for the first three seconds.',
        },
        {
          title: 'Long-form video',
          body: 'Structured longer content for YouTube and similar platforms. Planned, scripted, filmed, or edited depending on what your setup allows.',
        },
        {
          title: 'Carousels and static posts',
          body: 'Slide decks, infographics, and single-image posts that communicate clearly and encourage saves and shares.',
        },
        {
          title: 'Auxiliary assets',
          body: 'Thumbnails, story previews, highlight reels, and supporting visuals. Everything that makes your main content perform better.',
        },
        {
          title: 'Scheduling',
          body: 'Every piece of content queued at the right time for your audience. We manage the calendar so nothing slips.',
        },
        {
          title: 'On-site production',
          body: 'For brands that need real footage, we come to you. Shoots planned and executed on location, working around your schedule.',
        },
      ],
    },
    {
      label: 'Community',
      heading: 'Your audience is talking. Make sure someone is listening.',
      description:
        'Community management is the part most businesses cut first when things get busy. We keep it consistent, on-brand, and genuinely engaged.',
      items: [
        {
          title: 'Comment moderation and replies',
          body: 'Every comment on every post reviewed. We moderate, respond in your brand voice, and flag anything that requires your attention.',
        },
        {
          title: 'DM handling',
          body: 'Inbound messages handled within the agreed response window. Automated where it makes sense, personal where it matters.',
        },
        {
          title: 'Proactive engagement',
          body: 'We engage in relevant conversations before your audience comes to you. Builds visibility and credibility without any ad spend.',
        },
        {
          title: 'Community funneling',
          body: 'Building and managing owned communities on Discord, Telegram, or other platforms. Turns social followers into an audience you actually control.',
        },
      ],
    },
    {
      label: 'Reporting',
      heading: 'Every number connected to a decision.',
      description:
        'We aggregate performance data from all active platforms and turn it into something you can act on. Regular reports focused on what matters.',
      items: [
        {
          title: 'Analytics aggregation',
          body: 'Performance data collected from all platforms in one place. No more switching between five dashboards to get a full picture.',
        },
        {
          title: 'Growth insights',
          body: 'Follower trends, reach patterns, and engagement rates explained in plain language. What is growing, what is slipping, and why.',
        },
        {
          title: 'Funnel performance tracking',
          body: 'We track how social activity connects to real outcomes. Click-through rates, lead generation, and conversions where measurement is possible.',
        },
      ],
    },
    {
      label: 'Cross-Platform Marketing',
      heading: 'Content that works harder by working everywhere.',
      description:
        'A YouTube video does not have to live only on YouTube. We extend the reach of every piece of content across every platform where your audience exists.',
      items: [
        {
          title: 'Content repurposing',
          body: 'Long-form video becomes short clips. Podcasts become quote cards. A single piece of content becomes five, each built for a different audience.',
        },
        {
          title: 'Multi-platform publishing',
          body: 'The same content adapted and published across platforms simultaneously. Format-native so it never feels like an afterthought.',
        },
        {
          title: 'Platform-specific adaptation',
          body: 'Content built for one platform restructured to fit another. Proper adaptation, not copy-paste. The format changes, the message does not.',
        },
      ],
    },
  ];

  const standaloneServices = [
    {
      name: 'Video editing',
      desc: 'Platform-ready editing with captions, music, and sound design for any format or platform.',
    },
    {
      name: 'Podcast editing',
      desc: 'Full episode edit with intro, outro, and chapter markers. Clean audio, no filler.',
    },
    {
      name: 'Profile optimisation',
      desc: 'Bio, highlights, link-in-bio, cover images, and a first-impression audit across all active platforms.',
    },
    {
      name: 'Content strategy session',
      desc: 'A focused session to map out your 90-day content direction, posting framework, and platform priorities.',
    },
    {
      name: 'Social media automations',
      desc: 'Scheduling workflows, auto-responses, and trigger sequences that run without daily input from your team.',
    },
    {
      name: 'Graphic design package',
      desc: 'A monthly batch of branded templates, static posts, and story assets built to your visual identity.',
    },
    {
      name: 'Discord or Telegram server setup',
      desc: 'Full server build including structure, bots, roles, rules, and a smooth onboarding flow for new members.',
    },
  ];

  const tablePlans = [
    { name: 'Audit', price: '\u20ac200', priceSub: 'one-time', featured: false, cta: 'Get started' },
    { name: 'Foundation', price: '\u20ac799', priceSub: '/ month', featured: false, cta: 'Get started' },
    { name: 'Growth', price: '\u20ac1,499', priceSub: '/ month', featured: true, cta: 'Get started' },
    { name: 'Enterprise', price: 'Custom', priceSub: '', featured: false, cta: 'Inquire' },
  ];

  const planKeys = ['audit', 'foundation', 'growth', 'enterprise'] as const;

  const tableGroups: {
    name: string;
    rows: { feature: string; audit: boolean; foundation: boolean; growth: boolean; enterprise: boolean }[];
  }[] = [
    {
      name: 'Production',
      rows: [
        { feature: 'Content creation', audit: false, foundation: true, growth: true, enterprise: true },
        { feature: 'Auxiliary assets', audit: false, foundation: false, growth: true, enterprise: true },
        { feature: 'Scheduling', audit: false, foundation: true, growth: true, enterprise: true },
        { feature: 'On-site production', audit: false, foundation: false, growth: false, enterprise: true },
      ],
    },
    {
      name: 'Strategy and Research',
      rows: [
        { feature: 'Page performance audit', audit: true, foundation: true, growth: true, enterprise: true },
        { feature: 'Competitor review', audit: true, foundation: false, growth: true, enterprise: true },
        { feature: 'Brand positioning', audit: false, foundation: true, growth: true, enterprise: true },
        { feature: 'Content strategy', audit: false, foundation: true, growth: true, enterprise: true },
        { feature: 'Strategy refinement', audit: false, foundation: false, growth: true, enterprise: true },
        { feature: 'Trend-responsive content', audit: false, foundation: false, growth: true, enterprise: true },
      ],
    },
    {
      name: 'Community',
      rows: [
        { feature: 'Comment moderation and replies', audit: false, foundation: false, growth: true, enterprise: true },
        { feature: 'DM handling', audit: false, foundation: false, growth: true, enterprise: true },
        { feature: 'Proactive engagement', audit: false, foundation: false, growth: true, enterprise: true },
        { feature: 'Community funneling', audit: false, foundation: false, growth: false, enterprise: true },
      ],
    },
    {
      name: 'Reporting',
      rows: [
        { feature: 'Analytics aggregation', audit: true, foundation: true, growth: true, enterprise: true },
        { feature: 'Growth insights', audit: false, foundation: false, growth: true, enterprise: true },
        { feature: 'Funnel performance tracking', audit: false, foundation: false, growth: true, enterprise: true },
      ],
    },
    {
      name: 'Cross-Platform',
      rows: [
        { feature: 'Multi-platform publishing', audit: false, foundation: true, growth: true, enterprise: true },
        { feature: 'Content repurposing', audit: false, foundation: false, growth: true, enterprise: true },
        { feature: 'Platform-specific adaptation', audit: false, foundation: false, growth: true, enterprise: true },
      ],
    },
  ];
</script>

<svelte:head>
  <title>Services | Pandami</title>
  <meta name="description" content="From page audits to full production and community management. See exactly what each plan covers." />
  <link rel="canonical" href="https://pandami.net/services" />
  <meta property="og:title" content="Services | Pandami" />
  <meta property="og:description" content="From page audits to full production and community management. See exactly what each plan covers." />
  <meta property="og:url" content="https://pandami.net/services" />
  <meta name="twitter:title" content="Services | Pandami" />
  <meta name="twitter:description" content="From page audits to full production and community management. See exactly what each plan covers." />
</svelte:head>

<main id="main-content">
  <section class="page-hero">
  <div class="inner">
    <p class="eyebrow">Services</p>
    <h1 class="headline">Social media, fully handled.</h1>
    <p class="sub">
      From the initial audit to daily publishing and community management.
      Pick the level of involvement that fits where your business is right now.
    </p>
  </div>
</section>

{#each serviceBlocks as block}
  <section class="service-block">
    <div class="inner split">
      <div class="block-left">
        <p class="label">{block.label}</p>
        <h2 class="block-heading">{block.heading}</h2>
        <p class="block-desc">{block.description}</p>
      </div>
      <div class="block-right">
        {#each block.items as item, j}
          <div class="item">
            <div class="item-top">
              <span class="num">{String(j + 1).padStart(2, '0')}</span>
              <p class="item-title">{item.title}</p>
            </div>
            <p class="item-body">{item.body}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
{/each}

<section class="service-block" id="standalone">
  <div class="inner split">
    <div class="block-left">
      <p class="label">Standalone Services</p>
      <h2 class="block-heading">Need just one thing?</h2>
      <p class="block-desc">
        Not every business needs a full-service plan. These are available as
        individual engagements. Reach out to discuss scope and timing.
      </p>
    </div>
    <div class="block-right">
      {#each standaloneServices as svc}
        <div class="item svc-item">
          <p class="item-title">{svc.name}</p>
          <p class="svc-desc">{svc.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="plans-section">
  <div class="inner">
    <div class="plans-header">
      <p class="label">Pricing</p>
      <h2 class="plans-heading">Compare plans.</h2>
      <p class="plans-desc">Every plan starts with an audit. Monthly plans cancel any time.</p>
    </div>

    <div class="table-wrap">
      <table class="comparison">
        <thead>
          <tr>
            <th class="feat-col"></th>
            {#each tablePlans as plan}
              <th class="plan-col" class:featured={plan.featured}>
                <span class="th-name">{plan.name}</span>
                <span class="th-price">{plan.price}</span>
                <span class="th-sub">{plan.priceSub}</span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each tableGroups as group, gi}
            <tr class="group-row" class:first-group={gi === 0}>
              <td colspan="5" class="group-label">{group.name}</td>
            </tr>
            {#each group.rows as row}
              <tr class="feat-row">
                <td class="feat-name">{row.feature}</td>
                {#each planKeys as key, i}
                  <td class="feat-val" class:featured-col={i === 2}>
                    {#if row[key]}
                      <span class="icon-check" aria-label="Included">
                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true">
                          <path d="M1.5 5.5L5 9L12.5 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    {:else}
                      <span class="icon-x" aria-label="Not included">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                          <path d="M1.5 1.5L9.5 9.5M9.5 1.5L1.5 9.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                        </svg>
                      </span>
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<CtaBlock />
</main>

<style>
  /* Hero */
  .page-hero {
    padding: 5rem 1.25rem 4.5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .eyebrow,
  .label {
    margin: 0 0 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent);
  }

  .headline {
    margin: 0 0 1.25rem;
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--color-text);
  }

  .sub {
    margin: 0;
    font-size: 1.0625rem;
    color: var(--color-muted);
    max-width: 520px;
    line-height: 1.7;
  }

  /* Service sections */
  .service-block {
    border-bottom: 1px solid var(--color-border);
    padding: 5rem 1.25rem;
  }

  .split {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 5rem;
    align-items: start;
  }

  .block-left {
    position: sticky;
    top: 5.5rem;
  }

  .block-heading {
    margin: 0 0 1.25rem;
    font-size: clamp(1.375rem, 2.5vw, 1.875rem);
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.25;
    color: var(--color-text);
  }

  .block-desc {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--color-muted);
  }

  .block-right {
    display: flex;
    flex-direction: column;
  }

  .item {
    padding: 1.75rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .item + .item {
    border-top: 1px solid var(--color-border);
  }

  .item-top {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
  }

  .num {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--color-border);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.05em;
  }

  .item-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
  }

  .item-body {
    margin: 0;
    padding-left: 2.25rem;
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.7;
  }

  /* Standalone */
  .svc-item {
    gap: 0.375rem;
  }

  .svc-desc {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.65;
  }

  /* Plans comparison table */
  .plans-section {
    padding: 5rem 1.25rem 6rem;
    border-bottom: 1px solid var(--color-border);
  }

  .plans-header {
    margin-bottom: 3rem;
  }

  .plans-heading {
    margin: 0 0 0.5rem;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--color-text);
  }

  .plans-desc {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--color-muted);
  }

  .table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .comparison {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }

  .feat-col {
    width: 36%;
  }

  .plan-col {
    width: 16%;
    text-align: center;
    padding: 1.5rem 0.75rem 1.5rem;
    vertical-align: top;
    border-bottom: 1px solid var(--color-border);
  }

  .plan-col.featured {
    background: var(--color-text);
    color: #ffffff;
  }

  .th-name {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  .th-price {
    display: block;
    font-size: 1.375rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .th-sub {
    display: block;
    font-size: 0.75rem;
    color: var(--color-muted);
    margin-top: 0.25rem;
  }

  .plan-col.featured .th-sub {
    color: rgba(255, 255, 255, 0.45);
  }

  .group-row td {
    padding: 1.75rem 0.5rem 0.625rem;
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-muted);
    border-top: 1px solid var(--color-border);
  }

  .group-row.first-group td {
    border-top: none;
    padding-top: 1.5rem;
  }

  .feat-row td {
    padding: 0.875rem 0.5rem;
    border-top: 1px solid var(--color-border);
    vertical-align: middle;
  }

  .feat-name {
    font-size: 0.9375rem;
    color: var(--color-text);
    padding-right: 1.5rem;
  }

  .feat-val {
    text-align: center;
  }

  .feat-val.featured-col {
    background: #f6f6f6;
  }

  .icon-check {
    display: inline-flex;
    color: var(--color-text);
  }

  .icon-x {
    display: inline-flex;
    color: #d1d5db;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .page-hero {
      padding: 3rem 1rem;
    }

    .service-block {
      padding: 3rem 1rem;
    }

    .plans-section {
      padding: 3rem 1rem 4rem;
    }

    .plans-header {
      margin-bottom: 2rem;
    }

    .split {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .block-left {
      position: static;
    }

    .item {
      padding: 1.25rem 0;
    }

    .item-body {
      padding-left: 0;
    }
  }
</style>
