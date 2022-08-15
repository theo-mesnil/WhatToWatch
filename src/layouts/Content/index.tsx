import * as React from 'react';
import { Animated } from 'react-native';

import { Header } from 'components/Header';

type ContentLayoutProps = {
  title: string;
  titleOffset?: number;
  titleOffsetSubtraction?: number;
};

export function ContentLayout({
  title,
  titleOffset = 300,
  titleOffsetSubtraction = 70,
  ...rest
}: ContentLayoutProps) {
  const [scrollY] = React.useState(new Animated.Value(0));
  const inputRange = titleOffset - titleOffsetSubtraction;

  return (
    <>
      <Header
        title={title}
        opacity={
          scrollY.interpolate({
            inputRange: [inputRange, inputRange],
            outputRange: [0, 1]
          }) as Animated.Value
        }
      />
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
      />
    </>
  );
}
