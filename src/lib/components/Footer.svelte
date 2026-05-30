<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="inner">
    <div class="brand-col">
      <span class="brand">Pandami</span>
      <p class="tagline">All your social media needs taken care of.</p>
    </div>

    <div class="links-col">
      <h4 class="col-title">Pages</h4>
      <a href="/services" class="link">Services</a>
      <a href="/contact" class="link">Contact</a>
    </div>

    <div class="links-col">
      <h4 class="col-title">Tools</h4>
      <a href="https://fx.pandami.net" class="link">FX Library</a>
      <a href="https://memes.pandami.net" class="link">Meme Library</a>
      <a href="https://streamaid.pandami.net" class="link">StreamAid</a>
    </div>
  </div>

  <div class="bottom">
    <span>© {year} Pandami. All rights reserved.</span>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-text);
    color: #ffffff;
    padding: 3rem 1.25rem 1.5rem;
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 640px) {
    .inner {
      grid-template-columns: 2fr 1fr 1fr;
    }
  }

  .brand {
    display: block;
    font-weight: 900;
    font-size: 1.25rem;
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

  .brand-col {
    display: flex;
    flex-direction: column;
  }

  .links-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .col-title {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.4);
  }

  .link {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: color 0.15s;
  }

  .link:hover {
    color: #ffffff;
  }

  .bottom {
    max-width: 1200px;
    margin: 2rem auto 0;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
