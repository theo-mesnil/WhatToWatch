import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { useGetContentLogo } from '~/api/logo'
import { Button } from '~/components/button'
import { Text } from '~/components/text'
import { routeByType } from '~/routes/utils'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'
import type { ContentType } from '~/types/content'
import { getImageUrl } from '~/utils/images'

export type ItemProps = {
  description?: string
  id: number
  imageUrl: string
  title: string
  type: ContentType
}

export function Item({ description, id, imageUrl, title, type }: ItemProps) {
  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id,
    type,
  })

  return (
    <View style={styles.wrapper}>
      <Image source={getImageUrl(imageUrl, 'w1280')} style={globalStyles.absoluteFill} />
      <View style={styles.content}>
        <View className="absolute inset-0 bg-linear-180 from-transparent to-foreground" />
        {!isLoadingLogo && logo && (
          <Image
            source={getImageUrl(logo.url, 'w500')}
            style={[styles.logo, { aspectRatio: logo.aspectRatio }]}
          />
        )}
        {!isLoadingLogo && !logo && (
          <Text className="text-center" variant="h0">
            {title}
          </Text>
        )}
        <Text className="text-center mt-1.5 text-text-maximal" numberOfLines={3}>
          {description}
        </Text>
        <Link asChild href={routeByType({ id, type })}>
          <Button className="mt-4" icon="arrow-forward" networkId={213} size="lg" withHaptic>
            <FormattedMessage defaultMessage="Discover" id="cE4Hfw" />
          </Button>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    paddingHorizontal: theme.space.xxl,
  },
  logo: {
    maxHeight: 150,
    width: 250,
  },
  wrapper: {
    height: 600,
    justifyContent: 'flex-end',
  },
})
