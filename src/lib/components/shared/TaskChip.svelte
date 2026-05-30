<script lang="ts">
  interface Props {
    label: string;
  }

  let { label }: Props = $props();
</script>

<span class="chip">{label}</span>

<style>
  .chip {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: #f3f4f6;
    color: var(--color-muted);
    font-size: 0.75rem;
    font-weight: 500;
  }
</style>
