import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { useGetDiscoverTvShow } from 'api/discover';
import { Gradient } from 'components/Gradient';
import { LargeThumb } from 'components/LargeThumb';
import { TvShowThumb } from 'components/TvShowThumb';
import { VerticalList } from 'components/VerticalList';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import { getNetworkColor } from 'utils/networks';

import { Header } from './components/Header';

export default function Network() {
  const params = useLocalSearchParams();
  const networkID = Number(params?.id);
  const navigation = useNavigation();
  const { containerStyle } = useSafeHeights();
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const styles = useStyles();

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetDiscoverTvShow([
    {
      name: 'with_networks',
      value: networkID
    }
  ]);

  const firstItem = !isLoading && data?.pages?.[0][0];

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => <Header id={networkID} scrollY={scrollYPosition} />,
      headerShown: true
    });
  }, [navigation, networkID, scrollYPosition]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <BasicLayout isView>
      <Animated.View
        style={{
          opacity: scrollYPosition.interpolate({
            inputRange: [0, 200],
            outputRange: [0.3, 0]
          }),
          ...styles.background,
          ...globalStyles.absoluteFill
        }}
      >
        <Gradient
          colors={[...getNetworkColor(networkID), theme.colors.behind]}
          angle={0}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <VerticalList
        ListHeaderComponent={
          <LargeThumb
            isLoading={isLoading}
            imageWidth={780}
            title={firstItem?.name}
            imageUrl={firstItem?.backdrop_path}
          />
        }
        isLoading={isLoading}
        item={TvShowThumb}
        getScrollYPosition={getScrollYPosition}
        results={data?.pages?.map((page) => page).flat()}
        onEndReached={loadMore}
        contentContainerStyle={containerStyle}
      />
    </BasicLayout>
  );
}

function useStyles() {
  return StyleSheet.create({
    background: {
      height: 300
    }
  });
}
