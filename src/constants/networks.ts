import type { NetworkId } from 'types/content';

export type NetworksList = {
  id: NetworkId;
  slug: string;
  title: string;
}[];

export const networksList: NetworksList = [
  { id: 213, title: 'Netflix', slug: 'netflix' },
  { id: 2739, title: 'Disney+', slug: 'disneyplus' },
  { id: 2552, title: 'Apple TV+', slug: 'appletv' },
  { id: 1024, title: 'Amazon', slug: 'amazon' },
  { id: 49, title: 'HBO', slug: 'hbo' },
  { id: 453, title: 'Hulu', slug: 'hulu' },
  { id: 67, title: 'Showtime', slug: 'showtime' },
  { id: 19, title: 'FOX', slug: 'fox' }
];
