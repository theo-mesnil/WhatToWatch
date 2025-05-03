import type { Href } from 'expo-router'

export const tvPath = (params: { id: number }): Href => ({
  params,
  pathname: '/tv/[id]',
})

export const tvImagesPath = (params: { id: number; type: 'backdrops' | 'posters' }): Href => ({
  params,
  pathname: '/tv/[id]/images/[type]',
})

export const moviePath = (params: { id: number }): Href => ({
  params,
  pathname: '/movie/[id]',
})

export const movieImagesPath = (params: { id: number; type: 'backdrops' | 'posters' }): Href => ({
  params,
  pathname: '/movie/[id]/images/[type]',
})

export const personPath = (params: { id: number }): Href => ({
  params,
  pathname: '/person/[id]',
})

export const personMoviesPath = (params: { id: number }): Href => ({
  params,
  pathname: '/person/[id]/movies',
})

export const personTvPath = (params: { id: number }): Href => ({
  params,
  pathname: '/person/[id]/tv',
})

export const personImagePath = (params: { id: number; start: number }): Href => ({
  params,
  pathname: '/person/[id]/images/[start]',
})

export const networkPath = (params: { id: number }): Href => ({
  params,
  pathname: '/network/[id]',
})

export const genreMoviePath = (params: { id: number }): Href => ({
  params,
  pathname: '/genre/[id]/movie',
})

export const genreTvPath = (params: { id: number }): Href => ({
  params,
  pathname: '/genre/[id]/tv',
})

export const videoPath = (params: { id: string }): Href => ({
  params,
  pathname: '/video/[id]',
})

export const watchlistPath = (params: { type: 'movies' | 'tv' }): Href => ({
  params,
  pathname: '/watchlist/[type]',
})

export const favoritePath = (params: { type: 'movies' | 'tv' }): Href => ({
  params,
  pathname: '/favorite/[type]',
})

export const recommendationsPath = (params: { type: 'movie' | 'tv' }): Href => ({
  params,
  pathname: '/recommendations/[type]',
})
