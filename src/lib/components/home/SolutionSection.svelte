<script lang="ts">
  import { pillars } from '$lib/data/pillars.js';
  import PillarCard from '$lib/components/PillarCard.svelte';
</script>

<section class="solution">
  <div class="inner">
    <div class="header">
      <p class="eyebrow">The Solution</p>
      <h2 class="headline">Everything covered. Nothing missed.</h2>
      <p class="sub">
        Pandami handles every dimension of social media. You stay focused on your business.
      </p>
    </div>
    <div class="grid">
      {#each pillars as pillar}
        <PillarCard {pillar} />
      {/each}
    </div>
  </div>
</section>

<style>
  .solution {
    padding: 5rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    max-width: 680px;
    margin: 0 auto 3rem;
    text-align: center;
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
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 900;
    line-height: 1.2;
    color: var(--color-text);
  }

  .sub {
    margin: 0;
    font-size: 1rem;
    color: var(--color-muted);
    line-height: 1.6;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
