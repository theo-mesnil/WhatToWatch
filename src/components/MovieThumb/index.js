import React from 'react';

import { Thumb } from 'components/Thumb';

export function MovieThumb({ item, withBackdropImage, ...rest }) {
  const imageUrl = withBackdropImage ? item?.backdrop_path : item?.poster_path;

  return (
    <Thumb
      id={item.id}
      imageUrl={imageUrl}
      type="movie"
      title={item?.name}
      {...rest}
    />
  );
}
