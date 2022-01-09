import React from 'react';
import { FormattedMessage } from 'react-intl';

export const getTrendTitle = (type) => {
  switch (type) {
    case 'movie':
      return <FormattedMessage id="common.movies" />;
    case 'tv':
      return <FormattedMessage id="common.tvShows" />;
    case 'people':
      return <FormattedMessage id="common.people" />;
    case 'all':
      return <FormattedMessage id="common.all" />;
    default:
      return '';
  }
};
