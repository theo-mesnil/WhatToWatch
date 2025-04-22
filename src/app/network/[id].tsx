import type { FlashListProps } from '@shopify/flash-list'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import * as React from 'react'
import { Animated } from 'react-native'

import type { UseGetDiscoverTvApiResponse } from '~/api/discover'
import { useGetDiscoverTv } from '~/api/discover'
import { GradientHeader } from '~/components/GradientHeader'
import { Header } from '~/components/Header'
import { LargeThumb } from '~/components/LargeThumb'
import { NetworkLogo } from '~/components/NetworkLogo'
import { Thumb } from '~/components/Thumb'
import { ThumbLink } from '~/components/ThumbLink'
import { VerticalList } from '~/components/VerticalList'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { BasicLayout } from '~/layouts//Basic'
import { tvPath } from '~/routes'
import { theme } from '~/theme'
import type { NetworkId } from '~/types/content'
import { getNetworkColor } from '~/utils/networks'

type Item = UseGetDiscoverTvApiResponse['results'][number]

export default function Network() {
  const params = useLocalSearchParams<{ id: string }>()
  const networkID = Number(params?.id) as NetworkId
  const navigation = useNavigation()
  const { containerStyle } = useSafeHeights()
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverTv({
    params: [
      {
        name: 'with_networks',
        value: networkID,
      },
    ],
  })

  const firstItem = !isLoading && data?.pages[0].results[0]

  const renderItem: FlashListProps<Item>['renderItem'] = ({ item: { id, poster_path } }) => (
    <ThumbLink href={tvPath({ id })} isLoading={isLoading}>
      <Thumb imageUrl={poster_path} type="tv" />
    </ThumbLink>
  )

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        customTitle={<NetworkLogo id={networkID} width={100} />}
        scrollY={scrollYPosition}
        withBackButton
      />
    ),
    [networkID, scrollYPosition]
  )

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout isView>
      <GradientHeader
        colors={[...getNetworkColor(networkID), theme.colors.behind]}
        scrollY={scrollYPosition}
      />
      <VerticalList<Item>
        contentContainerStyle={containerStyle}
        getScrollYPosition={getScrollYPosition}
        id="network"
        isLoading={isLoading}
        ListHeaderComponent={
          <ThumbLink href={tvPath({ id: firstItem?.id })} isLoading={isLoading}>
            <LargeThumb
              id={firstItem?.id}
              imageUrl={firstItem?.backdrop_path}
              // @ts-expect-error wrong ts api from tmdb
              title={firstItem?.name}
              type="tv"
            />
          </ThumbLink>
        }
        onEndReached={loadMore}
        renderItem={renderItem}
        results={data?.pages?.map(page => page.results).flat()}
      />
    </BasicLayout>
  )
}
