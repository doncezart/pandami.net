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
  <div class="cookie-banner" role="region" aria-label="Cookie notice">
    <p class="text">
      This site uses cookies to understand how people use it. Browsing further means you're fine with that.
    </p>
    <button class="accept-btn" onclick={accept} data-umami-event="cookie-accept">
      Got it
    </button>
  </div>
{/if}

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1rem 1.25rem;
    background: var(--color-text);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .text {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.5;
    max-width: 640px;
  }

  .accept-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 0.4375rem 1.125rem;
    background: var(--color-accent);
    color: #ffffff;
    border: none;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s;
    white-space: nowrap;
  }

  .accept-btn:hover {
    background: var(--color-accent-hover);
  }

  @media (max-width: 540px) {
    .cookie-banner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
