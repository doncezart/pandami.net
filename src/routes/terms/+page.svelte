<svelte:head>
  <title>Terms of Service | Pandami</title>
  <meta name="description" content="Terms and conditions for using Pandami and its services." />
  <link rel="canonical" href="https://pandami.net/terms" />
  <meta property="og:title" content="Terms of Service | Pandami" />
  <meta property="og:description" content="Terms and conditions for using Pandami and its services." />
  <meta property="og:url" content="https://pandami.net/terms" />
  <meta name="twitter:title" content="Terms of Service | Pandami" />
  <meta name="twitter:description" content="Terms and conditions for using Pandami and its services." />
</svelte:head>

<main class="legal-page" id="main-content">
  <div class="inner">
    <header class="page-header">
      <p class="eyebrow">Legal</p>
      <h1>Terms of Service</h1>
      <p class="updated">Last updated: May 2026</p>
    </header>

    <div class="prose">
      <p>
        These are the ground rules for using pandami.net. Nothing surprising.
      </p>

      <h2>Using this site</h2>
      <p>
        This site exists to describe what Pandami offers and to let you get in
        touch. Do not use the contact form to spam or to send messages designed
        to cause harm. We reserve the right to ignore or block submissions that
        look like abuse.
      </p>
      <p>
        The information on this site is provided as-is. We do our best to keep
        it accurate and up to date, but we cannot guarantee it will always be
        perfect.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site, text, design, structure, belongs to Pandami.
        You are welcome to share links or quote small sections with attribution,
        but reproducing the site's content wholesale without permission is not
        okay.
      </p>

      <h2>Third-party links</h2>
      <p>
        We link to third-party services including our tools and external
        platforms. We are not responsible for what happens on those sites.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by Romanian law. Any disputes would fall under
        Romanian jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:contact@pandami.net">contact@pandami.net</a>.
      </p>
    </div>
  </div>
</main>

<style>
  .legal-page {
    min-height: calc(100vh - 64px);
    padding: 5rem 1.25rem 6rem;
  }

  .inner {
    max-width: 720px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .eyebrow {
    margin: 0 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-muted);
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 900;
    line-height: 1.1;
    color: var(--color-text);
  }

  .updated {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-muted);
  }

  .prose {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .prose p {
    margin: 0 0 1rem;
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text);
  }

  .prose h2 {
    margin: 2rem 0 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .prose a {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .prose a:hover {
    color: var(--color-accent-hover);
  }
</style>
