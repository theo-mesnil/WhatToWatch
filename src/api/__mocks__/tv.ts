import type { UseGetTv } from 'api/tv'
import { NETWORK_HBO_ID } from 'constants/networks'

export const MOCK_TV: UseGetTv['data'] = {
  coverUrl: '/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
  endYear: 2024,
  genres: 'Sci-Fi & Fantasy - Drama',
  name: 'House of the Dragon',
  overview:
    'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
  rating: { count: 4773, votes: 8.4 },
  runtime: 68,
  seasons: [
    {
      air_date: '2022-08-21',
      episode_count: 53,
      id: 309556,
      name: 'Specials',
      overview: '',
      poster_path: '/qVU4112Ob2ikHBu4VRC50MdWZcM.jpg',
      season_number: 0,
      vote_average: 0,
    },
    {
      air_date: '2022-08-20',
      episode_count: 10,
      id: 134965,
      name: 'Season 1',
      overview: '',
      poster_path: '/m7ta0kNg2ONvnBFF76miVvbWK1V.jpg',
      season_number: 1,
      vote_average: 8,
    },
    {
      air_date: '2024-06-16',
      episode_count: 8,
      id: 368014,
      name: 'Season 2',
      overview: '',
      poster_path: '/xhjADf5sslq7lbRjc50FgvIYIkT.jpg',
      season_number: 2,
      vote_average: 7.9,
    },
  ],
  startYear: 2022,
  tagline: 'All must choose.',
}

export const MOCK_TV_WITH_NETWORK: UseGetTv['data'] = {
  ...MOCK_TV,
  networkLink: {
    id: NETWORK_HBO_ID,
    link: 'link-to-network',
  },
}
