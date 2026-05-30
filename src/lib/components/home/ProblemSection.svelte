<section class="problem">
  <div class="inner">
    <p class="label">The problem</p>
    <h2 class="headline">
      Social media is a full-time job.<br />You already have one.
    </h2>
    <div class="points">
      <div class="point">
        <span class="num">01</span>
        <div class="point-text">
          <p class="point-title">Time you don't have</p>
          <p class="point-body">Posting daily, responding to comments, planning content — it adds up fast.</p>
        </div>
      </div>
      <div class="point">
        <span class="num">02</span>
        <div class="point-text">
          <p class="point-title">Consistency you can't maintain</p>
          <p class="point-body">Algorithms reward consistency. Life gets in the way. The results suffer.</p>
        </div>
      </div>
      <div class="point">
        <span class="num">03</span>
        <div class="point-text">
          <p class="point-title">Strategy you're not sure about</p>
          <p class="point-body">Trends change weekly. What worked six months ago doesn't anymore.</p>
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

  .label {
    margin: 0 0 1.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255, 255, 255, 0.35);
  }

  .headline {
    margin: 0 0 3rem;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 900;
    line-height: 1.2;
    color: #ffffff;
  }

  .points {
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .point {
    display: flex;
    gap: 2rem;
    padding: 1.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    align-items: baseline;
  }

  .num {
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
    width: 1.5rem;
  }

  .point-text {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .point-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
  }

  .point-body {
    margin: 0;
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.6;
  }
</style>
