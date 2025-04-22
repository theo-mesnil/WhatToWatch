import { MOCK_LOGO, MOCK_LOGO_EMPTY } from '~/api/__mocks__/logo'
import { MOCK_TV, MOCK_TV_WITH_NETWORK } from '~/api/__mocks__/tv'
import * as logo from '~/api/logo'
import * as tv from '~/api/tv'
import Tv from '~/app/tv/[id]'

import { mockQuery, render, screen } from '../tests/render'

describe('<Tv />', () => {
  test('should render correctly', () => {
    jest.spyOn(tv, 'useGetTv').mockReturnValue(mockQuery(MOCK_TV))
    jest.spyOn(logo, 'useGetContentLogo').mockReturnValue(mockQuery(MOCK_LOGO))

    render(<Tv />)

    expect(screen.getByTestId('release-date')).toHaveTextContent('2022 - 2024')
    expect(screen.getByTestId('runtime')).toHaveTextContent('1h8m')
    expect(screen.getByTestId('votes')).toHaveTextContent('8.4 (4773)')
    expect(screen.queryByTestId('network-1234')).toBeFalsy()
    expect(screen.queryByTestId('subtitle')).toHaveTextContent('Sci-Fi & Fantasy - Drama')
    expect(screen.queryByTestId('cover-title')).toBeFalsy()
    expect(screen.queryByTestId('cover-image')).toHaveProp('source', {
      uri: 'https://image.tmdb.org/t/p/w1280/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
    })
    expect(screen.queryByTestId('cover-logo')).toHaveProp(
      'src',
      'https://image.tmdb.org/t/p/w500url-logo.png'
    )
  })

  test('should render correctly with network', () => {
    jest.spyOn(tv, 'useGetTv').mockReturnValue(mockQuery(MOCK_TV_WITH_NETWORK))
    jest.spyOn(logo, 'useGetContentLogo').mockReturnValue(mockQuery(MOCK_LOGO))

    render(<Tv />)

    expect(screen.getByTestId('network-49')).toBeTruthy()
  })

  test('should render correctly without logo', () => {
    jest.spyOn(tv, 'useGetTv').mockReturnValue(mockQuery(MOCK_TV))
    jest.spyOn(logo, 'useGetContentLogo').mockReturnValue(mockQuery(MOCK_LOGO_EMPTY))

    render(<Tv />)

    expect(screen.queryByTestId('cover-title')).toHaveTextContent('House of the Dragon')
    expect(screen.queryByTestId('cover-logo')).toBeFalsy()
  })
})
