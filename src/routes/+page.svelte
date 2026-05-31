<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte';
  import HeroVisual from '$lib/components/home/HeroVisual.svelte';
  import ProblemSection from '$lib/components/home/ProblemSection.svelte';
  import ConsistencySection from '$lib/components/home/ConsistencySection.svelte';
  import SolutionSection from '$lib/components/home/SolutionSection.svelte';
  import PricingSection from '$lib/components/home/PricingSection.svelte';
  import CtaBlock from '$lib/components/home/CtaBlock.svelte';
</script>

<svelte:head>
  <title>Pandami — All your social media needs taken care of</title>
  <meta name="description" content="Pandami handles your social media from strategy to daily posting to community. Focus on your business and we handle the rest." />
  <link rel="canonical" href="https://pandami.net/" />
  <meta property="og:title" content="Pandami — All your social media needs taken care of" />
  <meta property="og:description" content="Pandami handles your social media from strategy to daily posting to community. Focus on your business and we handle the rest." />
  <meta property="og:url" content="https://pandami.net/" />
  <meta name="twitter:title" content="Pandami — All your social media needs taken care of" />
  <meta name="twitter:description" content="Pandami handles your social media from strategy to daily posting to community. Focus on your business and we handle the rest." />
</svelte:head>

<main id="main-content">
  <Hero />
  <HeroVisual />
  <ProblemSection />
  <ConsistencySection />
  <SolutionSection />
  <PricingSection />
  <CtaBlock />
</main>

<style>
  main {
    min-height: calc(100vh - 64px);
  }
</style>
