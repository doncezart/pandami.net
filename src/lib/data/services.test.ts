import { describe, it, expect } from 'vitest';
import { tiers } from './services.ts';

const VALID_PILLAR_IDS = new Set([
  'strategy',
  'content',
  'scheduling',
  'community',
  'analytics',
  'automation',
]);

describe('services', () => {
  it('exports exactly three pricing tiers', () => {
    expect(tiers).toHaveLength(3);
  });

  it('each tier has required fields', () => {
    for (const tier of tiers) {
      expect(tier.name, 'tier missing name').toBeTruthy();
      expect(tier.tagline, `tier ${tier.name} missing tagline`).toBeTruthy();
      expect(tier.price, `tier ${tier.name} missing price`).toBeTruthy();
      expect(Array.isArray(tier.pillarIds), `tier ${tier.name} pillarIds must be array`).toBe(true);
      expect(tier.pillarIds.length, `tier ${tier.name} must have at least 1 pillarId`).toBeGreaterThan(0);
      expect(Array.isArray(tier.platforms), `tier ${tier.name} platforms must be array`).toBe(true);
      expect(tier.turnaround, `tier ${tier.name} missing turnaround`).toBeTruthy();
    }
  });

  it('all pillarIds reference valid pillar IDs', () => {
    for (const tier of tiers) {
      for (const pillarId of tier.pillarIds) {
        expect(VALID_PILLAR_IDS.has(pillarId), `unknown pillarId "${pillarId}" in tier "${tier.name}"`).toBe(true);
      }
    }
  });

  it('tier names are Starter, Growth, and Full Service', () => {
    const names = tiers.map((t) => t.name);
    expect(names).toContain('Starter');
    expect(names).toContain('Growth');
    expect(names).toContain('Full Service');
  });

  it('Full Service tier includes all pillar IDs', () => {
    const fullService = tiers.find((t) => t.name === 'Full Service');
    expect(fullService).toBeDefined();
    for (const id of VALID_PILLAR_IDS) {
      expect(fullService!.pillarIds).toContain(id);
    }
  });
});
