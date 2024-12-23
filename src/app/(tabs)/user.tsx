import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Animated } from 'react-native';

import { GradientHeader } from 'components/GradientHeader';
import { Header } from 'components/Header';
import { LoginButton } from 'components/LoginButton';
import { Text } from 'components/Text';
import { useSafeHeights } from 'constants/useSafeHeights';
import { useUser } from 'contexts/UserContext';
import { BasicLayout } from 'layouts/Basic';
import type { HeaderOptions } from 'types/navigation';

export default function User() {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const { containerStyle } = useSafeHeights();
  const navigation = useNavigation();
  const { isLogged } = useUser();

  const HeaderComponent = React.useCallback(
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
      <Text>{`isLogged: ${isLogged}`}</Text>
      <LoginButton />
    </BasicLayout>
  );
}
