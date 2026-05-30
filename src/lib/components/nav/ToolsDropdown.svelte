<script lang="ts">
  import StreamAidFlyout from './StreamAidFlyout.svelte';

  let open = $state(false);
  let streamAidOpen = $state(false);

  function toggle() {
    open = !open;
  }

  function openStreamAid() {
    streamAidOpen = true;
    open = false;
  }

  function closeAll() {
    open = false;
    streamAidOpen = false;
  }
</script>

<div class="tools-dropdown">
  <button class="trigger" onclick={toggle} aria-expanded={open} aria-haspopup="true">
    Tools
    <span class="chevron" class:rotated={open}>▾</span>
  </button>

  {#if open}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" onclick={closeAll} onkeydown={(e) => e.key === 'Escape' && closeAll()}></div>
    <div class="dropdown-menu">
      <a href="https://fx.pandami.net" class="menu-item" onclick={closeAll}>FX Library</a>
      <a href="https://memes.pandami.net" class="menu-item" onclick={closeAll}>Meme Library</a>
      <button class="menu-item" onclick={openStreamAid}>StreamAid ▶</button>
    </div>
  {/if}
</div>

<StreamAidFlyout open={streamAidOpen} onclose={closeAll} />

<style>
  .tools-dropdown {
    position: relative;
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
    cursor: pointer;
    padding: 0.25rem 0;
  }

  .trigger:hover {
    color: var(--color-accent);
  }

  .chevron {
    transition: transform 0.15s;
  }

  .chevron.rotated {
    transform: rotate(180deg);
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    min-width: 180px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    z-index: 50;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .menu-item {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: var(--color-text);
    text-decoration: none;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.1s;
  }

  .menu-item:hover {
    background-color: #f9fafb;
  }
</style>
