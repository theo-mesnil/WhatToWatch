import MaskedView from '@react-native-masked-view/masked-view'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Platform, View } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useResolveClassNames, withUniwind } from 'uniwind'

import { Text } from '~/components/new/text'

type HeaderProps = {
  interpolateValues?: [number, number]
  layout?: 'main' | 'modal'
  leftActions?: React.ReactNode
  rightActions?: React.ReactNode
  scrollY: SharedValue<number>
  showSmallTitleOnStart?: boolean
  title?: React.ReactNode
}

const MaxBlurIntensity = 50

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
const UniwindLinearGradient = withUniwind(LinearGradient)
const UniwindBlurView = withUniwind(BlurView)
const UniwindMaskedView = withUniwind(MaskedView)

export const Header = ({
  interpolateValues = [0, 10],
  layout = 'main',
  leftActions,
  rightActions,
  scrollY,
  showSmallTitleOnStart,
  title,
}: HeaderProps) => {
  const backgroundColor100 = useResolveClassNames('bg-background').backgroundColor as string
  const backgroundColor99 = useResolveClassNames('bg-background/99')?.backgroundColor as string
  const backgroundColor20 = useResolveClassNames('bg-background/20')?.backgroundColor as string

  const headerHeight = layout === 'modal' ? 'h-20' : 'h-37.5'

  const interpolateValue_10 = interpolateValues[0] + 10
  const interpolateValue_40 = interpolateValues[0] + 40

  const headerBackgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, interpolateValues, [0, 1], Extrapolation.CLAMP)

    return {
      opacity,
    }
  })

  const animatedHeaderBlur = useAnimatedProps(() => {
    const opacity = interpolate(
      scrollY.value,
      [interpolateValue_40, 0],
      [0, 1],
      Extrapolation.CLAMP
    )

    return {
      intensity: opacity * MaxBlurIntensity,
    }
  })

  const smallHeaderStyle = useAnimatedStyle(() => {
    if (showSmallTitleOnStart) {
      return { opacity: 1, transform: [{ translateY: 0 }] }
    }

    const opacity = interpolate(
      scrollY.value,
      [interpolateValue_10, interpolateValue_40],
      [0, 1],
      Extrapolation.CLAMP
    )

    const translateY = interpolate(
      scrollY.value,
      [interpolateValue_10, interpolateValue_40],
      [20, 0],
      Extrapolation.CLAMP
    )

    return {
      opacity,
      transform: [{ translateY }],
    }
  })

  return (
    <View className={`${headerHeight} absolute inset-0 z-10`}>
      <Animated.View className="absolute inset-0" style={headerBackgroundStyle}>
        <UniwindMaskedView
          className="absolute inset-0"
          maskElement={
            <UniwindLinearGradient
              className="absolute inset-0"
              colors={[backgroundColor99, backgroundColor100, 'transparent']}
            />
          }
        >
          <UniwindLinearGradient
            className="absolute inset-0"
            colors={[backgroundColor100, backgroundColor20]}
          />
          <UniwindBlurView
            className="absolute inset-0"
            intensity={15}
            tint={Platform.OS === 'ios' ? 'systemChromeMaterial' : 'systemMaterial'}
          />
        </UniwindMaskedView>
      </Animated.View>
      <View className="absolute inset-0 flex-row items-center justify-between px-screen">
        <View className="z-12 flex-row items-center">{leftActions}</View>
        <Animated.View
          className={`absolute inset-0 items-center justify-center px-20 z-11 overflow-hidden`}
          style={smallHeaderStyle}
        >
          {title && (
            <Text bold numberOfLines={1} variant="lg">
              {title}
            </Text>
          )}
          {!showSmallTitleOnStart && (
            <AnimatedBlurView
              animatedProps={animatedHeaderBlur}
              className="absolute inset-0"
              tint={Platform.OS === 'ios' ? 'systemChromeMaterial' : 'systemMaterial'}
            />
          )}
        </Animated.View>
        <View className="z-12 flex-row items-center">{rightActions}</View>
      </View>
    </View>
  )
}
