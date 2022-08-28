import * as React from 'react';

import { Thumb } from 'components/Thumb';

type MovieThumbProps = {
  item: {
    id: string;
    name: string;
    backdrop_path?: string;
    poster_path?: string;
  };
  withBackdropImage?: boolean;
};

export function MovieThumb({
  item,
  withBackdropImage,
  ...rest
}: MovieThumbProps) {
  const imageUrl = withBackdropImage ? item?.backdrop_path : item?.poster_path;

  return (
    <Thumb imageUrl={imageUrl} type="movie" title={item?.name} {...rest} />
  );
}
