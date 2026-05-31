<script lang="ts">
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'pandami-consent';
  let visible = $state(false);

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1');
    visible = false;
  }

  onMount(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      visible = true;
    }
  });
</script>

{#if visible}
  <div class="banner-wrap">
    <div class="cookie-banner" role="region" aria-label="Cookie notice">
      <p class="text">
        Analytics on this site are privacy-first. No cookies or personal data collected.
      </p>
      <button class="accept-btn" onclick={accept} data-umami-event="cookie-accept">
        Got it
      </button>
    </div>
  </div>
{/if}

<style>
  .banner-wrap {
    position: fixed;
    bottom: 1.25rem;
    left: 0;
    right: 0;
    z-index: 200;
    display: flex;
    justify-content: center;
    padding: 0 1.25rem;
    pointer-events: none;
  }

  .cookie-banner {
    pointer-events: all;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
    padding: 0.75rem 0.75rem 0.75rem 1.25rem;
    background: var(--color-text);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
  }

  .text {
    margin: 0;
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }

  .accept-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 0.4375rem 1rem;
    background: var(--color-bg);
    color: var(--color-text);
    border: none;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.15s;
    white-space: nowrap;
  }

  .accept-btn:hover {
    opacity: 0.8;
  }

  @media (max-width: 540px) {
    .cookie-banner {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.875rem;
      padding: 1rem;
    }
  }
</style>
