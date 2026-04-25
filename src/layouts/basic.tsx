import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { Button } from '~/components/button'
import { Header } from '~/components/header'
import { isIpad } from '~/utils/get-device-info'

type BasicLayoutrops = {
  children: React.ReactNode
  title: React.ReactNode
}

export const BasicLayout = ({ children, title }: BasicLayoutrops) => {
  const scrollY = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })

  return (
    <View className="flex-1 bg-background">
      <Header
        leftActions={<Button icon="arrow-back" onPress={() => router.back()} size="lg" />}
        scrollY={scrollY}
        showSmallTitleOnStart
        title={isIpad ? '' : title}
      />
      <Animated.ScrollView
        contentContainerClassName="min-h-full gap-5 pt-safe-offset-12 pb-safe md:pb-safe android:pb-safe-offset-4"
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </View>
  )
}
