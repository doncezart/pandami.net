<svelte:head>
  <title>Privacy Policy | Pandami</title>
  <meta name="description" content="How Pandami collects, uses, and protects your information." />
  <link rel="canonical" href="https://pandami.net/privacy" />
  <meta property="og:title" content="Privacy Policy | Pandami" />
  <meta property="og:description" content="How Pandami collects, uses, and protects your information." />
  <meta property="og:url" content="https://pandami.net/privacy" />
  <meta name="twitter:title" content="Privacy Policy | Pandami" />
  <meta name="twitter:description" content="How Pandami collects, uses, and protects your information." />
</svelte:head>

<main class="legal-page" id="main-content">
  <div class="inner">
    <header class="page-header">
      <p class="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <p class="updated">Last updated: May 2026</p>
    </header>

    <div class="prose">
      <p>
        We care about keeping things simple and honest. Here is what we do with
        your data.
      </p>

      <h2>What we collect</h2>
      <p>
        When you use the contact form, we receive your name, email address, the
        services you are interested in, and anything you add in the optional
        message field. That information comes through to us as a notification.
        We do not store it in a database on our end.
      </p>
      <p>
        We use Umami, a self-hosted analytics tool, to understand how people
        find and use this site. Umami does not use cookies and does not collect
        personal data. It tells us things like which pages are popular and
        roughly where visitors come from, nothing tied to you as an individual.
      </p>
      <p>
        The contact form uses Cloudflare Turnstile for bot protection. Cloudflare
        may process your IP address during the challenge. Their
        <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a>
        covers how they handle that.
      </p>

      <h2>How we use it</h2>
      <p>
        Your contact information is used only to respond to your inquiry. We do
        not add you to any mailing list, sell your data, or share it with third
        parties outside of what is described here.
      </p>

      <h2>Retention</h2>
      <p>
        Your message lives in our Discord as a notification. We do not archive
        contact submissions in a separate system. If you want us to delete it,
        just say so.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to delete any personal data we hold about you. Email
        <a href="mailto:contact@pandami.net">contact@pandami.net</a> and we will
        take care of it.
      </p>

      <h2>Changes</h2>
      <p>
        If anything here changes significantly, we will update this page. The
        date at the top shows when it was last revised.
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
