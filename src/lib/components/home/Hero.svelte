<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<section class="hero">
  <div class="inner">
    <div class="content">
      <p class="eyebrow">Social Media Agency</p>
      <h1 class="headline">Your social media needs taken care of</h1>
      <p class="sub">
        Consistent, high-volume content takes more time than most businesses can spare. We take it off your plate.
      </p>
      <div class="ctas">
        <PillButton href="/contact" variant="dark" data-umami-event="hero-cta">Get Started</PillButton>
        <a href="/services" class="text-link">See what we do →</a>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 5rem 1.25rem 3.5rem;
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .content {
    max-width: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .eyebrow {
    margin: 0 0 1.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--color-accent);
  }

  .headline {
    margin: 0 0 1.25rem;
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 500;
    line-height: 1.1;
    color: var(--color-text);
    letter-spacing: -0.025em;
    max-width: none;
  }

  .sub {
    margin: 0 0 2rem;
    font-size: 1rem;
    color: var(--color-muted);
    max-width: 520px;
    line-height: 1.7;
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
    align-items: center;
    justify-content: flex-start;
  }

  .text-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    text-decoration: none;
    opacity: 0.6;
    transition: opacity 0.15s;
  }

  .text-link:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 3rem 1rem 2.5rem;
    }
  }
</style>
