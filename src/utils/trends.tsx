import { useIntl } from 'react-intl';

export const useGetTrendTitle = () => {
  const { formatMessage } = useIntl();

  const getTrendTitle = (type: Type) => {
    switch (type) {
      case 'movie':
        return formatMessage({ id: 'common.movies' });
      case 'tv':
        return formatMessage({ id: 'common.tvShows' });
      case 'person':
        return formatMessage({ id: 'common.person' });
      case 'all':
        return formatMessage({ id: 'common.all' });
      default:
        return '';
    }
  };

  return getTrendTitle;
};
