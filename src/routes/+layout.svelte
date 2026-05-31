<script lang="ts">
  import './layout.css';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Scrollbar from '$lib/components/shared/Scrollbar.svelte';
  import type { Snippet } from 'svelte';
  import { PUBLIC_UMAMI_URL, PUBLIC_UMAMI_SITE_ID } from '$env/static/public';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let lenis: any;

  onMount(() => {
    (async () => {
      if (PUBLIC_UMAMI_URL && PUBLIC_UMAMI_SITE_ID) {
        const script = document.createElement('script');
        script.defer = true;
        script.src = PUBLIC_UMAMI_URL;
        script.setAttribute('data-website-id', PUBLIC_UMAMI_SITE_ID);
        document.head.appendChild(script);
      }

      const { default: Lenis } = await import('lenis');
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.bunny.net" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta property="og:site_name" content="Pandami" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://pandami.net/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>
<Scrollbar />
<Navbar />
{@render children()}
<Footer />
