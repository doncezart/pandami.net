import { describe, it, expect } from 'vitest';
import { streamers } from './streamers.ts';

describe('streamers', () => {
  it('exports an array', () => {
    expect(Array.isArray(streamers)).toBe(true);
  });

  it('each streamer has name and subdomain', () => {
    expect(streamers.every((s) => Boolean(s.name) && Boolean(s.subdomain))).toBe(true);
  });
});
