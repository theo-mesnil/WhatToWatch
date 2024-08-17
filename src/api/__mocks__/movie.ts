import type { UseGetMovie } from 'api/movie';
import { NETWORK_NETFLIX_ID } from 'constants/networks';

export const MOCK_MOVIE: UseGetMovie['data'] = {
  coverUrl: '/hziiv14OpD73u9gAak4XDDfBKa2.jpg',
  genres: 'Adventure - Fantasy',
  overview:
    "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.",
  rating: { count: 26908, votes: 7.9 },
  releaseDate: '2001-11-16',
  runtime: 152,
  tagline: 'Let the magic begin.',
  title: "Harry Potter and the Philosopher's Stone"
};

export const MOCK_MOVIE_WITH_NETWORK: UseGetMovie['data'] = {
  ...MOCK_MOVIE,
  networkLink: {
    id: NETWORK_NETFLIX_ID,
    link: 'link-to-network'
  }
};
