import * as React from 'react'
import type { ViewProps } from 'react-native'
import { Image, StyleSheet, View } from 'react-native'

import { useGetContentLogo } from '~/api/logo'
import { Gradient } from '~/components/Gradient'
import { Text } from '~/components/Text'
import { Thumb } from '~/components/Thumb'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'
import type { ContentType, ImageSizeBackdrop } from '~/types/content'
import { getImageUrl } from '~/utils/images'

export type LargeThumbProps = {
  id?: number
  imageUrl?: string
  imageWidth?: ImageSizeBackdrop
  isLoading?: boolean
  style?: ViewProps['style']
  title?: React.ReactElement | string
  type: ContentType
}

export const LargeThumb = React.memo(
  ({ id, imageUrl, imageWidth = 'w780', isLoading, style, title, type }: LargeThumbProps) => {
    const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
      id,
      type,
    })

    return (
      <View style={[styles.wrapper, style]}>
        <Thumb
          aspectRatio={16 / 12}
          imageUrl={imageUrl}
          imageWidth={imageWidth}
          isLoading={isLoading}
          type={type}
        />
        <View style={[globalStyles.absoluteFill, styles.content]}>
          <Gradient colors={['transparent', theme.colors.behind]} style={styles.gradient} />
          {!isLoadingLogo && logo && (
            <Image
              src={getImageUrl(logo.url, 'w500')}
              style={[styles.logo, { aspectRatio: logo.aspectRatio }]}
            />
          )}
          {!isLoadingLogo && !logo && title && (
            <Text numberOfLines={2} style={styles.title} variant="h0">
              {title}
            </Text>
          )}
        </View>
      </View>
    )
  }
)

LargeThumb.displayName = 'LargeThumb'

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gradient: {
    bottom: 0,
    height: '50%',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  loading: {
    width: '100%',
  },
  logo: {
    marginBottom: theme.space.lg,
    maxHeight: 100,
    width: 250,
  },
  title: {
    paddingBottom: theme.space.sm,
    paddingHorizontal: theme.space.lg,
    textAlign: 'center',
  },
  wrapper: {
    borderRadius: theme.radii.xxl,
    overflow: 'hidden',
    width: '100%',
  },
})
