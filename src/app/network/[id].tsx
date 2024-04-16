import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { useGetDiscoverTvShow } from 'api/discover';
import { Gradient } from 'components/Gradient';
import { TvShowThumb } from 'components/TvShowThumb';
import { VerticalList } from 'components/VerticalList';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import { getNetworkColor } from 'utils/networks';

import { Header } from './components/Header';

export default function Network() {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState('isLoading');
  const params = useLocalSearchParams();
  const getDiscoverTvShow = useGetDiscoverTvShow();
  const networkID = Number(params?.id);
  const navigation = useNavigation();
  const { containerStyle } = useSafeHeights();
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const styles = useStyles();

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => <Header id={networkID} scrollY={scrollYPosition} />,
      headerShown: true
    });
  }, [navigation, networkID, scrollYPosition]);

  function addPage(data: any) {
    setResults(results.concat(data));
  }

  useEffect(() => {
    if (networkID) {
      getDiscoverTvShow({
        callback: setResults,
        params: [
          {
            name: 'with_networks',
            value: `${networkID}`
          }
        ]
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkID]);

  useEffect(() => {
    if (page > 1 && page < 30) {
      getDiscoverTvShow({
        callback: addPage,
        params: [
          { name: 'with_networks', value: `${networkID}` },
          { name: 'page', value: page }
        ]
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
        // ListHeaderComponent={
        //   <TvShowThumb
        //     isLoading={results === 'isLoading'}
        //     aspectRatio={16 / 12}
        //     withTitleOnCover
        //     imageWidth={780}
        //     title={Object.values(results)[0]?.name}
        //     item={{ backdrop_path: Object.values(results)[0].backdrop_path }}
        //     withBackdropImage
        //   />
        // }
        isLoading={results === 'isLoading'}
        item={TvShowThumb}
        getScrollYPosition={getScrollYPosition}
        results={results}
        onEndReached={() => setPage(page + 1)}
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
