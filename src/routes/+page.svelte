<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte';
  import ProblemSection from '$lib/components/home/ProblemSection.svelte';
  import ConsistencySection from '$lib/components/home/ConsistencySection.svelte';
  import SolutionSection from '$lib/components/home/SolutionSection.svelte';
  import ServicesTeaser from '$lib/components/home/ServicesTeaser.svelte';
  import CtaBlock from '$lib/components/home/CtaBlock.svelte';
</script>

<svelte:head>
  <title>Pandami — All your social media needs taken care of</title>
  <meta
    name="description"
    content="Pandami handles your social media from strategy to daily posting to community. Focus on your business — we handle the rest."
  />
</svelte:head>

<main>
  <Hero />
  <ProblemSection />
  <ConsistencySection />
  <SolutionSection />
  <ServicesTeaser />
  <CtaBlock />
</main>

<style>
  main {
    min-height: calc(100vh - 64px);
  }
</style>
