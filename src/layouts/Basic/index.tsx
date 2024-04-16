import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { theme } from 'theme';

type BasicLayoutProps = {
  children: React.ReactNode;
  contentContainerStyle?: any;
  isView?: boolean;
  titleOffset?: number;
  titleOffsetSubtraction?: number;
};

export function BasicLayout({
  children,
  contentContainerStyle = {},
  isView = false
}: BasicLayoutProps) {
  const styles = useStyles();

  const AnimateComponent = isView ? Animated.View : Animated.ScrollView;

  return (
    <AnimateComponent
      style={styles.wrapper}
      bounces={false}
      scrollEventThrottle={1}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </AnimateComponent>
  );
}

function useStyles() {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.behind,
      flex: 1
    }
  });
}
