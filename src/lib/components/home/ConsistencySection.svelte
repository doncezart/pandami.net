<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<section class="consistency">
  <div class="inner">
    <div class="left">
      <p class="label">Why it matters</p>
      <h2 class="headline">Inconsistency is invisible — until it costs you.</h2>
      <p class="body">
        Every missed post, every week of silence, every off-brand piece of content
        is a signal to the algorithm and your audience: this brand isn't serious.
        Recovering trust takes twice as long as building it.
      </p>
      <PillButton href="/contact" variant="primary">Get Started</PillButton>
    </div>
    <div class="right">
      <blockquote>
        “I knew I needed to be consistent. I just couldn’t keep up on top of everything else.”
      </blockquote>
      <p class="attribution">— The business owner you recognise yourself in</p>
    </div>
  </div>
</section>

<style>
  .consistency {
    padding: 5rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (min-width: 768px) {
    .inner {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }

  .label {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }

  .headline {
    margin: 0 0 1.25rem;
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 900;
    line-height: 1.2;
    color: var(--color-text);
  }

  .body {
    margin: 0 0 2rem;
    font-size: 1rem;
    color: var(--color-muted);
    line-height: 1.7;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    padding-top: 0.5rem;
  }

  blockquote {
    margin: 0;
    font-size: 1.25rem;
    font-style: italic;
    font-weight: 400;
    color: var(--color-text);
    line-height: 1.55;
  }

  .attribution {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--color-muted);
  }
</style>
