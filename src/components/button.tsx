import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect'
import * as Haptics from 'expo-haptics'
import type { ImageProps } from 'expo-image'
import { Image } from 'expo-image'
import { type AccessibilityState, type GestureResponderEvent } from 'react-native'
import { useResolveClassNames } from 'uniwind'

import { Icon, type IconProps } from '~/components/icon'
import { Pressable } from '~/components/presseable'
import type { TextProps } from '~/components/text'
import { Text } from '~/components/text'
import type { NetworkId } from '~/types/content'
import { getNetworkBackgroundClassName } from '~/utils/networks'

export type ButtonProps =
  | (BaseButtonProps & { accessibilityLabel: string; children?: never })
  | (BaseButtonProps & { accessibilityLabel?: string; children: React.ReactNode })

type BaseButtonProps = {
  accessibilityHint?: string
  accessibilityState?: AccessibilityState
  className?: string
  customRightElement?: React.ReactNode
  icon?: IconProps['name']
  image?: ImageProps['source']
  isLoading?: boolean
  networkId?: NetworkId
  onPress?: (event?: GestureResponderEvent) => void
  size?: 'lg' | 'md' | 'xl'
  testID?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  withHaptic?: boolean
}

export const Button = ({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  children,
  className = '',
  customRightElement,
  icon,
  image,
  networkId,
  onPress,
  size = 'md',
  testID,
  variant = 'primary',
  withHaptic,
}: ButtonProps) => {
  const hasLiquidGlass = isLiquidGlassAvailable()
  const backgroundNetworkColor = networkId ? getNetworkBackgroundClassName(networkId) : ''
  /**
   * styles conditions
   */
  const isRounded = !children && (icon || image)
  const sizes = isRounded
    ? {
        lg: 'size-10 rounded-full',
        md: 'size-8 rounded-full',
        xl: 'size-12 rounded-full',
      }
    : {
        lg: 'px-4 h-10 rounded-full',
        md: 'px-2 h-8 rounded-lg',
        xl: 'px-4 h-12 rounded-full',
      }
  const iconSizes = {
    lg: 'size-5',
    md: 'size-3',
    xl: 'size-6',
  }
  const imageSizes = {
    lg: 'size-9',
    md: 'size-7',
    xl: 'size-11',
  }
  const variantStyles = {
    primary: `${!hasLiquidGlass && 'bg-white'}`,
    secondary: 'bg-violet-600',
    tertiary: `bg-white/20 border border-white/30`,
  }
  const textSizeStyles: Record<NonNullable<ButtonProps['size']>, TextProps['variant']> = {
    lg: undefined,
    md: undefined,
    xl: 'h3',
  }

  /**
   * resolves styles
   */
  const wrapperStyles = useResolveClassNames(
    `flex-row gap-2 items-center justify-center ${sizes[size]} ${variantStyles[variant]} ${backgroundNetworkColor} ${className}`
  )
  const imageStyle = useResolveClassNames(`rounded-full ${imageSizes[size]}`)
  const iconSizeStyle = useResolveClassNames(iconSizes[size]).width

  function handleOnPress(event: GestureResponderEvent) {
    if (onPress) {
      if (withHaptic) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }

      onPress(event)
    }
  }

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      hitSlop={isRounded && size === 'md' ? { bottom: 8, left: 8, right: 8, top: 8 } : undefined}
      onPress={handleOnPress}
      testID={testID}
      withoutScale={hasLiquidGlass}
    >
      <GlassView glassEffectStyle="clear" isInteractive={true} style={wrapperStyles}>
        {image && <Image source={image} style={imageStyle} />}
        {children && (
          <Text bold className="text-text-maximal" variant={textSizeStyles[size]}>
            {children}
          </Text>
        )}
        {icon && <Icon name={icon} size={Number(iconSizeStyle)} />}
        {customRightElement}
      </GlassView>
    </Pressable>
  )
}
