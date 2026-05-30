<script lang="ts">
  import { tiers } from '$lib/data/services.js';
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<section class="teaser">
  <div class="inner">
    <p class="eyebrow">Pricing</p>
    <h2 class="headline">Simple, transparent tiers.</h2>
    <p class="sub">Choose the level that fits your stage. Scale up when you're ready.</p>
    <div class="tiers">
      {#each tiers as tier}
        <div class="tier-card">
          <span class="tier-name">{tier.name}</span>
          <span class="tier-tagline">{tier.tagline}</span>
        </div>
      {/each}
    </div>
    <PillButton href="/services" variant="primary">View Full Services</PillButton>
  </div>
</section>

<style>
  .teaser {
    background: #f9fafb;
    padding: 5rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .eyebrow {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
  }

  .headline {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 900;
    color: var(--color-text);
    line-height: 1.2;
  }

  .sub {
    margin: 0;
    font-size: 1rem;
    color: var(--color-muted);
    max-width: 480px;
    line-height: 1.6;
  }

  .tiers {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    width: 100%;
  }

  .tier-card {
    flex: 1;
    min-width: 180px;
    max-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 1.5rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
  }

  .tier-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .tier-tagline {
    font-size: 0.8125rem;
    color: var(--color-muted);
  }
</style>
