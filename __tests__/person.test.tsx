import { MOCK_PERSON, MOCK_PERSON_MOVIES, MOCK_PERSON_TV } from '~/api/__mocks__/person'
import * as person from '~/api/person'
import Person from '~/app/person/[id]'

import { mockQuery, render, screen } from '../tests/render'

describe('<Person />', () => {
  test('should render correctly', () => {
    jest.spyOn(person, 'useGetPerson').mockReturnValue(mockQuery(MOCK_PERSON))
    jest.spyOn(person, 'useGetPersonMovieCredits').mockReturnValue(mockQuery(MOCK_PERSON_MOVIES))
    jest.spyOn(person, 'useGetPersonTvCredits').mockReturnValue(mockQuery(MOCK_PERSON_TV))

    render(<Person />)

    expect(screen.getByTestId('department')).toHaveTextContent('Acting')
    expect(screen.getByTestId('birthday')).toHaveTextContent('Born on July 23, 1989 (35y)')
    expect(screen.getByTestId('place-of-birth')).toHaveTextContent(
      'Hammersmith, London, England, UK'
    )
    expect(screen.getByTestId('movies')).toHaveTextContent('1 movie')
    expect(screen.getByTestId('series')).toHaveTextContent('1 serie')
    expect(screen.queryByTestId('cover-title')).toHaveTextContent('Daniel Radcliffe')
    expect(screen.queryByTestId('cover-image')).toHaveProp('source', {
      uri: 'https://image.tmdb.org/t/p/w1280/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg',
    })
  })

  test('should render correctly with deathday', () => {
    jest
      .spyOn(person, 'useGetPerson')
      .mockReturnValue(mockQuery({ ...MOCK_PERSON, deathday: '2024-07-23' }))

    render(<Person />)

    expect(screen.getByTestId('birthday')).toHaveTextContent('Born on July 23, 1989')
    expect(screen.getByTestId('deathday')).toHaveTextContent('Died on July 23, 2024 (35y)')
  })
})
