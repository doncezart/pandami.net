<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="inner">
    <div class="brand-col">
      <span class="brand">Pandami</span>
      <p class="tagline">All your social media needs taken care of.</p>
    </div>

    <div class="links-group">
      <nav class="links-col" aria-label="Pages">
        <span class="col-title">Pages</span>
        <a href="/services" class="link">Services</a>
        <a href="/contact" class="link">Contact</a>
      </nav>

      <nav class="links-col" aria-label="Tools">
        <span class="col-title">Tools</span>
        <a href="https://fx.pandami.net" class="link">FX Library</a>
        <a href="https://memes.pandami.net" class="link">Meme Library</a>
        <a href="https://streamaid.pandami.net" class="link">StreamAid</a>
      </nav>
    </div>
  </div>

  <div class="bottom">
    <span class="copy">© {year} Pandami. All rights reserved.</span>
    <nav class="legal-links" aria-label="Legal">
      <a href="/privacy" class="legal-link">Privacy</a>
      <a href="/terms" class="legal-link">Terms</a>
    </nav>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-text);
    color: #ffffff;
    padding: 4rem 1.25rem 0;
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-bottom: 3rem;
  }

  @media (min-width: 640px) {
    .inner {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: 2rem;
    }
  }

  .links-group {
    display: flex;
    gap: 2.5rem;
    align-items: flex-start;
  }

  .brand-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .brand {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  .tagline {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
    max-width: 280px;
  }

  .links-col {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    align-items: flex-end;
    text-align: right;
  }

  .col-title {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.32);
  }

  .link {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    transition: color 0.15s;
  }

  .link:hover {
    color: #ffffff;
  }

  .bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.25rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .copy {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.28);
  }

  .legal-links {
    display: flex;
    gap: 1.25rem;
  }

  .legal-link {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.28);
    text-decoration: none;
    transition: color 0.15s;
  }

  .legal-link:hover {
    color: rgba(255, 255, 255, 0.65);
  }
</style>
