import React from 'react';

import { Thumb } from 'components/Thumb';

export function ImageThumb({ item, ...rest }) {
  return <Thumb imageUrl={item?.source} {...rest} />;
}
