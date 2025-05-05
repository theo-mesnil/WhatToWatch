import type { FlashListProps } from '@shopify/flash-list'
import { FormattedMessage } from 'react-intl'

import type { UseGetTrendingApiResponse } from '~/api/trending'
import { useGetTrending } from '~/api/trending'
import { List } from '~/components/List'
import { NumberThumb } from '~/components/NumberThumb'
import { ThumbLink } from '~/components/ThumbLink'
import { tvPath } from '~/routes'

type Item = UseGetTrendingApiResponse['tv']['results'][number]

export function Top10Series() {
  const { data, isLoading } = useGetTrending({
    type: 'tv',
  })

  const renderItem: FlashListProps<Item>['renderItem'] = ({ index, item: { id, poster_path } }) => (
    <ThumbLink href={tvPath({ id })}>
      <NumberThumb imageUrl={poster_path} number={index + 1} type="tv" />
    </ThumbLink>
  )

  return (
    <List<Item>
      gap={0}
      id="top-10-series"
      isLoading={isLoading}
      renderItem={renderItem}
      results={data?.pages
        ?.map(page => page.results)
        .flat()
        .slice(0, 10)}
      title={<FormattedMessage defaultMessage="Top 10 Series" id="u2t1Js" />}
      withoutSizing
    />
  )
}
