import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { Button } from '~/components/new/button'
import { Header } from '~/components/new/header'

type ModalLayoutrops = {
  children: React.ReactNode
}

export const ModalLayout = ({ children }: ModalLayoutrops) => {
  const scrollY = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })

  return (
    <View className="flex-1 bg-background">
      <Header
        layout="modal"
        rightActions={<Button icon="close" onPress={() => router.back()} size="lg" />}
        scrollY={scrollY}
      />
      <Animated.ScrollView
        contentContainerClassName="min-h-full gap-5 pt-safe-offset-2 pb-safe-offset-26 md:pb-safe android:pb-safe-offset-4"
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </View>
  )
}
