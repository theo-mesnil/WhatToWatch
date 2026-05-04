import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { useIntl } from 'react-intl'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { withUniwind } from 'uniwind'

import { Button } from '~/components/button'
import { Header } from '~/components/header'
import { Loader } from '~/components/loader'
import { Text } from '~/components/text'
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
  const intl = useIntl()
  const scrollY = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y
    },
  })

  return (
    <View className="flex-1 bg-background">
      <Header
        interpolateValues={[250, 300]}
        leftActions={
          <Button
            accessibilityLabel={intl.formatMessage({ defaultMessage: 'Go back', id: 'orvpWh' })}
            icon="arrow-back"
            onPress={() => router.back()}
            size="lg"
          />
        }
        scrollY={scrollY}
        title={isIpad ? '' : title}
      />
      <Animated.ScrollView
        contentContainerClassName="min-h-full gap-2 pb-safe"
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View className="h-cover mb-4 absolute w-full">
          <View className="h-cover absolute w-full bg-foreground">
            <UniwindImage
              className="absolute inset-0"
              contentFit="cover"
              source={imageUrl ? getImageUrl(imageUrl, 'w1280') : undefined}
              testID="cover-image"
              transition={150}
            />
            {isLoading && <Loader className="w-full" />}
          </View>
          <View className="absolute w-full mt-cover-top h-cover-without-top bg-linear-180 from-transparent to-background" />
          <View className="h-full justify-end mx-screen">
            {logo && (
              <UniwindImage
                className="max-h-cover-top w-cover-without-top ml-1"
                contentFit="contain"
                source={getImageUrl(logo.url, 'w500')}
                style={{ aspectRatio: logo.aspectRatio }}
                testID="cover-logo"
                transition={150}
              />
            )}
            {!logo && title && (
              <Text className="text-4xl font-bold text-violet-300" testID="cover-title">
                {title}
              </Text>
            )}
          </View>
        </View>
        <View className="gap-2 pt-cover mt-4 pb-4 px-5">
          {badges && <View className="flex-row flex-wrap gap-1.5 -ml-1">{badges}</View>}
          {subtitle && <Text testID="subtitle">{subtitle}</Text>}
        </View>
        {children}
      </Animated.ScrollView>
    </View>
  )
}
