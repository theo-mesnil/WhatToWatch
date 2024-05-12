import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { theme } from 'theme';

type BasicLayoutProps = {
  children: React.ReactNode;
  contentContainerStyle?: any;
  getScrollYPosition?: (value: Animated.Value) => void;
  isView?: boolean;
  titleOffset?: number;
  titleOffsetSubtraction?: number;
};

export function BasicLayout({
  children,
  contentContainerStyle = {},
  getScrollYPosition,
  isView = false
}: BasicLayoutProps) {
  const [scrollY] = React.useState(new Animated.Value(0));

  const AnimateComponent = isView ? Animated.View : Animated.ScrollView;

  React.useEffect(
    () => getScrollYPosition?.(scrollY),
    [getScrollYPosition, scrollY]
  );

  return (
    <AnimateComponent
      style={[styles.wrapper]}
      onScroll={
        !isView
          ? Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: scrollY }
                  }
                }
              ],
              {
                useNativeDriver: false
              }
            )
          : undefined
      }
      bounces={false}
      scrollEventThrottle={1}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </AnimateComponent>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.behind,
    flex: 1
  }
});
