<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<section class="cta-block">
  <div class="grid-bg" aria-hidden="true">
    <div class="grid-plane"></div>
  </div>
  <div class="inner">
    <h2 class="headline">Take social media off your plate.</h2>
    <p class="sub">
      Tell us about your business and we will put together a plan.
      No commitment needed.
    </p>
    <PillButton href="/contact" variant="inverted">Let's Talk</PillButton>
  </div>
</section>

<style>
  .cta-block {
    position: relative;
    overflow: hidden;
    background-color: var(--color-accent);
    color: #ffffff;
    padding: 6rem 1.25rem;
    text-align: center;
  }

  .grid-bg {
    position: absolute;
    inset: 0;
    perspective: 600px;
    perspective-origin: 50% 40%;
    pointer-events: none;
  }

  .grid-plane {
    position: absolute;
    left: -100%;
    right: -100%;
    top: 30%;
    bottom: -10%;
    transform: rotateX(60deg);
    transform-origin: center bottom;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.38) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.38) 1px, transparent 1px);
    background-size: 80px 60px;
    mask-image: linear-gradient(to bottom, transparent 0%, black 40%, black 100%);
    animation: grid-flow 3s linear infinite;
  }

  @keyframes grid-flow {
    from { background-position: 0 0; }
    to { background-position: 0 60px; }
  }

  .inner {
    position: relative;
    z-index: 1;
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
    font-weight: 500;
    line-height: 1.2;
    color: #ffffff;
  }

  .sub {
    margin: 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.7;
    max-width: 520px;
  }

  @media (max-width: 768px) {
    .cta-block {
      padding: 4rem 1rem;
    }
  }
</style>
