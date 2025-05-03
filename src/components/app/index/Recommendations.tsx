import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetRecommendations } from '~/api/account'
import { useGetRecommendations } from '~/api/account'
import { List } from '~/components/List'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { recommendationsPath } from '~/routes'
import { routeByType } from '~/routes/utils'

type Item = MovieItem | TVItem
// Define more specific types
type MovieItem = UseGetRecommendations['movie']['results'][number]
type RecommendationsProps = {
  type: 'movie' | 'tv'
}

type TVItem = UseGetRecommendations['tv']['results'][number]

export function Recommendations({ type }: RecommendationsProps) {
  const { data, isLoading } = useGetRecommendations({
    type,
  })

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item }) => {
    return (
      <ThumbLink href={routeByType({ id: item?.id, type })} isLoading={isLoading}>
        <Thumb imageUrl={item?.poster_path} imageWidth="w300" type="tv" />
      </ThumbLink>
    )
  }

  return (
    <List<Item>
      icon="user"
      id={`recommendations-${type}`}
      isLoading={isLoading}
      renderItem={renderItem}
      results={data?.pages?.map(page => page.results).flat()}
      title={
        type === 'movie' ? (
          <FormattedMessage defaultMessage="Movies for you" id="u+53eO" />
        ) : (
          <FormattedMessage defaultMessage="Series for you" id="OoZY78" />
        )
      }
      titleHref={recommendationsPath({ type })}
    />
  )
}
