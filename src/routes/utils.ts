import { moviePath, personPath, tvPath } from 'routes';
import type { ContentType } from 'types/content';

export const routeByType = ({
  id,
  type
}: {
  id: number;
  type: ContentType;
}) => {
  switch (type) {
    case 'tv':
      return tvPath({ id });
    case 'movie':
      return moviePath({ id });
    case 'person':
      return personPath({ id });
    default:
      break;
  }
};
