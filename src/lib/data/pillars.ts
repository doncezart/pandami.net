// src/lib/data/pillars.ts
export type PillarSubItem = {
  label: string;
  description: string;
};

export type Pillar = {
  id: string;
  label: string;
  description: string;
  iconName: string;
  subItems?: PillarSubItem[];
};

export const pillars: Pillar[] = [
  {
    id: 'strategy',
    label: 'Strategy',
    description:
      'We research your niche, audience, and competitors before a single post goes out.',
    iconName: 'Target',
  },
  {
    id: 'content',
    label: 'Content Production',
    description:
      'Scripting, recording direction, editing, thumbnails. Delivered ready to publish.',
    iconName: 'Film',
  },
  {
    id: 'scheduling',
    label: 'Scheduling and Posting',
    description: "We manage the calendar and hit publish. You don't lift a finger.",
    iconName: 'CalendarDays',
  },
  {
    id: 'community',
    label: 'Community Building',
    description:
      'From social comments and DMs to full Discord server setup, moderation, bots, and automations. We build and run the community around your brand.',
    iconName: 'Users',
    subItems: [
      {
        label: 'Social Media Communities',
        description:
          'Responding to comments, managing DMs, and fostering engagement across all platforms.',
      },
      {
        label: 'Discord Servers',
        description:
          'Full server creation, channel architecture, role structure, moderation rules, custom bots, and ongoing moderation.',
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics and Reporting',
    description: 'We watch the numbers and report back on what is actually working.',
    iconName: 'BarChart2',
  },
  {
    id: 'automation',
    label: 'Automation',
    description: 'Workflows and tools that scale what is working without scaling the cost.',
    iconName: 'Zap',
  },
];
