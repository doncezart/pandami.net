<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<section class="cta-block">
  <div class="inner">
    <h2 class="headline">Ready to take social media off your plate?</h2>
    <p class="sub">
      Tell us about your business and we'll put together a plan.
      No commitment needed to get started.
    </p>
    <PillButton href="/contact" variant="inverted">Let's Talk</PillButton>
  </div>
</section>

<style>
  .cta-block {
    background-color: var(--color-text);
    color: #ffffff;
    padding: 6rem 1.25rem;
    text-align: center;
  }

  .inner {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .headline {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 900;
    line-height: 1.2;
    color: #ffffff;
  }

  .sub {
    margin: 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    max-width: 520px;
  }
</style>
