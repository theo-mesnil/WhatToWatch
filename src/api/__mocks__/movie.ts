import { NETWORK_NETFLIX_ID } from 'constants/networks';
import type { NetworkId } from 'types/content';

export const MOCK_MOVIE = {
  data: {
    coverUrl: '/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg',
    genres: 'Animation - Family',
    networkLink: {
      id: NETWORK_NETFLIX_ID as NetworkId,
      link: 'link'
    },
    overview:
      'Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.',
    rating: { count: 840, votes: 7.4 },
    releaseDate: '2024-06-20',
    runtime: 94,
    tagline: 'Things just got a little more despicable.',
    title: 'Despicable Me 4'
  }
};
