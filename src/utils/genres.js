import React from 'react';
import { Fragment } from 'react';

export function formatGenreList(genres) {
  return genres?.map((genre, index) => {
    return (
      <Fragment key={genre?.name}>
        {index > 0 && ', '}
        {genre?.name}
      </Fragment>
    );
  });
}
