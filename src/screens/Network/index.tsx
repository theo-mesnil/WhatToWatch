import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Animated } from 'react-native';

import { useGetDiscoverTvShow } from 'api/discover';
import { Box } from 'components/Box';
import { ColorCover } from 'components/ColorCover';
import { Header } from 'components/Header';
import { Icon } from 'components/Icon';
import { TvShowThumb } from 'components/TvShowThumb';
import { VerticalList } from 'components/VerticalList';
import {
  getNetworkColor,
  getNetworkLogo,
  getNetworkName
} from 'utils/networks';

export function NetworkScreen() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [titleOffset, setTitleOffset] = useState(300);
  const navigation =
    useNavigation<RootStackScreenProps<'TvShow'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Network'>['route']>();
  const getDiscoverTvShow = useGetDiscoverTvShow();
  const networkID = route?.params?.id || 213;
  const inputRange = titleOffset - 100;

  return (
    <>
      <Header
        title={getNetworkName(networkID)}
        subtitle={<FormattedMessage id="common.tvShows" />}
        opacity={
          scrollY.interpolate({
            inputRange: [inputRange, inputRange],
            outputRange: [0, 1]
          }) as Animated.Value
        }
      />
      <VerticalList
        getApi={getDiscoverTvShow}
        renderItem={TvShowThumb}
        params={[{ name: 'with_networks', value: `${networkID}` }]}
        onPress={({ id, name }) => navigation.push('TvShow', { id, name })}
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
