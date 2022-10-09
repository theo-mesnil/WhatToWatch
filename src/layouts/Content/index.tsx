import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';

import { getTextFont } from 'components/Text';

type ContentLayoutProps = {
  titleOffset?: number;
  titleOffsetSubtraction?: number;
  children: React.ReactNode;
};

export function ContentLayout({
  children,
  titleOffset = 400,
  titleOffsetSubtraction = 50,
  ...rest
}: ContentLayoutProps) {
  const [scrollY] = React.useState(new Animated.Value(0));
  const navigation = useNavigation();
  const theme = useTheme();

  const headerOpacity = scrollY.interpolate({
    inputRange: [titleOffset - titleOffsetSubtraction, titleOffset],
    outputRange: [0, 1]
  });

  React.useEffect(() => {
    navigation.setOptions({
      headerBackgroundContainerStyle: {
        opacity: headerOpacity || 0
      },
      headerTitleStyle: {
        ...getTextFont('h2', theme),
        opacity: headerOpacity || 0
      }
    });
  }, [headerOpacity, navigation, theme]);

  return (
    <Animated.ScrollView
      bounces={false}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: scrollY }
            }
          }
        ],
        {
          useNativeDriver: true
        }
      )}
      {...rest}
    >
      {children}
    </Animated.ScrollView>
  );
}
