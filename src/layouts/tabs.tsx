import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import { Button } from '~/components/button'
import { Header } from '~/components/header'
import { Text } from '~/components/text'
import { UserButton } from '~/components/user-button'
import { useAuth } from '~/contexts/auth'
import { isIpad } from '~/utils/get-device-info'

type TabsLayoutrops = {
  children: React.ReactNode
  title: string
}

export const TabsLayout = ({ children, title }: TabsLayoutrops) => {
  const scrollY = useSharedValue(0)
  const { accountId } = useAuth()

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })

  const largeTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 20], [1, 0], Extrapolation.CLAMP)

    return {
      opacity,
    }
  })

  return (
    <View className="flex-1 bg-background">
      <Header
        rightActions={
          <>
            {accountId && <UserButton />}
            {!accountId && (
              <Button icon="person" onPress={() => router.navigate('/me')} size="lg" />
            )}
          </>
        }
        scrollY={scrollY}
        title={isIpad ? '' : title}
      />
      <Animated.ScrollView
        contentContainerClassName="min-h-full gap-5 pb-safe-offset-26 md:pb-safe android:pb-safe-offset-4"
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View className="mx-screen pt-15 lg:mx-screen-lg" style={largeTitleStyle}>
          <Text variant="h1">{title}</Text>
        </Animated.View>
        {children}
      </Animated.ScrollView>
    </View>
  )
}
