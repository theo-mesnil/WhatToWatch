import { MOCK_LOGO, MOCK_LOGO_EMPTY } from '~/api/__mocks__/logo'
import { MOCK_MOVIE, MOCK_MOVIE_WITH_NETWORK } from '~/api/__mocks__/movie'
import * as logo from '~/api/logo'
import * as movie from '~/api/movie'
import Movie from '~/app/movie/[id]'

import { mockQuery, render, screen } from '../tests/render'

describe('<Movie />', () => {
  test('should render correctly', () => {
    jest.spyOn(movie, 'useGetMovie').mockReturnValue(mockQuery(MOCK_MOVIE))
    jest.spyOn(logo, 'useGetContentLogo').mockReturnValue(mockQuery(MOCK_LOGO))

    render(<Movie />)

    expect(screen.getByTestId('release-date')).toHaveTextContent('November 16, 2001')
    expect(screen.getByTestId('runtime')).toHaveTextContent('2h32m')
    expect(screen.getByTestId('votes')).toHaveTextContent('7.9 (26908)')
    expect(screen.queryByTestId('network-1234')).toBeFalsy()
    expect(screen.queryByTestId('subtitle')).toHaveTextContent('Adventure - Fantasy')
    expect(screen.queryByTestId('cover-title')).toBeFalsy()
    expect(screen.queryByTestId('cover-image')).toHaveProp('source', {
      uri: 'https://image.tmdb.org/t/p/w1280/hziiv14OpD73u9gAak4XDDfBKa2.jpg',
    })
    expect(screen.queryByTestId('cover-logo')).toHaveProp(
      'src',
      'https://image.tmdb.org/t/p/w500url-logo.png'
    )
  })

  test('should render correctly with network', () => {
    jest.spyOn(movie, 'useGetMovie').mockReturnValue(mockQuery(MOCK_MOVIE_WITH_NETWORK))
    jest.spyOn(logo, 'useGetContentLogo').mockReturnValue(mockQuery(MOCK_LOGO))

    render(<Movie />)

    expect(screen.getByTestId('network-213')).toBeTruthy()
  })

  test('should render correctly without logo', () => {
    jest.spyOn(movie, 'useGetMovie').mockReturnValue(mockQuery(MOCK_MOVIE))
    jest.spyOn(logo, 'useGetContentLogo').mockReturnValue(mockQuery(MOCK_LOGO_EMPTY))

    render(<Movie />)

    expect(screen.queryByTestId('cover-title')).toHaveTextContent(
      "Harry Potter and the Philosopher's Stone"
    )
    expect(screen.queryByTestId('cover-logo')).toBeFalsy()
  })
})
