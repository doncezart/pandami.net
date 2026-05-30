<section class="problem">
  <div class="inner">
    <div class="tag">The Problem</div>
    <h2 class="headline">
      Social media is a full-time job.<br />You already have one.
    </h2>
    <div class="points">
      <div class="point">
        <span class="icon">⏰</span>
        <div>
          <strong>Time you don't have</strong>
          <p>Posting daily, responding to comments, planning content — it adds up fast.</p>
        </div>
      </div>
      <div class="point">
        <span class="icon">🔁</span>
        <div>
          <strong>Consistency you can't maintain</strong>
          <p>Algorithms reward consistency. Life gets in the way. The results suffer.</p>
        </div>
      </div>
      <div class="point">
        <span class="icon">🤷</span>
        <div>
          <strong>Strategy you're not sure about</strong>
          <p>Trends change weekly. What worked six months ago doesn't anymore.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .problem {
    background-color: var(--color-text);
    color: #ffffff;
    padding: 5rem 1.25rem;
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background: rgba(220, 38, 38, 0.2);
    color: #fca5a5;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
  }

  .headline {
    margin: 0 0 3rem;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 900;
    line-height: 1.2;
    color: #ffffff;
  }

  .points {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 640px) {
    .points {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .point {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .point strong {
    display: block;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }

  .point p {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
  }
</style>
