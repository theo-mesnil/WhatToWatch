import * as React from 'react'
import { View } from 'react-native'
import Animated, {
  cancelAnimation,
  makeMutable,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const sharedOpacity = makeMutable(0.1)
let mountCount = 0

type LoaderProps = {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  React.useEffect(() => {
    if (mountCount === 0) {
      sharedOpacity.value = withRepeat(
        withSequence(withTiming(1, { duration: 1200 }), withTiming(0.1, { duration: 500 })),
        -1
      )
    }
    mountCount++

    return () => {
      mountCount--
      if (mountCount === 0) {
        cancelAnimation(sharedOpacity)
      }
    }
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: sharedOpacity.value,
  }))

  return (
    <View className={`bg-foreground overflow-hidden ${className}`}>
      <Animated.View className="h-full w-full" style={animatedStyle}>
        <View className="absolute inset-0 bg-linear-40 from-violet-950 android:from-violet-200 to-foreground" />
      </Animated.View>
    </View>
  )
}
