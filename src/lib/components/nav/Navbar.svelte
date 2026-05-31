<script lang="ts">
  import { page } from '$app/stores';
  import ToolsDropdown from './ToolsDropdown.svelte';
  import MobileMenu from './MobileMenu.svelte';

  let mobileOpen = $state(false);

  function openMobile() {
    mobileOpen = true;
  }

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<header class="navbar">
  <div class="inner">
    <a href="/" class="brand">Pandami</a>

    <!-- Desktop nav -->
    <nav class="desktop-nav">
      <ToolsDropdown />
      <a
        href="/services"
        class="nav-link"
        aria-current={$page.url.pathname === '/services' ? 'page' : undefined}
      >Services</a>
      <a
        href="/contact"
        class="nav-link"
        aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}
      >Contact</a>
    </nav>

    <!-- Desktop CTA -->
    <a href="/contact" class="cta-btn desktop-only">Book a Call</a>

    <!-- Mobile hamburger -->
    <button class="hamburger mobile-only" onclick={openMobile} aria-label="Open menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

<MobileMenu open={mobileOpen} onclose={closeMobile} />

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 30;
    height: 64px;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: 0 1.25rem;
  }

  .inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--color-text);
    text-decoration: none;
  }

  .desktop-nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.15s;
  }

  .nav-link:hover {
    color: var(--color-accent);
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.4375rem 1rem;
    background: var(--color-text);
    color: var(--color-bg);
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    text-decoration: none;
    transition: opacity 0.15s;
    white-space: nowrap;
  }

  .cta-btn:hover {
    opacity: 0.8;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
  }

  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
    transition: background-color 0.15s;
  }

  .hamburger:hover span {
    background: var(--color-accent);
  }

  @media (max-width: 767px) {
    .desktop-nav {
      display: none;
    }

    .desktop-only {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .mobile-only {
      display: flex;
    }
  }
</style>
