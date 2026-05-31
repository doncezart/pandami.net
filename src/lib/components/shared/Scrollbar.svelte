<script lang="ts">
  import { onMount } from 'svelte';

  let thumbHeight = $state(0);
  let thumbTop = $state(0);
  let visible = $state(false);
  let hideTimer: ReturnType<typeof setTimeout>;

  onMount(() => {
    const update = () => {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const ratio = vh / docH;
      const h = Math.max(ratio * vh, 40);
      const maxTop = vh - h;
      const progress = docH > vh ? scrollY / (docH - vh) : 0;

      thumbHeight = h;
      thumbTop = progress * maxTop;

      visible = true;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => { visible = false; }, 1200);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      clearTimeout(hideTimer);
    };
  });
</script>

<div class="scrollbar" aria-hidden="true">
  <div
    class="thumb"
    class:visible
    style="height: {thumbHeight}px; transform: translateY({thumbTop}px);"
  ></div>
</div>

<style>
  .scrollbar {
    position: fixed;
    top: 0;
    right: 0;
    width: 3px;
    height: 100dvh;
    z-index: 9999;
    pointer-events: none;
  }

  .thumb {
    width: 100%;
    background: var(--color-text);
    border-radius: 9999px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .thumb.visible {
    opacity: 0.35;
  }
</style>
