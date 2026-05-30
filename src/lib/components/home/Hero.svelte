<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
  import StatBlock from '$lib/components/shared/StatBlock.svelte';
</script>

<section class="hero">
  <div class="inner">
    <div class="content">
      <p class="eyebrow">Social Media Agency</p>
      <h1 class="headline">
        Your social media,<br />
        <span class="accent">fully taken care of.</span>
      </h1>
      <p class="sub">
        From strategy to daily posting to community — Pandami handles everything
        so you can focus on running your business.
      </p>
      <div class="ctas">
        <PillButton href="/contact" variant="primary">Get Started</PillButton>
        <PillButton href="/services" variant="secondary">See What We Do</PillButton>
      </div>
    </div>
    <div class="stats">
      <StatBlock value="6" label="Core service pillars" />
      <StatBlock value="100%" label="Handled for you" />
      <StatBlock value="0" label="Headaches" />
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 5rem 1.25rem 4rem;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .eyebrow {
    margin: 0 0 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }

  .headline {
    margin: 0 0 1.25rem;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .accent {
    color: var(--color-accent);
  }

  .sub {
    margin: 0 0 2rem;
    font-size: 1.125rem;
    color: var(--color-muted);
    max-width: 520px;
    line-height: 1.7;
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }

  @media (max-width: 480px) {
    .stats {
      grid-template-columns: 1fr;
    }
  }
</style>
