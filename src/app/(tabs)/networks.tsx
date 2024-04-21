import { Link, useNavigation } from 'expo-router';
import React from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { Animated } from 'react-native';

import { Header } from 'components/Header';
import { NetworkThumb } from 'components/NetworkThumb';
import { Touchable } from 'components/Touchable';
import { VerticalList } from 'components/VerticalList';
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

  const renderItem = ({
    item: { id }
  }: ListRenderItemInfo<(typeof networksList)[number]>) => {
    return (
      <Link href={`/network/${id}`} asChild>
        <Touchable>
          <NetworkThumb id={id} aspectRatio={16 / 9} />
        </Touchable>
      </Link>
    );
  };

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: ({ options: { title } }: HeaderOptions) => (
        <Header title={title} scrollY={scrollYPosition} />
      )
    });
  }, [navigation, scrollYPosition]);

  return (
    <BasicLayout isView>
      <VerticalList
        id="networks"
        renderItem={renderItem}
        getScrollYPosition={getScrollYPosition}
        contentContainerStyle={containerStyle}
        results={networksList}
        numColumns={2}
      />
    </BasicLayout>
  );
}
