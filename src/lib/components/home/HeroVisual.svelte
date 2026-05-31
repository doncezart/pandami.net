<div class="visual-wrap">
  <div class="inner">
    <div class="window">
      <div class="titlebar">
        <div class="yt-logo">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-label="YouTube Studio">
            <rect width="22" height="16" rx="3" fill="#FF0000"/>
            <path d="M9 4.5 15 8 9 11.5V4.5Z" fill="white"/>
          </svg>
          <span class="studio-label">Studio</span>
        </div>
        <div class="tabs">
          <span class="tab active">Channel analytics</span>
          <span class="tab">Content</span>
          <span class="tab">Audience</span>
        </div>
        <span class="period">Last 30 days</span>
      </div>

      <div class="body">
        <div class="metrics">
          <div class="metric">
            <span class="metric-label">Views</span>
            <span class="metric-value">2.3m</span>
            <span class="metric-delta up">↑ 60% vs prev. 30d</span>
          </div>
          <div class="metric">
            <span class="metric-label">Impressions</span>
            <span class="metric-value">14.6m</span>
            <span class="metric-delta up">↑ 38% vs prev. 30d</span>
          </div>
          <div class="metric">
            <span class="metric-label">Click-through rate</span>
            <span class="metric-value">13.5%</span>
            <span class="metric-delta up">↑ 1.8% vs prev. 30d</span>
          </div>
          <div class="metric">
            <span class="metric-label">Avg. view duration</span>
            <span class="metric-value">25:31</span>
            <span class="metric-delta up">↑ 18% vs prev. 30d</span>
          </div>
        </div>

        <div class="chart-area">
          <svg viewBox="0 0 900 115" preserveAspectRatio="none" class="chart-svg">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <!-- grid lines -->
            <line x1="0" y1="33" x2="900" y2="33" stroke="#f3f4f6" stroke-width="1"/>
            <line x1="0" y1="66" x2="900" y2="66" stroke="#f3f4f6" stroke-width="1"/>
            <line x1="0" y1="99" x2="900" y2="99" stroke="#f3f4f6" stroke-width="1"/>
            <!-- video upload reference lines (dashed vertical) | unevenly spaced -->
            <line x1="55"  y1="0" x2="55"  y2="115" stroke="#6366f1" stroke-width="0.75" stroke-dasharray="2,3" opacity="0.22"/>
            <line x1="200" y1="0" x2="200" y2="115" stroke="#6366f1" stroke-width="0.75" stroke-dasharray="2,3" opacity="0.22"/>
            <line x1="420" y1="0" x2="420" y2="115" stroke="#6366f1" stroke-width="0.75" stroke-dasharray="2,3" opacity="0.22"/>
            <line x1="565" y1="0" x2="565" y2="115" stroke="#6366f1" stroke-width="0.75" stroke-dasharray="2,3" opacity="0.22"/>
            <line x1="760" y1="0" x2="760" y2="115" stroke="#6366f1" stroke-width="0.75" stroke-dasharray="2,3" opacity="0.22"/>
            <!-- fill | varied: medium / viral+secondary / flop / sharp comeback / solid -->
            <path
              d="M0,95 L30,88 L55,42 L70,30 L85,38 L100,50 L115,44 L130,60 L150,73 L170,83 L185,90 L200,20 L212,13 L222,17 L232,28 L242,24 L255,36 L272,52 L292,64 L315,74 L338,80 L355,76 L370,83 L388,91 L400,96 L420,58 L433,50 L446,57 L460,65 L472,61 L488,73 L508,82 L528,88 L545,94 L558,98 L565,26 L574,17 L584,22 L596,36 L608,30 L620,44 L638,58 L655,69 L672,78 L692,85 L714,91 L738,95 L752,97 L760,36 L772,28 L784,33 L796,44 L808,40 L822,55 L838,66 L856,76 L875,83 L900,89 L900,115 L0,115 Z"
              fill="url(#cg)"
            />
            <!-- line -->
            <path
              d="M0,95 L30,88 L55,42 L70,30 L85,38 L100,50 L115,44 L130,60 L150,73 L170,83 L185,90 L200,20 L212,13 L222,17 L232,28 L242,24 L255,36 L272,52 L292,64 L315,74 L338,80 L355,76 L370,83 L388,91 L400,96 L420,58 L433,50 L446,57 L460,65 L472,61 L488,73 L508,82 L528,88 L545,94 L558,98 L565,26 L574,17 L584,22 L596,36 L608,30 L620,44 L638,58 L655,69 L672,78 L692,85 L714,91 L738,95 L752,97 L760,36 L772,28 L784,33 L796,44 L808,40 L822,55 L838,66 L856,76 L875,83 L900,89"
              fill="none"
              stroke="#6366f1"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            />
          </svg>
          <!-- Upload icons as HTML so they stay square on all screen widths -->
          <div class="icon-row">
            <span class="upload-icon" style="left: 6.11%"></span>
            <span class="upload-icon" style="left: 22.22%"></span>
            <span class="upload-icon" style="left: 46.67%"></span>
            <span class="upload-icon" style="left: 62.78%"></span>
            <span class="upload-icon" style="left: 84.44%"></span>
          </div>
          <div class="chart-labels">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .visual-wrap {
    /* Equal padding so gradient 50% cut falls exactly at window midpoint */
    background: linear-gradient(to bottom, #ffffff 50%, #0A0A0A 50%);
    padding: 1.5rem 1.25rem;
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .window {
    background: #ffffff;
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 1rem;
    background: #f9fafb;
    border-bottom: 1px solid var(--color-border);
    overflow: hidden;
  }

  .yt-logo {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .studio-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .tabs {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    overflow: hidden;
  }

  .tab {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--color-muted);
    padding: 0.25rem 0.625rem;
    border-radius: 0.25rem;
    white-space: nowrap;
  }

  .tab.active {
    background: #ffffff;
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  .period {
    margin-left: auto;
    font-size: 0.6875rem;
    color: var(--color-muted);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .body {
    padding: 1.25rem 1.25rem 0.875rem;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .metric {
    padding: 0.875rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    border-right: 1px solid var(--color-border);
  }

  .metric:last-child {
    border-right: none;
  }

  .metric-label {
    font-size: 0.625rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted);
  }

  .metric-value {
    font-size: 1.375rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.2;
  }

  .metric-delta {
    font-size: 0.5625rem;
    font-weight: 500;
  }

  .metric-delta.up {
    color: #16a34a;
  }

  .chart-area {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .chart-svg {
    width: 100%;
    height: 115px;
    display: block;
  }

  .icon-row {
    position: relative;
    height: 18px;
  }

  .upload-icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    border-radius: 2px;
    background: #6366f1;
    opacity: 0.85;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upload-icon::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-left: 5px solid white;
    margin-left: 1px;
  }

  .chart-labels {
    display: flex;
    justify-content: space-between;
    padding: 0 0.125rem;
    font-size: 0.625rem;
    color: var(--color-muted);
  }

  /* Tablet */
  @media (max-width: 767px) {
    .metrics {
      grid-template-columns: repeat(2, 1fr);
    }
    .metric:nth-child(2) {
      border-right: none;
    }
    .metric:nth-child(3),
    .metric:nth-child(4) {
      border-top: 1px solid var(--color-border);
    }
    .metric:nth-child(4) {
      border-right: none;
    }
    .tab:not(.active) {
      display: none;
    }
    .chart-svg {
      height: 115px;
    }
  }

  /* Mobile */
  @media (max-width: 479px) {
    .visual-wrap {
      padding: 1rem 0.75rem;
    }
    .window {
      border-radius: 0.5rem;
    }
    .titlebar {
      padding: 0.5rem 0.75rem;
    }
    .body {
      padding: 0.875rem 0.875rem 0.625rem;
    }
    .metric-value {
      font-size: 1.125rem;
    }
    .metric-delta {
      font-size: 0.5rem;
    }
    .chart-svg {
      height: 95px;
    }
  }
</style>
