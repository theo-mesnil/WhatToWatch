import * as React from 'react'
import type { PressableProps, View } from 'react-native'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type TouchableProps = PressableProps & {
  children?: React.ReactNode
  className?: string
  duration?: number
  endScale?: number
  ref?: React.Ref<View>
  startScale?: number
  withoutScale?: boolean
}

export const Touchable = ({
  className = '',
  duration = 50,
  endScale = 0.95,
  onPress,
  ref,
  startScale = 1,
  withoutScale,
  ...rest
}: TouchableProps) => {
  const scale = React.useRef(useSharedValue(startScale)).current
  const endScaleFormatted = withoutScale ? startScale : endScale

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  function onPressIn() {
    scale.value = withTiming(endScaleFormatted, { duration })
  }

  function onPressOut() {
    scale.value = withTiming(startScale, { duration })
  }

  return (
    <Animated.View className={className} style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        ref={ref}
        {...rest}
      />
    </Animated.View>
  )
}

Touchable.displayName = 'Touchable'
