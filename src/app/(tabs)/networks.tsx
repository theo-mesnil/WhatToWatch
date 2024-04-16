import type { Href } from 'expo-router';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Animated } from 'react-native';

import { Header } from 'components/Header';
import type { NetworkThumbProps } from 'components/NetworkThumb';
import { NetworkThumb } from 'components/NetworkThumb';
import { VerticalList } from 'components/VerticalList';
import { networksList } from 'constants/networks';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import type { HeaderOptions } from 'types/navigation';

function Item(props: NetworkThumbProps) {
  return (
    <NetworkThumb
      {...props}
      aspectRatio={16 / 9}
      href={`/network/${props.item.id}` as Href<string>}
    />
  );
}

export default function Networks() {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const { containerStyle } = useSafeHeights();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: ({ options: { title } }: HeaderOptions) => (
        <Header title={title} scrollY={scrollYPosition} />
      ),
      headerShown: true
    });
  }, [navigation, scrollYPosition]);

  return (
    <BasicLayout isView>
      <VerticalList
        getScrollYPosition={getScrollYPosition}
        contentContainerStyle={containerStyle}
        results={networksList}
        item={Item}
        numColumns={2}
      />
    </BasicLayout>
  );
}
