import * as React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';
import type { Color } from 'theme';

import type { GradientProps } from 'components/Gradient';
import { Gradient } from 'components/Gradient';
import { Text } from 'components/Text';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';

export type ButtonProps = ViewProps & {
  backgroundColor?: Color;
  children: React.ReactNode;
  gradientColors?: GradientProps['colors'];
  isCustomChildren?: boolean;
  isRounded?: boolean;
  isTransparent?: boolean;
  onPress?: TouchableProps['onPress'];
  size?: 'md' | 'lg';
  variant?: 'primary' | 'secondary';
};

export function Button({
  children,
  gradientColors,
  isCustomChildren,
  isRounded,
  isTransparent,
  onPress,
  size = 'md',
  style = {},
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <Touchable onPress={onPress}>
      <View
        style={[
          styles.wrapper,
          styles[size],
          styles[variant],
          isTransparent && styles.transparent,
          isRounded && styles.rounded,
          style
        ]}
        {...rest}
      >
        {gradientColors && <Gradient angle={1} colors={gradientColors} />}
        {isCustomChildren ? (
          children
        ) : (
          <Text
            variant={size}
            style={[
              styles[`text-${variant}`],
              size === 'lg' && styles['text-lg'],
              gradientColors && styles.gradientColors
            ]}
          >
            {children}
          </Text>
        )}
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radii.sm,
    paddingHorizontal: theme.space.lg,
    overflow: 'hidden'
  },
  primary: {
    backgroundColor: theme.colors['default-700']
  },
  secondary: {
    backgroundColor: theme.colors['brand-700']
  },
  'text-primary': {
    color: theme.colors['default-100']
  },
  'text-secondary': {
    color: theme.colors['default-900']
  },
  md: {
    height: 25
  },
  lg: {
    height: 40
  },
  'text-lg': {
    fontWeight: 'bold'
  },
  rounded: {
    height: 30,
    width: 30,
    borderRadius: 30,
    paddingHorizontal: 0,
    alignItems: 'center'
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  gradientColors: {
    color: theme.colors.white
  }
});
