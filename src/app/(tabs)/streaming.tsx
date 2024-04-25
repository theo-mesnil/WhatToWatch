import { useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { Animated, View } from 'react-native';
import { theme } from 'theme';

import { GradientHeader } from 'components/GradientHeader';
import { Header } from 'components/Header';
import { NetworkList } from 'components/NetworkList';
import { networksList } from 'constants/networks';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import type { HeaderOptions } from 'types/navigation';

export default function Networks() {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const { containerStyle } = useSafeHeights();
  const navigation = useNavigation();

  const HeaderComponent = useCallback(
    ({ options: { title } }: HeaderOptions) => (
      <Header title={title} scrollY={scrollYPosition} />
    ),
    [scrollYPosition]
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout
      contentContainerStyle={containerStyle}
      getScrollYPosition={getScrollYPosition}
    >
      <GradientHeader scrollY={scrollYPosition} />
      <View style={{ gap: theme.space.lg }}>
        {networksList.map((network) => (
          <NetworkList key={network.slug} id={network.id} />
        ))}
      </View>
    </BasicLayout>
  );
}
