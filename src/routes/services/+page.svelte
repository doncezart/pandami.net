<script lang="ts">
  import { pillars } from '$lib/data/pillars.js';
  import { tiers } from '$lib/data/services.js';
  import PillarCard from '$lib/components/PillarCard.svelte';
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<svelte:head>
  <title>Services — Pandami</title>
  <meta
    name="description"
    content="Everything Pandami covers for your social media. Strategy, content, scheduling, community, analytics, and automation."
  />
</svelte:head>

<main>
  <!-- Hero -->
  <section class="page-hero">
    <div class="inner">
      <p class="eyebrow">Services</p>
      <h1 class="headline">Six pillars. Total coverage.</h1>
      <p class="sub">
        Pandami doesn't offer partial solutions. We cover every dimension of social media
        so nothing falls through the cracks.
      </p>
    </div>
  </section>

  <!-- Pillars grid -->
  <section class="pillars-section">
    <div class="inner">
      <h2 class="section-title">What We Cover</h2>
      <div class="pillars-grid">
        {#each pillars as pillar}
          <PillarCard {pillar} />
        {/each}
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="pricing-section">
    <div class="inner">
      <h2 class="section-title">Pricing Tiers</h2>
      <p class="section-sub">All plans are scoped to your goals. Contact us for exact pricing.</p>
      <div class="tiers-grid">
        {#each tiers as tier}
          <div class="tier-card" class:featured={tier.name === 'Full Service'}>
            {#if tier.name === 'Full Service'}
              <div class="featured-badge">Most Popular</div>
            {/if}
            <h3 class="tier-name">{tier.name}</h3>
            <p class="tier-tagline">{tier.tagline}</p>
            <p class="tier-price">{tier.price}</p>
            <ul class="pillar-list">
              {#each tier.pillarIds as pillarId}
                {@const pillar = pillars.find((p) => p.id === pillarId)}
                {#if pillar}
                  <li>{pillar.label}</li>
                {/if}
              {/each}
            </ul>
            <div class="tier-meta">
              <span class="meta-label">Platforms:</span>
              <span>{tier.platforms.join(', ')}</span>
            </div>
            <div class="tier-meta">
              <span class="meta-label">Turnaround:</span>
              <span>{tier.turnaround}</span>
            </div>
            <PillButton href="/contact" variant={tier.name === 'Full Service' ? 'primary' : 'secondary'}>
              Get Started
            </PillButton>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <div class="inner cta-inner">
      <h2 class="cta-headline">Not sure which tier is right for you?</h2>
      <p class="cta-sub">Talk to us. We'll figure it out together.</p>
      <PillButton href="/contact" variant="primary">Contact Us</PillButton>
    </div>
  </section>
</main>

<style>
  main {
    min-height: calc(100vh - 64px);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.25rem;
  }

  /* Hero */
  .page-hero {
    padding: 5rem 1.25rem 4rem;
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

  .headline {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .sub {
    margin: 0;
    font-size: 1.125rem;
    color: var(--color-muted);
    max-width: 560px;
    line-height: 1.7;
  }

  /* Pillars */
  .pillars-section {
    padding: 5rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }

  .section-title {
    margin: 0 0 2.5rem;
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 900;
    color: var(--color-text);
  }

  .section-sub {
    margin: -1.5rem 0 2.5rem;
    color: var(--color-muted);
    font-size: 1rem;
  }

  .pillars-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (min-width: 640px) {
    .pillars-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .pillars-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Pricing */
  .pricing-section {
    padding: 5rem 1.25rem;
    background: #f9fafb;
    border-bottom: 1px solid var(--color-border);
  }

  .tiers-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .tiers-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .tier-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
  }

  .tier-card.featured {
    border-color: var(--color-accent);
    border-width: 2px;
  }

  .featured-badge {
    position: absolute;
    top: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-accent);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.875rem;
    border-radius: 9999px;
    white-space: nowrap;
  }

  .tier-name {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 900;
    color: var(--color-text);
  }

  .tier-tagline {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-muted);
  }

  .tier-price {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .pillar-list {
    margin: 0;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    flex: 1;
  }

  .pillar-list li {
    font-size: 0.875rem;
    color: var(--color-text);
  }

  .tier-meta {
    font-size: 0.8125rem;
    color: var(--color-muted);
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .meta-label {
    font-weight: 600;
    color: var(--color-text);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* CTA */
  .cta-section {
    padding: 5rem 1.25rem;
    text-align: center;
    border-top: 1px solid var(--color-border);
  }

  .cta-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .cta-headline {
    margin: 0;
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 900;
    color: var(--color-text);
  }

  .cta-sub {
    margin: 0;
    color: var(--color-muted);
    font-size: 1rem;
  }
</style>
