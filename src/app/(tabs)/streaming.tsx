import { Link, useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import type { ListRenderItemInfo } from 'react-native';
import { Animated } from 'react-native';

import { Header } from 'components/Header';
import { NetworkThumb } from 'components/NetworkThumb';
import { Touchable } from 'components/Touchable';
import { VerticalList } from 'components/VerticalList';
import { networksList } from 'constants/networks';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';

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
    <BasicLayout isView>
      <VerticalList
        id="streaming"
        renderItem={renderItem}
        getScrollYPosition={getScrollYPosition}
        contentContainerStyle={containerStyle}
        results={networksList}
        numColumns={2}
      />
    </BasicLayout>
  );
}
