import type { Href } from 'expo-router';

export const tvPath = (params: { id: number }): Href<string> => ({
  pathname: '/tv/[id]',
  params
});

export const tvImagesPath = (params: {
  id: number;
  type: 'posters' | 'backdrops';
}): Href<string> => ({
  pathname: '/tv/[id]/images/[type]',
  params
});

export const moviePath = (params: { id: number }): Href<string> => ({
  pathname: '/movie/[id]',
  params
});

export const movieImagesPath = (params: {
  id: number;
  type: 'posters' | 'backdrops';
}): Href<string> => ({
  pathname: '/movie/[id]/images/[type]',
  params
});

export const personPath = (params: { id: number }): Href<string> => ({
  pathname: '/person/[id]',
  params
});

export const personMoviesPath = (params: { id: number }): Href<string> => ({
  pathname: '/person/[id]/movies',
  params
});

export const personTvPath = (params: { id: number }): Href<string> => ({
  pathname: '/person/[id]/tv',
  params
});

export const personImagePath = (params: {
  id: number;
  start: number;
}): Href<string> => ({
  pathname: '/person/[id]/images/[start]',
  params
});

export const networkPath = (params: { id: number }): Href<string> => ({
  pathname: '/network/[id]',
  params
});

export const genreMoviePath = (params: { id: number }): Href<string> => ({
  pathname: '/genre/[id]/movie',
  params
});

export const genreTvPath = (params: { id: number }): Href<string> => ({
  pathname: '/genre/[id]/tv',
  params
});

export const videoPath = (params: { id: string }): Href<string> => ({
  pathname: '/video/[id]',
  params
});
