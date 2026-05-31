<script lang="ts">
  import { enhance } from '$app/forms';
  import { pillars } from '$lib/data/pillars.js';
  import PillButton from '$lib/components/shared/PillButton.svelte';
  import type { ActionData } from './$types';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

  interface Props {
    form: ActionData;
  }

  let { form }: Props = $props();

  let submitting = $state(false);
</script>

<svelte:head>
  <title>Contact — Pandami</title>
  <meta name="description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <link rel="canonical" href="https://pandami.net/contact" />
  <meta property="og:title" content="Contact — Pandami" />
  <meta property="og:description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <meta property="og:url" content="https://pandami.net/contact" />
  <meta name="twitter:title" content="Contact — Pandami" />
  <meta name="twitter:description" content="Get in touch with Pandami. Tell us about your business and we'll put together a plan." />
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<main id="main-content">
  <section class="contact-hero">
    <div class="inner">
      <p class="eyebrow">Contact</p>
      <h1 class="headline">Let's talk about your social media.</h1>
      <p class="sub">Tell us a bit about your business and what you're looking for. We'll get back to you within one business day.</p>
    </div>
  </section>

  <section class="form-section">
    <div class="inner form-inner">
      {#if form?.success}
        <div class="success-card">
          <span class="success-icon">✓</span>
          <h2>Message received!</h2>
          <p>We'll get back to you within one business day.</p>
          <PillButton href="/" variant="secondary">Back to Home</PillButton>
        </div>
      {:else}
        <form
          method="POST"
          use:enhance={() => {
            submitting = true;
            return async ({ result, update }) => {
              if (result.type === 'success') {
                (window as any).umami?.track('contact-success');
              } else if (result.type === 'failure') {
                (window as any).umami?.track('contact-error');
              }
              await update();
              submitting = false;
            };
          }}
          class="contact-form"
          novalidate
        >
          {#if form?.error}
            <div class="error-banner" role="alert">{form.error}</div>
          {/if}

          <div class="field">
            <label for="name">Your name *</label>
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              value={form?.name ?? ''}
              placeholder="Jane Smith"
            />
          </div>

          <div class="field">
            <label for="email">Email address *</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              value={form?.email ?? ''}
              placeholder="jane@yourcompany.com"
            />
          </div>

          <fieldset class="services-fieldset">
            <legend>Which services are you interested in? *</legend>
            <div class="checkbox-grid">
              {#each pillars as pillar}
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    name="services"
                    value={pillar.id}
                    checked={form?.services?.includes(pillar.id) ?? false}
                  />
                  {pillar.label}
                </label>
              {/each}
            </div>
          </fieldset>

          <div class="field">
            <label for="message">Anything else you'd like us to know?</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Tell us about your business, your current situation, goals..."
            >{form?.message ?? ''}</textarea>
          </div>

          <div class="cf-turnstile" data-sitekey={PUBLIC_TURNSTILE_SITE_KEY} data-theme="light"></div>

          <PillButton type="submit" variant="primary" data-umami-event="contact-submit">
            {submitting ? 'Sending…' : 'Send Message'}
          </PillButton>
        </form>
      {/if}
    </div>
  </section>
</main>

<style>
  main {
    min-height: calc(100vh - 64px);
  }

  .inner {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 1.25rem;
  }

  .contact-hero {
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
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .sub {
    margin: 0;
    font-size: 1.125rem;
    color: var(--color-muted);
    line-height: 1.7;
  }

  .form-section {
    padding: 4rem 1.25rem 5rem;
  }

  .form-inner {
    display: flex;
    flex-direction: column;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .error-banner {
    padding: 0.875rem 1rem;
    background: #fef2f2;
    border: 1px solid #fca5a5;
    border-radius: 0.5rem;
    color: var(--color-accent);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
  }

  input[type='text'],
  input[type='email'],
  textarea {
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 0.9375rem;
    color: var(--color-text);
    background: var(--color-bg);
    transition: border-color 0.15s;
    width: 100%;
    box-sizing: border-box;
  }

  input[type='text']:focus,
  input[type='email']:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  textarea {
    resize: vertical;
  }

  .services-fieldset {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
  }

  legend {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
    padding: 0 0.25rem;
  }

  .checkbox-grid {
    margin-top: 0.75rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
  }

  @media (max-width: 480px) {
    .checkbox-grid {
      grid-template-columns: 1fr;
    }
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--color-text);
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    accent-color: var(--color-accent);
  }

  .success-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
  }

  .success-icon {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dcfce7;
    color: #16a34a;
    border-radius: 50%;
    font-size: 1.25rem;
  }

  .success-card h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--color-text);
  }

  .cf-turnstile {
    min-height: 65px;
    margin-bottom: 0.75rem;
  }

  .success-card p {
    margin: 0;
    color: var(--color-muted);
  }
</style>
