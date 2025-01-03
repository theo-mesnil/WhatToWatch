import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';

import type { GradientProps } from 'components/Gradient';
import { Gradient } from 'components/Gradient';
import type { IconElement } from 'components/Icon';
import { Icon } from 'components/Icon';
import { Text } from 'components/Text';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';
import type { Color } from 'theme';
import { theme } from 'theme';

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

export const Button = React.forwardRef<never, ButtonProps>(
  (
    {
      children,
      gradientColors,
      icon,
      isCustomChildren,
      isRounded,
      isTransparent,
      onPress,
      size = 'md',
      style = {},
      testID,
      variant = 'primary',
      ...rest
    },
    ref
  ) => {
    return (
      <Touchable ref={ref} onPress={onPress} testID={testID}>
        <View
          style={[
            styles.wrapper,
            styles[size],
            styles[variant],
            isTransparent && styles.transparent,
            isRounded && { borderRadius: styles[size].height },
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
                  { color: theme.colors.white },
                  size === 'lg' && styles['text-lg'],
                  gradientColors && styles.gradientColors
                ]}
              >
                {children}
              </Text>
              {icon && <Icon color="white" icon={icon} size={20} />}
            </>
          )}
        </View>
      </Touchable>
    );
  }
);

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
  transparent: {
    backgroundColor: 'transparent'
  },
  gradientColors: {
    color: theme.colors.white
  }
});
