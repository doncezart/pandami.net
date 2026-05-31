<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'inverted' | 'dark';

  interface Props {
    variant?: Variant;
    href?: string;
    type?: 'button' | 'submit';
    children: Snippet;
    [key: string]: unknown;
  }

  let { variant = 'primary', href, type = 'button', children, ...rest }: Props = $props();
</script>

{#if href}
  <a
    {href}
    class="pill-button {variant}"
    {...rest}
  >
    {@render children()}
  </a>
{:else}
  <button
    {type}
    class="pill-button {variant}"
    {...rest}
  >
    {@render children()}
  </button>
{/if}

<style>
  .pill-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4375rem 1rem;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 0.8125rem;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15s, color 0.15s, border-color 0.15s, opacity 0.15s;
    border: 2px solid transparent;
  }

  .primary {
    background-color: var(--color-accent);
    color: #ffffff;
    border-color: var(--color-accent);
  }

  .primary:hover {
    background-color: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }

  .secondary {
    background-color: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .secondary:hover {
    border-color: var(--color-text);
  }

  .inverted {
    background-color: #ffffff;
    color: var(--color-text);
    border-color: #ffffff;
  }

  .inverted:hover {
    background-color: #f3f4f6;
  }

  .dark {
    background-color: var(--color-text);
    color: var(--color-bg);
    border-color: var(--color-text);
  }

  .dark:hover {
    opacity: 0.8;
  }
</style>
