import * as React from 'react';

export function formatGenreList(genres) {
  return genres?.map((genre, index) => {
    return (
      <React.Fragment key={genre?.name}>
        {index > 0 && ', '}
        {genre?.name}
      </React.Fragment>
    );
  });
}
