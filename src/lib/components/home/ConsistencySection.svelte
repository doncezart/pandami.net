<section class="consistency">
  <div class="inner">
    <div class="top">
      <p class="label">Why it matters</p>
      <h2 class="headline">Inconsistency is invisible,<br>until it costs you.</h2>
      <p class="body">
        Every missed post, every week of silence, every off-brand piece of content
        is a signal to the algorithm and your audience: this brand isn't serious.
        Recovering trust takes twice as long as building it.
      </p>
    </div>
    <div class="quote-wrap">
      <blockquote>
        <p>“I knew I needed to be consistent. I just couldn’t keep up on top of everything else.”</p>
      </blockquote>
      <p class="attribution">The business owner you recognise yourself in</p>
    </div>
  </div>
</section>

<style>
  .consistency {
    padding: 5rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }

  @media (max-width: 768px) {
    .inner {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  .label {
    margin: 0 0 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent);
  }

  .headline {
    margin: 0 0 1.125rem;
    font-size: clamp(1.5rem, 3vw, 2.125rem);
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-text);
  }

  .body {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.7;
  }

  .quote-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }

  blockquote {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  blockquote::before {
    content: '\201C';
    display: block;
    font-size: 2.5rem;
    line-height: 1;
    color: var(--color-accent);
    font-style: normal;
    font-weight: 500;
  }

  blockquote p {
    margin: 0;
    font-size: clamp(1rem, 1.75vw, 1.25rem);
    font-style: italic;
    font-weight: 400;
    color: var(--color-text);
    line-height: 1.6;
  }

  .attribution {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--color-muted);
  }
</style>
