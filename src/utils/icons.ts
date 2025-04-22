import { MoreIcon, MovieFillIcon, PersonFillIcon, TvFillIcon } from 'components/Icon'
import type { ContentType } from 'types/content'

export function getIconType(type: ContentType) {
  switch (type) {
    case 'movie':
      return MovieFillIcon
    case 'tv':
      return TvFillIcon
    case 'person':
      return PersonFillIcon
    default:
      return MoreIcon
  }
}
