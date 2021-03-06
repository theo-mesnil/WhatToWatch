import { MovieFillIcon, PeopleFillIcon, TvFillIcon } from 'components/Icon';

export function getIconType(type) {
  switch (type) {
    case 'movie':
      return MovieFillIcon;
    case 'tv':
      return TvFillIcon;
    case 'people':
      return PeopleFillIcon;
    default:
      return null;
  }
}
