import * as React from 'react';

import { MovieThumb } from 'components/MovieThumb';
import { PeopleThumb } from 'components/PeopleThumb';
import { TvShowThumb } from 'components/TvShowThumb';

type RenderItemList = {
  data?: any;
  type?: ContentType;
};

export function RenderItemList({ data, type = 'all' }: RenderItemList) {
  const mediaType = type === 'all' ? data?.item?.media_type : type;

  if (mediaType === 'person') {
    return <PeopleThumb {...data} aspectRatio={2 / 3} />;
  }
  if (mediaType === 'tv') {
    return <TvShowThumb {...data} />;
  }
  if (mediaType === 'movie') {
    return <MovieThumb {...data} />;
  }
  return null;
}
