import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useCSSVariable, withUniwind } from 'uniwind'

import { Gradient } from '~/components/Gradient'
import { Loader } from '~/components/Loader'
import { Button } from '~/components/new/button'
import { Header } from '~/components/new/header'
import { Text } from '~/components/new/text'
import { isIpad } from '~/utils/get-device-info'
import { getImageUrl } from '~/utils/images'

const UniwindImage = withUniwind(Image)

type ContentLayoutProps = {
  badges?: React.ReactNode
  children: React.ReactNode
  imageUrl?: string
  isLoading?: boolean
  logo?: {
    aspectRatio: number
    url: string
  }
  subtitle?: string
  title: React.ReactNode
}

export const ContentLayout = ({
  badges,
  children,
  imageUrl,
  isLoading,
  logo,
  subtitle,
  title,
}: ContentLayoutProps) => {
  const scrollY = useSharedValue(0)
  const backgroundColor = useCSSVariable('--color-background') as string

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })

  return (
    <View className="flex-1 bg-background">
      <Header
        interpolateValues={[250, 300]}
        leftActions={<Button icon="arrow-back" onPress={() => router.back()} size="lg" />}
        scrollY={scrollY}
        title={isIpad ? '' : title}
      />
      <Animated.ScrollView
        contentContainerClassName="min-h-full gap-5 pb-safe-offset-26 md:pb-safe android:pb-safe-offset-4"
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View className="h-cover mb-4 absolute w-full">
          <View className="h-cover absolute w-full bg-foreground">
            <UniwindImage
              className="absolute inset-0"
              source={imageUrl ? getImageUrl(imageUrl, 'w1280') : undefined}
              testID="cover-image"
            />
            {isLoading && <Loader className="w-full" />}
          </View>
          <Gradient
            className="absolute w-full mt-cover-top h-cover-without-top"
            colors={['transparent', backgroundColor]}
          />
          <View className="items-center h-full justify-end mx-6">
            {logo && (
              <UniwindImage
                className="max-h-cover-top w-62.5"
                source={getImageUrl(logo.url, 'w500')}
                style={{ aspectRatio: logo.aspectRatio }}
                testID="cover-logo"
              />
            )}
            {!logo && title && (
              <Text className="text-center text-4xl font-bold" testID="cover-title">
                {title}
              </Text>
            )}
          </View>
        </View>
        <View className="items-center gap-2 pt-cover mt-4 pb-4 px-8">
          {badges && <View className="flex-row flex-wrap justify-center gap-1.5">{badges}</View>}
          {subtitle && <Text testID="subtitle">{subtitle}</Text>}
        </View>
        {children}
      </Animated.ScrollView>
    </View>
  )
}
