import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { ViewProps } from 'react-native'

import type { GradientProps } from '~/components/Gradient'
import { Gradient } from '~/components/Gradient'
import type { IconElement } from '~/components/Icon'
import { Icon } from '~/components/Icon'
import { Text } from '~/components/Text'
import type { TouchableProps } from '~/components/Touchable'
import { Touchable } from '~/components/Touchable'
import type { Color } from '~/theme'
import { theme } from '~/theme'

export type ButtonProps = ViewProps & {
  backgroundColor?: Color
  children: React.ReactNode
  gradientColors?: GradientProps['colors']
  icon?: IconElement
  isCustomChildren?: boolean
  isRounded?: boolean
  isTransparent?: boolean
  onPress?: TouchableProps['onPress']
  size?: 'lg' | 'md'
  variant?: 'primary' | 'secondary'
}

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
      <Touchable onPress={onPress} ref={ref} testID={testID}>
        <View
          style={[
            styles.wrapper,
            styles[size],
            styles[variant],
            isTransparent && styles.transparent,
            isRounded && { borderRadius: styles[size].height },
            style,
          ]}
          {...rest}
        >
          {gradientColors && <Gradient angle={1} colors={gradientColors} />}
          {isCustomChildren ? (
            children
          ) : (
            <>
              <Text
                style={[
                  { color: theme.colors.white },
                  size === 'lg' && styles['text-lg'],
                  gradientColors && styles.gradientColors,
                ]}
                variant={size}
              >
                {children}
              </Text>
              {icon && <Icon color="white" icon={icon} size={20} />}
            </>
          )}
        </View>
      </Touchable>
    )
  }
)

Button.displayName = 'Button'

const styles = StyleSheet.create({
  gradientColors: {
    color: theme.colors.white,
  },
  lg: {
    height: 40,
  },
  md: {
    height: 25,
  },
  primary: {
    backgroundColor: theme.colors['default-700'],
  },
  secondary: {
    backgroundColor: theme.colors['brand-700'],
  },
  'text-lg': {
    fontWeight: 'bold',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    alignItems: 'center',
    borderRadius: theme.radii.sm,
    flexDirection: 'row',
    gap: theme.space.xs,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: theme.space.lg,
  },
})
