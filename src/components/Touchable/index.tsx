import * as React from 'react'
import type { PressableProps, View, ViewStyle } from 'react-native'
import { Animated, Pressable } from 'react-native'

export type TouchableProps = PressableProps & {
  children?: React.ReactNode
  duration?: number
  endScale?: number
  ref?: React.Ref<View>
  startScale?: number
  style?: ViewStyle
  withoutScale?: boolean
}

export const Touchable = ({
  duration = 50,
  endScale = 0.95,
  onPress,
  ref,
  startScale = 1,
  style,
  withoutScale,
  ...rest
}: TouchableProps) => {
  const [scaleAnimation] = React.useState(new Animated.Value(startScale))
  const endScaleFormatted = withoutScale ? startScale : endScale

  function onPressIn() {
    Animated.timing(scaleAnimation, {
      duration,
      toValue: endScaleFormatted,
      useNativeDriver: true,
    }).start()
  }

  function onPressOut() {
    Animated.timing(scaleAnimation, {
      duration,
      toValue: startScale,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scale: scaleAnimation }],
        },
      ]}
    >
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
