import type { IconProps } from 'components/Icon';
import type { ContentType } from 'types/content';

export function getIconType(type: ContentType): IconProps['name'] {
  switch (type) {
    case 'movie':
      return 'FilmFill';
    case 'tv':
      return 'TvFill';
    case 'person':
      return 'PersonFill';
    default:
      return 'StarFill';
  }
}
