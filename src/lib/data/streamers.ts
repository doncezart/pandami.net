export type Streamer = {
  name: string;
  subdomain: string;
};

// Add streamers here as they are onboarded
export const streamers: Streamer[] = [
  { name: 'Santea', subdomain: 'santea' },
  { name: 'Neon', subdomain: 'neon' },
  { name: 'Dano', subdomain: 'dano' },
];
