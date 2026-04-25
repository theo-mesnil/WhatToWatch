import * as React from 'react'
import type { PressableProps as RNPressableProps, View } from 'react-native'
import { Pressable as RNPressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export type PressableProps = RNPressableProps & {
  children?: React.ReactNode
  className?: string
  endScale?: number
  ref?: React.Ref<View>
  startScale?: number
  withoutScale?: boolean
}

export const Pressable = ({
  className,
  endScale = 0.95,
  onPress,
  ref,
  startScale = 1,
  withoutScale,
  ...rest
}: PressableProps) => {
  const scale = React.useRef(useSharedValue(startScale)).current
  const endScaleFormatted = withoutScale ? startScale : endScale
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  function onPressIn() {
    scale.value = withSpring(endScaleFormatted, { damping: 15, stiffness: 400 })
  }

  function onPressOut() {
    scale.value = withSpring(startScale, { damping: 12, stiffness: 350 })
  }

  return (
    <Animated.View className={className} style={animatedStyle}>
      <RNPressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        ref={ref}
        {...rest}
      />
    </Animated.View>
  )
}
