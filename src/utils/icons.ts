import type { IconProps } from '~/components/icon'
import type { ContentType } from '~/types/content'

export function getIconType(type: ContentType): IconProps['name'] {
  switch (type) {
    case 'movie':
      return 'film'
    case 'person':
      return 'person'
    case 'tv':
      return 'tv'
    default:
      return 'ellipsis-horizontal'
  }
}
