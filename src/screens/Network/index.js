import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

import { Header } from 'components/Header';
import {
  getNetworkColor,
  getNetworkLogo,
  getNetworkName
} from 'utils/networks';
import { Box } from 'components/Box';
import { Icon } from 'components/Icon';
import { VerticalList } from 'components/VerticalList';
import { useGetDiscoverTvShow } from 'api/discover';
import { TvShowThumb } from 'components/TvShowThumb';
import { ColorCover } from 'components/ColorCover';

export function NetworkScreen() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [titleOffset, setTitleOffset] = useState(300);
  const navigation = useNavigation();
  const route = useRoute();
  const getDiscoverTvShow = useGetDiscoverTvShow();
  const networkID = route?.params?.id || 213;
  const inputRange = titleOffset - 100;

  return (
    <>
      <Header
        title={getNetworkName(networkID)}
        subtitle={<FormattedMessage id="common.tvShows" />}
        offset={titleOffset}
        opacity={scrollY.interpolate({
          inputRange: [inputRange, inputRange],
          outputRange: [0, 1]
        })}
      />
      <VerticalList
        getApi={getDiscoverTvShow}
        renderItem={TvShowThumb}
        params={[{ name: 'with_networks', value: `${networkID}` }]}
        onPress={({ id }) => navigation.push('TvShow', { id })}
        handleScroll={setScrollY}
      >
        <>
          <ColorCover backgroundColor={getNetworkColor(networkID)}>
            <Icon size={100} icon={getNetworkLogo(networkID)} />
          </ColorCover>
          <Box
            onLayout={({
              nativeEvent: {
                layout: { y }
              }
            }) => setTitleOffset(y)}
          />
        </>
      </VerticalList>
    </>
  );
}
