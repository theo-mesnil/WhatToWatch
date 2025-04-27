import type { IconProps } from '~/components/Icon'
import type { ContentType } from '~/types/content'

export function getIconType(type: ContentType): IconProps['name'] {
  switch (type) {
    case 'movie':
      return 'film'
    case 'person':
      return 'user'
    case 'tv':
      return 'tv'
    default:
      return 'ellipsis-horizontal'
  }
}
