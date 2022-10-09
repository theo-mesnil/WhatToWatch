import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Box } from 'components/Box';
import { getTextFont } from 'components/Text';

type BasicLayoutProps = {
  titleOffset?: number;
  titleOffsetSubtraction?: number;
  children: React.ReactNode;
};

export function BasicLayout({
  children,
  titleOffset = 50,
  titleOffsetSubtraction = 50,
  ...rest
}: BasicLayoutProps) {
  const [scrollY] = React.useState(new Animated.Value(0));
  const navigation = useNavigation();
  const theme = useTheme();
  const tabBarHeight = useBottomTabBarHeight();

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
        ...getTextFont('h2', theme)
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
    >
      <Box pb={tabBarHeight + theme.space.lg} {...rest}>
        {children}
      </Box>
    </Animated.ScrollView>
  );
}
