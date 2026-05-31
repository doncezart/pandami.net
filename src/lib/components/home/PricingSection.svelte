<script lang="ts">
  import PillButton from '$lib/components/shared/PillButton.svelte';

  const plans = [
    {
      id: 'audit',
      name: 'Audit',
      tagline: 'Start with clarity',
      priceDisplay: '€200',
      priceSub: 'One-time',
      description: 'A one-time review across all active platforms. See what is working, what is not, and where the opportunity is.',
      ctaLabel: 'Learn more',
      ctaHref: '/services',
      variant: 'secondary' as const,
      featured: false,
      dark: false,
      enterprise: false,
      features: [
        { text: 'Page performance audit', included: true },
        { text: 'Competitor review', included: true },
        { text: 'Analytics aggregation', included: true },
        { text: 'Recommendations report', included: true },
        { text: 'Ongoing management', included: false },
      ],
    },
    {
      id: 'foundation',
      name: 'Foundation',
      tagline: 'Production, strategy, and reporting.',
      priceDisplay: '€799',
      priceSub: '/ month',
      description: 'Content creation, scheduling, and brand strategy on a consistent cadence. Analytics included. Community management stays with your team.',
      ctaLabel: 'Learn more',
      ctaHref: '/services',
      variant: 'secondary' as const,
      featured: false,
      dark: false,
      enterprise: false,
      features: [
        { text: 'Audit included', included: true },
        { text: 'Content creation', included: true },
        { text: 'Scheduling', included: true },
        { text: 'Brand strategy', included: true },
        { text: 'Analytics', included: true },
        { text: 'Community management', included: false },
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      tagline: 'The full service, handled end to end.',
      priceDisplay: '€1,499',
      priceSub: '/ month',
      description: 'Everything in Foundation, plus community management, full strategy and research, and cross-platform marketing. Managed end to end.',
      ctaLabel: 'Learn more',
      ctaHref: '/services',
      variant: 'inverted' as const,
      featured: true,
      dark: true,
      enterprise: false,
      features: [
        { text: 'Audit included', included: true },
        { text: 'Everything in Foundation', included: true },
        { text: 'Community management', included: true },
        { text: 'Full strategy and research', included: true },
        { text: 'Cross-platform marketing', included: true },
        { text: 'On-site production', included: false },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Volume and custom solutions.',
      priceDisplay: 'Custom',
      priceSub: '',
      description: 'Everything in Growth, plus on-site production, community funneling, and a fully custom strategy built around your operation.',
      ctaLabel: 'Inquire for pricing',
      ctaHref: '#contact',
      variant: 'dark' as const,
      featured: false,
      dark: false,
      enterprise: true,
      features: [
        { text: 'Audit included', included: true },
        { text: 'Everything in Growth', included: true },
        { text: 'On-site production', included: true },
        { text: 'Community funneling', included: true },
        { text: 'Custom strategy development', included: true },
        { text: 'Volume scaling', included: true },
      ],
    },
  ];
</script>

<section class="pricing">
  <div class="outer">
    <div class="section-header">
      <p class="label">Pricing</p>
      <h2 class="headline">Pick your pace.</h2>
      <p class="sub">Every plan starts with an audit. Monthly plans cancel any time.</p>
    </div>

    <div class="plans">
      {#each plans as plan}
        <div
          class="plan-card"
          class:plan-dark={plan.dark}
          class:plan-enterprise={plan.enterprise}
          class:plan-featured={plan.featured}
        >
          {#if plan.featured}
            <div class="badge">Most popular</div>
          {/if}

          <div class="plan-top">
            <p class="plan-name">{plan.name}</p>
            <p class="plan-tagline">{plan.tagline}</p>
          </div>

          <div class="plan-price">
            <span class="price">{plan.priceDisplay}</span>
            {#if plan.priceSub}<span class="price-sub">{plan.priceSub}</span>{/if}
          </div>

          <p class="plan-desc">{plan.description}</p>

          <ul class="feature-list">
            {#each plan.features as feature}
              <li class="feature-item" class:excluded={!feature.included}>
                <span class="check" aria-hidden="true">
                  {#if feature.included}
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4 7.5L11 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                    </svg>
                  {/if}
                </span>
                {feature.text}
              </li>
            {/each}
          </ul>

          <div class="plan-cta">
            <PillButton href={plan.ctaHref} variant={plan.variant} data-umami-event="pricing-cta">
              {plan.ctaLabel}
            </PillButton>
          </div>
        </div>
      {/each}
    </div>

    <div class="addons">
      <div class="addons-text">
        <h3 class="addons-title">Need just one thing?</h3>
        <p class="addons-desc">Not every brand needs a full plan. We offer individual services for specific needs.</p>
      </div>
      <div class="addons-services">
        <span class="tag">Video editing</span>
        <span class="tag">Discord server setup</span>
        <span class="tag">Social media automations</span>
        <span class="tag">Profile optimisation</span>
        <span class="tag">Graphic design packages</span>
        <span class="tag">Content strategy session</span>
        <span class="tag">Podcast editing</span>
        <PillButton href="/services#standalone" variant="dark">Learn more</PillButton>
      </div>
    </div>
  </div>
</section>

<style>
  .pricing {
    padding: 5rem 1.25rem 6rem;
    border-bottom: 1px solid var(--color-border);
  }

  .outer {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    margin-bottom: 3rem;
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
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--color-text);
  }

  .sub {
    margin: 0;
    font-size: 1rem;
    color: var(--color-muted);
  }

  /* Grid */
  .plans {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.125rem;
    align-items: stretch;
  }

  /* Card base */
  .plan-card {
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 1.625rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    background: #ffffff;
  }

  /* Featured card | elevated */
  .plan-featured {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.14);
  }

  /* Dark card (Growth) */
  .plan-dark {
    background: var(--color-text);
    border-color: var(--color-text);
    color: #ffffff;
  }

  /* Enterprise card */
  .plan-enterprise {
    background: #f8f8f8;
  }

  /* Badge */
  .badge {
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    background: var(--color-accent);
    color: #ffffff;
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  /* Plan top */
  .plan-top {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .plan-name {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: inherit;
  }

  .plan-tagline {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--color-muted);
  }

  .plan-dark .plan-tagline {
    color: rgba(255, 255, 255, 0.45);
  }

  /* Price */
  .plan-price {
    display: flex;
    align-items: baseline;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .price {
    font-size: clamp(1.625rem, 2.25vw, 2.125rem);
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1;
    color: inherit;
  }

  .price-sub {
    font-size: 0.8125rem;
    color: var(--color-muted);
    line-height: 1;
  }

  .plan-dark .price-sub {
    color: rgba(255, 255, 255, 0.4);
  }

  /* Description */
  .plan-desc {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--color-muted);
  }

  .plan-dark .plan-desc {
    color: rgba(255, 255, 255, 0.55);
  }

  /* CTA | full width */
  .plan-cta :global(.pill-button) {
    width: 100%;
    justify-content: center;
    padding-top: 0.5625rem;
    padding-bottom: 0.5625rem;
    font-size: 0.8125rem;
  }

  /* Feature list */
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    border-top: 1px solid var(--color-border);
    padding-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .plan-dark .feature-list {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--color-text);
  }

  .plan-dark .feature-item {
    color: rgba(255, 255, 255, 0.82);
  }

  .check {
    flex-shrink: 0;
    margin-top: 0.1875rem;
    color: var(--color-accent);
    display: flex;
  }

  .feature-item.excluded {
    color: var(--color-muted);
  }

  .feature-item.excluded .check {
    color: var(--color-border);
  }

  .plan-dark .feature-item.excluded {
    color: rgba(255, 255, 255, 0.28);
  }

  .plan-dark .feature-item.excluded .check {
    color: rgba(255, 255, 255, 0.18);
  }

  .plan-dark .check {
    color: rgba(255, 255, 255, 0.6);
  }

  /* Responsive */
  @media (max-width: 960px) {
    .plans {
      grid-template-columns: repeat(2, 1fr);
    }

    .plan-featured {
      margin-top: 0;
      padding-top: 1.625rem;
      padding-bottom: 1.625rem;
    }
  }

  @media (max-width: 540px) {
    .pricing {
      padding: 3rem 1rem 4rem;
    }

    .plans {
      grid-template-columns: 1fr;
    }

    .tag {
      flex: 0 0 auto;
    }
  }

  /* Addons block */
  .addons {
    margin-top: 1.5rem;
    padding: 2.5rem 0;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    align-items: center;
  }

  .addons-label {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent);
  }

  .addons-title {
    margin: 0 0 0.75rem;
    font-size: clamp(1.25rem, 2vw, 1.625rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: var(--color-text);
  }

  .addons-desc {
    margin: 0 0 1.5rem;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--color-muted);
  }

  .addons-services {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .tag {
    flex: 1 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0.4375rem 0.9375rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    color: var(--color-text);
    background: #f2f2f2;
  }

  .addons-services :global(.pill-button) {
    margin-left: 0.375rem;
  }

  @media (max-width: 720px) {
    .addons {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
