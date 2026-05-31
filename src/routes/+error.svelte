<script lang="ts">
  import { page } from '$app/stores';
  import PillButton from '$lib/components/shared/PillButton.svelte';
</script>

<svelte:head>
  <title>{$page.status} — Pandami</title>
</svelte:head>

<main class="error-page" id="main-content">
  <div class="inner">
    <p class="status">{$page.status}</p>
    {#if $page.status === 404}
      <h1>Page not found</h1>
      <p class="desc">The page you're looking for doesn't exist or has been moved.</p>
    {:else}
      <h1>Something went wrong</h1>
      <p class="desc">Try refreshing the page or come back later.</p>
    {/if}
    <PillButton href="/" variant="dark">Back to home</PillButton>
  </div>
</main>

<style>
  .error-page {
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.25rem;
  }

  .inner {
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .status {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .desc {
    margin: 0;
    font-size: 1.0625rem;
    color: var(--color-muted);
    line-height: 1.6;
  }
</style>
