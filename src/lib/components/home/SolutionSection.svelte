<script lang="ts">
  import { onMount } from 'svelte';

  const steps = [
    {
      num: '01',
      title: 'Audit',
      body: 'We start by understanding where you stand. Your channels, content history, audience behaviour, and competitors get a thorough review so we know exactly what is working, what is not, and where the real opportunities are before we touch anything.'
    },
    {
      num: '02',
      title: 'Strategy',
      body: 'We define what to make, when to post, and how to position your brand. A documented plan built around your specific goals, audience, and voice. Not templates, not generic best practices. A strategy written for you.'
    },
    {
      num: '03',
      title: 'Production',
      body: 'Scripts, recording direction, editing, graphics, thumbnails. We handle the full production process and deliver content ready to publish on a consistent schedule that never slips, regardless of what else is going on in your business.'
    },
    {
      num: '04',
      title: 'Publishing and community',
      body: 'We own the content calendar, publish at optimal times, respond to comments, and actively manage your community. Your audience gets timely, on-brand interactions without you having to think about it.'
    },
    {
      num: '05',
      title: 'Track and improve',
      body: 'We monitor every metric that matters, compile clear monthly reports, and continuously refine the approach based on what the data shows. What performs gets doubled down on. What does not gets cut. The strategy never goes stale.'
    }
  ];

  let activeStep = $state(0);
  let stepEls: HTMLElement[] = [];

  function scrollToStep(i: number) {
    stepEls[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  onMount(async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    stepEls.forEach((el, i) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        }
      );

      ScrollTrigger.create({
        trigger: el,
        start: 'top 15%',
        end: 'bottom 15%',
        onEnter: () => { activeStep = i; },
        onEnterBack: () => { activeStep = i; }
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<section class="solution">
  <div class="outer">
    <div class="section-header">
      <p class="label">The plan</p>
      <h2 class="headline">A system,<br />not a scramble.</h2>
      <p class="sub">Five steps that take you from scattered to consistent.</p>
    </div>
    <div class="inner">
      <div class="nav-col">
        <nav class="step-nav">
          {#each steps as step, i}
            <div class="nav-group">
              <button
                class="nav-item"
                class:active={activeStep === i}
                onclick={() => scrollToStep(i)}
              >
                <span class="nav-num">{step.num}</span>
                <span class="nav-title">{step.title}</span>
              </button>
              {#if i < steps.length - 1}
                <div class="nav-line"></div>
              {/if}
            </div>
          {/each}
        </nav>
      </div>

      <div class="content-col">
        {#each steps as step, i}
          <div class="step-block" bind:this={stepEls[i]}>
            <p class="step-eyebrow">{step.num}</p>
            <h3 class="step-title">{step.title}</h3>
            <p class="step-body">{step.body}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .solution {
    padding: 5rem 1.25rem 6rem;
    border-bottom: 1px solid var(--color-border);
  }

  .outer {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .label {
    margin: 0 0 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent);
  }

  .headline {
    margin: 0 0 0.75rem;
    font-size: clamp(1.25rem, 2.25vw, 1.75rem);
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-text);
  }

  .sub {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-muted);
    line-height: 1.65;
  }

  .inner {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 7rem;
    align-items: start;
  }

  .nav-col {
    position: sticky;
    top: 5rem;
  }

  .step-nav {
    display: flex;
    flex-direction: column;
  }

  .nav-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }

  .nav-num {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 0.5625rem;
    font-weight: 500;
    color: var(--color-muted);
    background: #fff;
    transition: background 0.25s, border-color 0.25s, color 0.25s;
  }

  .nav-title {
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--color-muted);
    transition: color 0.25s;
  }

  .nav-item.active .nav-num {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #fff;
  }

  .nav-item.active .nav-title {
    color: var(--color-text);
    font-weight: 500;
  }

  .nav-line {
    width: 1px;
    height: 1.375rem;
    background: var(--color-border);
    margin-left: calc(1.75rem / 2 - 0.5px);
  }

  .content-col {
    display: flex;
    flex-direction: column;
  }

  .step-block {
    padding: 2.75rem 0;
    border-top: 1px solid var(--color-border);
  }

  .step-block:first-child {
    border-top: none;
    padding-top: 0;
  }

  .step-block:last-child {
    border-bottom: none;
  }

  .step-eyebrow {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-accent);
    font-variant-numeric: tabular-nums;
  }

  .step-title {
    margin: 0 0 0.875rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-text);
    line-height: 1.3;
  }

  .step-body {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.75;
  }

  @media (max-width: 860px) {
    .solution {
      padding: 3rem 1rem 4rem;
    }

    .inner {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .nav-col {
      position: static;
    }

    .step-nav {
      display: none;
    }
  }
</style>
