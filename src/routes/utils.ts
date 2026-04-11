import { moviePath, personPath, tvPath } from '~/routes'
import type { ContentType } from '~/types/content'

export const routeByType = ({ id, type }: { id: number; type: ContentType }) => {
  switch (type) {
    case 'person':
      return personPath({ id })
    case 'tv':
      return tvPath({ id })
    default:
      return moviePath({ id })
  }
}
