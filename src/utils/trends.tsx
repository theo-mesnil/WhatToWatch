import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const getTrendTitle = (type: Type) => {
  switch (type) {
    case 'movie':
      return <FormattedMessage id="common.movies" />;
    case 'tv':
      return <FormattedMessage id="common.tvShows" />;
    case 'person':
      return <FormattedMessage id="common.person" />;
    case 'all':
      return <FormattedMessage id="common.all" />;
    default:
      return '';
  }
};
