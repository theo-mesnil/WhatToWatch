import * as React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';
import type { Color } from 'theme';

import type { GradientProps } from 'components/Gradient';
import { Gradient } from 'components/Gradient';
import type { IconElement } from 'components/Icon';
import { Icon } from 'components/Icon';
import { Text } from 'components/Text';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';

export type ButtonProps = ViewProps & {
  backgroundColor?: Color;
  children: React.ReactNode;
  gradientColors?: GradientProps['colors'];
  icon?: IconElement;
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
  icon,
  isCustomChildren,
  isRounded,
  isTransparent,
  onPress,
  size = 'md',
  style = {},
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const variantColor = variant === 'secondary' ? 'default-900' : 'white';

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
          <>
            <Text
              variant={size}
              style={[
                { color: variantColor },
                size === 'lg' && styles['text-lg'],
                gradientColors && styles.gradientColors
              ]}
            >
              {children}
            </Text>
            {icon && <Icon color={variantColor} icon={icon} size={20} />}
          </>
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
    overflow: 'hidden',
    gap: theme.space.xs
  },
  primary: {
    backgroundColor: theme.colors['default-700']
  },
  secondary: {
    backgroundColor: theme.colors['brand-700']
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
