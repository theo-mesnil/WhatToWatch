import Ionicons from '@expo/vector-icons/Ionicons'
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect'
import * as Haptics from 'expo-haptics'
import type { ImageProps } from 'expo-image'
import { Image } from 'expo-image'
import type { GestureResponderEvent } from 'react-native'
import { useResolveClassNames } from 'uniwind'

import { Pressable } from '~/components/new/presseable'
import { Text } from '~/components/new/text'

export type ButtonProps = {
  children?: React.ReactNode
  icon?: keyof typeof Ionicons.glyphMap
  image?: ImageProps['source']
  isLoading?: boolean
  label?: string
  onPress?: (event?: GestureResponderEvent) => void
  size?: 'lg' | 'md'
  withHaptic?: boolean
}

export const Button = ({
  children,
  icon,
  image,
  label,
  onPress,
  size = 'md',
  withHaptic,
}: ButtonProps) => {
  const hasLiquidGlass = isLiquidGlassAvailable()

  /**
   * styles conditions
   */
  const isRounded = !label && (icon || image)
  const sizes = isRounded
    ? {
        lg: 'size-10 rounded-full',
        md: 'size-8 rounded-full',
      }
    : {
        lg: 'px-2 h-10 rounded-full',
        md: 'px-3 h-8 rounded-lg',
      }
  const iconSizes = {
    lg: 'size-5',
    md: 'size-3',
  }
  const imageSizes = {
    lg: 'size-9',
    md: 'size-7',
  }

  /**
   * resolves styles
   */
  const wrapperStyles = useResolveClassNames(
    `items-center justify-center ${sizes[size]} ${!hasLiquidGlass && 'bg-white'}`
  )
  const imageStyle = useResolveClassNames(`rounded-full ${imageSizes[size]}`)
  const iconStyles = useResolveClassNames('text-text-base')
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
    <Pressable onPress={handleOnPress} withoutScale={hasLiquidGlass}>
      <GlassView glassEffectStyle="clear" isInteractive={true} style={wrapperStyles}>
        {icon && <Ionicons name={icon} size={Number(iconSizeStyle)} style={iconStyles} />}
        {image && <Image source={image} style={imageStyle} />}
        {children && <Text>{children}</Text>}
      </GlassView>
    </Pressable>
  )
}
