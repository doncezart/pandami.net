<script lang="ts">
  import './layout.css';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.bunny.net" />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
