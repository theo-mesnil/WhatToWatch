import Movie from 'app/movie/[id]';

import { MOCK_MOVIE } from 'api/__mocks__/movie';

import * as movie from '../src/api/movie';
import { render, screen } from '../tests/render';

describe('<Movie />', () => {
  test('Text renders correctly on HomeScreen', () => {
    jest
      .spyOn(movie, 'useGetMovie')
      .mockReturnValue(MOCK_MOVIE as movie.UseMovie);

    render(<Movie />);

    const textLabel = screen.getByTestId('release-date');

    expect(textLabel).toHaveTextContent('June 20, 2024');
  });
});
