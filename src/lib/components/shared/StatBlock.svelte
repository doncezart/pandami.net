<script lang="ts">
  interface Props {
    value: string;
    label: string;
  }

  let { value, label }: Props = $props();
</script>

<div class="stat-block">
  <span class="value">{value}</span>
  <span class="label">{label}</span>
</div>

<style>
  .stat-block {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .value {
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1;
    color: var(--color-accent);
  }

  .label {
    font-size: 0.875rem;
    color: var(--color-muted);
  }
</style>
