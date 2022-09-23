import * as React from 'react';

import { Thumb } from 'components/Thumb';

type ContentThumbProps = {
  item: {
    id: string;
    name?: string;
    backdrop_path?: string;
    poster_path?: string;
    title?: string;
    media_type: 'tv' | 'movie';
  };
  withTitle?: boolean;
  withBackdropImage?: boolean;
};

export function ContentThumb({
  item,
  withBackdropImage,
  withTitle = true,
  ...rest
}: ContentThumbProps) {
  const imageUrl = withBackdropImage ? item?.backdrop_path : item?.poster_path;

  return (
    <Thumb
      imageUrl={imageUrl}
      type={item.media_type}
      title={withTitle && (item?.name || item?.title)}
      {...rest}
    />
  );
}
