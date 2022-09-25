import { MovieFillIcon, PeopleFillIcon, TvFillIcon } from 'components/Icon';

export function getIconType(type: ContentType) {
  switch (type) {
    case 'movie':
      return MovieFillIcon;
    case 'tv':
      return TvFillIcon;
    case 'person':
      return PeopleFillIcon;
    default:
      return null;
  }
}
