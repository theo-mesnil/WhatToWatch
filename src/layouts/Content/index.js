import React, { useState } from 'react';
import { Animated } from 'react-native';

import { Header } from 'components/Header';

export function ContentLayout({
  title,
  titleOffset = 300,
  titleOffsetSubtraction = 70,
  ...rest
}) {
  const [scrollY] = useState(new Animated.Value(0));
  const inputRange = titleOffset - titleOffsetSubtraction;

  return (
    <>
      <Header
        title={title}
        offset={titleOffset}
        opacity={scrollY.interpolate({
          inputRange: [inputRange, inputRange],
          outputRange: [0, 1]
        })}
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
