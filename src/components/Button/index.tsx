import * as React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';
import type { Color } from 'theme';

import { Text } from 'components/Text';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';

type ButtonProps = ViewProps & {
  backgroundColor?: Color;
  children: React.ReactNode;
  isCustomChildren?: boolean;
  isRounded?: boolean;
  isTransparent?: boolean;
  onPress?: TouchableProps['onPress'];
  size?: 'md' | 'lg';
  variant?: 'primary' | 'secondary';
};

export function Button({
  children,
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
          isTransparent && styles.transparent,
          styles[size],
          styles[variant],
          isRounded && styles.rounded,
          style
        ]}
        {...rest}
      >
        {isCustomChildren ? (
          children
        ) : (
          <Text
            style={[
              styles[`text-${variant}`],
              size === 'lg' && styles['text-lg']
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
    justifyContent: 'center',
    borderRadius: theme.radii.sm,
    paddingHorizontal: theme.space.md
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
    alignItems: 'center'
  },
  transparent: {
    backgroundColor: 'transparent'
  }
});
