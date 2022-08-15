import * as React from 'react';

import { Thumb } from 'components/Thumb';

type ImageThumbProps = {
  item: {
    source: string;
  };
};

export function ImageThumb({ item, ...rest }: ImageThumbProps) {
  return <Thumb imageUrl={item?.source} {...rest} />;
}
