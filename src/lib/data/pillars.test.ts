import { describe, it, expect } from 'vitest';
import { pillars } from './pillars.ts';

describe('pillars', () => {
  it('exports exactly six pillars', () => {
    expect(pillars).toHaveLength(6);
  });

  it('each pillar has id, label, description, and iconName', () => {
    for (const pillar of pillars) {
      expect(pillar.id, `pillar missing id`).toBeTruthy();
      expect(pillar.label, `pillar ${pillar.id} missing label`).toBeTruthy();
      expect(pillar.description, `pillar ${pillar.id} missing description`).toBeTruthy();
      expect(pillar.iconName, `pillar ${pillar.id} missing iconName`).toBeTruthy();
    }
  });

  it('all pillar IDs are unique', () => {
    const ids = pillars.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('community pillar has exactly two subItems', () => {
    const community = pillars.find((p) => p.id === 'community');
    expect(community).toBeDefined();
    expect(community!.subItems).toHaveLength(2);
  });
});
