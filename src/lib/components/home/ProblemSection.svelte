<section class="problem">
  <div class="inner">
    <div class="left">
      <p class="label">The problem</p>
      <h2 class="headline">Social media is a full-time job. You already have one.</h2>
      <p class="context">
        Most businesses know they should be posting more. The problem is not awareness.
        It is bandwidth. Quality content demands planning, production, and relentless
        consistency that a small team cannot sustain alongside everything else.
      </p>
    </div>
    <div class="right">
      <div class="card">
        <div class="card-top">
          <span class="num">01</span>
          <p class="card-title">Time you don't have</p>
        </div>
        <p class="card-body">
          Filming, editing, writing captions, scheduling, responding to comments.
          Each task feels small until you add them up and realize social media is
          consuming 20-plus hours a month you never planned to spend on it.
        </p>
      </div>
      <div class="card">
        <div class="card-top">
          <span class="num">02</span>
          <p class="card-title">Consistency you can't maintain</p>
        </div>
        <p class="card-body">
          Algorithms punish gaps. Two weeks of silence can undo months of momentum.
          When your posting depends on your schedule, it will always come second.
        </p>
      </div>
      <div class="card">
        <div class="card-top">
          <span class="num">03</span>
          <p class="card-title">Trends that don't wait</p>
        </div>
        <p class="card-body">
          A trend spotted Monday is old news by Thursday. Without a team ready to
          move the moment an opportunity appears, you are always posting yesterday's content.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .problem {
    background-color: var(--color-text);
    color: #ffffff;
    padding: 5rem 1.25rem 6rem;
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 5rem;
    align-items: start;
  }

  .left {
    position: sticky;
    top: 5rem;
  }

  .label {
    margin: 0 0 1.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-accent);
  }

  .headline {
    margin: 0 0 1.5rem;
    font-size: clamp(1.5rem, 2.75vw, 2.25rem);
    font-weight: 500;
    line-height: 1.25;
    color: #ffffff;
  }

  .context {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .card {
    padding: 2rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .card:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .card-top {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
  }

  .num {
    font-size: 0.6875rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.25);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  .card-title {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 500;
    color: #ffffff;
  }

  .card-body {
    margin: 0;
    padding-left: 2.25rem;
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .problem {
      padding: 3rem 1rem 4rem;
    }

    .inner {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .left {
      position: static;
    }
  }
</style>
