import Movie from 'app/movie/[id]';

import { MOCK_MOVIE, MOCK_MOVIE_WITH_NETWORK } from 'api/__mocks__/movie';

import * as movie from '../src/api/movie';
import { mockQuery, render, screen } from '../tests/render';

describe('<Movie />', () => {
  test('should render correctly', () => {
    jest.spyOn(movie, 'useGetMovie').mockReturnValue(mockQuery(MOCK_MOVIE));

    render(<Movie />);

    const releaseDate = screen.getByTestId('release-date');
    expect(releaseDate).toHaveTextContent('November 16, 2001');

    const runtime = screen.getByTestId('runtime');
    expect(runtime).toHaveTextContent('2h32m');

    const votes = screen.getByTestId('votes');
    expect(votes).toHaveTextContent('7.9 (26908)');

    const network = screen.queryByTestId('network-1234');
    expect(network).toBeFalsy();
  });

  test('should render correctly with network', () => {
    jest
      .spyOn(movie, 'useGetMovie')
      .mockReturnValue(mockQuery(MOCK_MOVIE_WITH_NETWORK));

    render(<Movie />);

    const network = screen.queryByTestId('network-213');
    expect(network).toBeTruthy();
  });
});
