import * as React from 'react';

import type { ThumbProps } from 'components/Thumb';
import { Thumb } from 'components/Thumb';

type TvShowThumbProps = ThumbProps & {
  item: {
    backdrop_path: string;
    id: number;
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
