export type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  pillarIds: string[];
  platforms: string[];
  turnaround: string;
};

export const tiers: PricingTier[] = [
  {
    name: 'Starter',
    tagline: 'Establish your presence',
    price: 'Contact for pricing',
    pillarIds: ['strategy', 'content', 'scheduling'],
    platforms: ['Instagram', 'TikTok'],
    turnaround: '5 business days',
  },
  {
    name: 'Growth',
    tagline: 'Accelerate your reach',
    price: 'Contact for pricing',
    pillarIds: ['strategy', 'content', 'scheduling', 'community', 'analytics'],
    platforms: ['Instagram', 'TikTok', 'YouTube', 'X'],
    turnaround: '3 business days',
  },
  {
    name: 'Full Service',
    tagline: 'Total social media ownership',
    price: 'Contact for pricing',
    pillarIds: ['strategy', 'content', 'scheduling', 'community', 'analytics', 'automation'],
    platforms: ['Instagram', 'TikTok', 'YouTube', 'X', 'LinkedIn', 'Discord'],
    turnaround: '2 business days',
  },
];
