<script lang="ts">
  import { streamers } from '$lib/data/streamers.js';

  interface Props {
    open: boolean;
    onclose: () => void;
  }

  let { open, onclose }: Props = $props();
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="overlay" onclick={onclose} onkeydown={(e) => e.key === 'Escape' && onclose()}></div>
  <div class="flyout" role="dialog" aria-label="StreamAid - Select a streamer">
    <div class="flyout-header">
      <span class="flyout-title">StreamAid</span>
      <button class="close-btn" onclick={onclose} aria-label="Close">✕</button>
    </div>
    <div class="flyout-body">
      {#if streamers.length === 0}
        <p class="empty-state">No streamers onboarded yet. Check back soon!</p>
      {:else}
        <div class="streamer-grid">
          {#each streamers as streamer}
            <a
              href="https://{streamer.subdomain}.pandami.net"
              class="streamer-btn"
              onclick={onclose}
            >
              {streamer.name}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 49;
    background: rgba(0, 0, 0, 0.2);
  }

  .flyout {
    position: fixed;
    top: 64px;
    right: 1rem;
    width: 320px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    z-index: 50;
  }

  .flyout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }

  .flyout-title {
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--color-text);
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-muted);
    font-size: 1rem;
    padding: 0.25rem;
  }

  .close-btn:hover {
    color: var(--color-text);
  }

  .flyout-body {
    padding: 1rem;
  }

  .empty-state {
    color: var(--color-muted);
    font-size: 0.875rem;
    text-align: center;
    margin: 0;
    padding: 1rem 0;
  }

  .streamer-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .streamer-btn {
    display: block;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    text-decoration: none;
    color: var(--color-text);
    font-size: 0.875rem;
    font-weight: 500;
    transition: border-color 0.1s, background-color 0.1s;
  }

  .streamer-btn:hover {
    border-color: var(--color-accent);
    background-color: #fef2f2;
  }
</style>
