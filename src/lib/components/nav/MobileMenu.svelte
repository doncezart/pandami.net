<script lang="ts">
  import { streamers } from '$lib/data/streamers.js';

  interface Props {
    open: boolean;
    onclose: () => void;
  }

  let { open, onclose }: Props = $props();

  let streamAidExpanded = $state(false);

  function toggleStreamAid() {
    streamAidExpanded = !streamAidExpanded;
  }
</script>

{#if open}
  <div class="mobile-menu" role="dialog" aria-label="Navigation menu">
    <div class="header">
      <span class="brand">Pandami</span>
      <button class="close-btn" onclick={onclose} aria-label="Close menu">✕</button>
    </div>
    <nav class="nav">
      <a href="/" class="nav-link" onclick={onclose}>Home</a>
      <a href="/services" class="nav-link" onclick={onclose}>Services</a>
      <a href="/contact" class="nav-link" onclick={onclose}>Contact</a>
      <div class="section-title">Tools</div>
      <a href="https://fx.pandami.net" class="nav-link sub">FX Library</a>
      <a href="https://memes.pandami.net" class="nav-link sub">Meme Library</a>
      <button class="nav-link sub expand-btn" onclick={toggleStreamAid}>
        StreamAid {streamAidExpanded ? '▲' : '▼'}
      </button>
      {#if streamAidExpanded}
        {#if streamers.length === 0}
          <p class="empty">No streamers yet.</p>
        {:else}
          {#each streamers as streamer}
            <a
              href="https://{streamer.subdomain}.pandami.net"
              class="nav-link sub indent"
              onclick={onclose}
            >
              {streamer.name}
            </a>
          {/each}
        {/if}
      {/if}
    </nav>
  </div>
{/if}

<style>
  .mobile-menu {
    position: fixed;
    inset: 0;
    background: var(--color-bg);
    z-index: 100;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
    height: 64px;
  }

  .brand {
    font-weight: 900;
    font-size: 1.125rem;
    color: var(--color-text);
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--color-text);
    padding: 0.25rem;
  }

  .nav {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    overflow-y: auto;
  }

  .nav-link {
    padding: 0.875rem 1.25rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
    text-decoration: none;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.1s;
  }

  .nav-link:hover {
    background-color: #f9fafb;
  }

  .nav-link.sub {
    font-size: 0.9375rem;
    padding-left: 1.75rem;
    color: var(--color-muted);
  }

  .nav-link.indent {
    padding-left: 2.5rem;
    font-size: 0.875rem;
  }

  .section-title {
    padding: 1rem 1.25rem 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .expand-btn {
    display: block;
    width: 100%;
    text-align: left;
  }

  .empty {
    padding: 0.5rem 2.5rem;
    font-size: 0.875rem;
    color: var(--color-muted);
    margin: 0;
  }
</style>
