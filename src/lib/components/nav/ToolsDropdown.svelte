<script lang="ts">
  import { ExternalLink } from '@lucide/svelte';

  let open = $state(false);

  const items = [
    {
      href: 'https://fx.pandami.net',
      label: 'FX Library',
      desc: 'Royalty-free sound effects for creators',
    },
    {
      href: 'https://memes.pandami.net',
      label: 'Meme Library',
      desc: 'Searchable reaction clips and memes',
    },
    {
      href: 'https://streamaid.pandami.net',
      label: 'StreamAid',
      desc: 'Live support hub for streamers',
    },
  ];
</script>

<!-- wrap fills full navbar height so top:100% = navbar bottom -->
<div class="wrap" onmouseenter={() => (open = true)} onmouseleave={() => (open = false)}>
  <button class="trigger" aria-expanded={open} aria-haspopup="true" tabindex="0">
    Tools
    <span class="chevron" class:rotated={open}>▾</span>
  </button>

  {#if open}
    <div class="menu" role="menu">
      {#each items as item}
        <a
          href={item.href}
          class="item"
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
        >
          <div class="item-body">
            <span class="item-label">{item.label}</span>
            <span class="item-desc">{item.desc}</span>
          </div>
          <ExternalLink size={13} class="item-icon" />
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Fill full navbar height | top:100% then equals navbar bottom */
  .wrap {
    position: relative;
    height: 64px;
    display: flex;
    align-items: center;
  }

  .trigger {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    cursor: default;
    padding: 0.25rem 0;
    transition: color 0.15s;
  }

  .wrap:hover .trigger {
    color: var(--color-accent);
  }

  .chevron {
    transition: transform 0.2s;
    line-height: 1;
    font-size: 0.75rem;
  }

  .chevron.rotated {
    transform: rotate(180deg);
  }

  .menu {
    position: absolute;
    top: 100%;
    left: -1.75rem;
    width: 320px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-top: none;
    border-radius: 0 0 0.625rem 0.625rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
    z-index: 50;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    text-decoration: none;
    color: var(--color-text);
    border-bottom: 1px solid var(--color-border);
    transition: background-color 0.1s;
  }

  .item:last-child {
    border-bottom: none;
  }

  .item:hover {
    background-color: #f4f4f4;
  }

  .item-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .item-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.2;
  }

  .item-desc {
    font-size: 0.75rem;
    color: var(--color-muted);
    line-height: 1.4;
  }

  :global(.item-icon) {
    color: var(--color-accent);
    flex-shrink: 0;
    opacity: 0.85;
  }

  .item:hover :global(.item-icon) {
    opacity: 1;
    color: var(--color-accent);
  }
</style>
