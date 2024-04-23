import { useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { Animated, View } from 'react-native';
import { theme } from 'theme';

import { Header } from 'components/Header';
import { NetworkList } from 'components/NetworkList';
import { networksList } from 'constants/networks';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';

export default function Networks() {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const { containerStyle } = useSafeHeights();
  const navigation = useNavigation();

  const HeaderComponent = useCallback(
    () => (
      <Header
        title={
          <FormattedMessage
            key="header-title"
            defaultMessage="Series streaming"
          />
        }
        scrollY={scrollYPosition}
      />
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
      <View style={{ gap: theme.space.xxl }}>
        {networksList.map((network) => (
          <NetworkList key={network.slug} id={network.id} />
        ))}
      </View>
    </BasicLayout>
  );
}
