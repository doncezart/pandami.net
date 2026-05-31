<script lang="ts">
  import { Target, Film, CalendarDays, Users, BarChart2, Zap } from '@lucide/svelte';
  import type { Pillar } from '$lib/data/pillars.js';

  interface Props {
    pillar: Pillar;
  }

  let { pillar }: Props = $props();

  const iconMap = {
    Target,
    Film,
    CalendarDays,
    Users,
    BarChart2,
    Zap,
  } as const;

  type IconName = keyof typeof iconMap;

  const Icon = $derived(iconMap[pillar.iconName as IconName] ?? Target);
</script>

<div class="pillar-card">
  <div class="icon-wrap">
    <Icon size={24} />
  </div>
  <h3 class="label">{pillar.label}</h3>
  <p class="description">{pillar.description}</p>
  {#if pillar.subItems && pillar.subItems.length > 0}
    <ul class="sub-items">
      {#each pillar.subItems as sub}
        <li class="sub-item">
          <strong>{sub.label}</strong>
          <span>{sub.description}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .pillar-card {
    padding: 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--color-bg);
  }

  .icon-wrap {
    color: var(--color-text);
    display: flex;
    align-items: center;
  }

  .label {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .description {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-muted);
    line-height: 1.6;
  }

  .sub-items {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .sub-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }

  .sub-item strong {
    color: var(--color-text);
  }

  .sub-item span {
    color: var(--color-muted);
    line-height: 1.5;
  }
</style>
