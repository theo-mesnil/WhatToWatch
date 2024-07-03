import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { Animated } from 'react-native';
import { theme } from 'theme';

import type { UseGetDiscoverTvApiResponse } from 'api/discover';
import { useGetDiscoverTv } from 'api/discover';
import { GradientHeader } from 'components/GradientHeader';
import { Header } from 'components/Header';
import { LargeThumb } from 'components/LargeThumb';
import { NetworkLogo } from 'components/NetworkLogo';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import { VerticalList } from 'components/VerticalList';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import type { NetworkId } from 'types/content';
import { getNetworkColor } from 'utils/networks';

export default function Network() {
  const params = useLocalSearchParams<{ id: string }>();
  const networkID = Number(params?.id) as NetworkId;
  const navigation = useNavigation();
  const { containerStyle } = useSafeHeights();
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverTv({
    params: [
      {
        name: 'with_networks',
        value: networkID
      }
    ]
  });

  const firstItem = !isLoading && data?.pages[0].results[0];

  const renderItem = ({
    item: { id, poster_path }
  }: ListRenderItemInfo<UseGetDiscoverTvApiResponse['results'][number]>) => (
    <ThumbLink isLoading={isLoading} href={`/tv/${id}`}>
      <Thumb type="tv" imageUrl={poster_path} />
    </ThumbLink>
  );

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        withBackButton
        customTitle={<NetworkLogo id={networkID} width={100} />}
        scrollY={scrollYPosition}
      />
    ),
    [networkID, scrollYPosition]
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout isView>
      <GradientHeader
        colors={[...getNetworkColor(networkID), theme.colors.behind]}
        scrollY={scrollYPosition}
      />
      <VerticalList
        renderItem={renderItem}
        id="network"
        ListHeaderComponent={
          <ThumbLink isLoading={isLoading} href={`/tv/${firstItem?.id}`}>
            <LargeThumb
              type="tv"
              id={firstItem?.id}
              title={firstItem?.name}
              imageUrl={firstItem?.backdrop_path}
            />
          </ThumbLink>
        }
        isLoading={isLoading}
        getScrollYPosition={getScrollYPosition}
        results={data?.pages?.map((page) => page.results).flat()}
        onEndReached={loadMore}
        contentContainerStyle={containerStyle}
      />
    </BasicLayout>
  );
}
