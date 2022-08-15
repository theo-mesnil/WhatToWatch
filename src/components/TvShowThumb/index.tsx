import * as React from 'react';

import { Thumb } from 'components/Thumb';

type TvShowThumbProps = {
  item: {
    id: number;
    backdrop_path: string;
    poster_path: string;
  };
  withBackdropImage?: boolean;
};

export function TvShowThumb({
  item,
  withBackdropImage,
  ...rest
}: TvShowThumbProps) {
  const imageUrl = withBackdropImage ? item?.backdrop_path : item?.poster_path;

  return <Thumb imageUrl={imageUrl} type="tv" {...rest} />;
}
