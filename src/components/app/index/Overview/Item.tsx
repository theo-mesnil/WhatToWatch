import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'

import { useGetContentLogo } from '~/api/logo'
import { Button } from '~/components/Button'
import { Gradient } from '~/components/Gradient'
import { Text } from '~/components/Text'
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
      <ImageBackground
        source={{
          uri: getImageUrl(imageUrl, 'w1280'),
        }}
        style={globalStyles.absoluteFill}
      />
      <View style={styles.content}>
        <Gradient colors={['transparent', theme.colors.behind]} />
        {!isLoadingLogo && logo && (
          <Image
            src={getImageUrl(logo.url, 'w500')}
            style={[styles.logo, { aspectRatio: logo.aspectRatio }]}
          />
        )}
        {!isLoadingLogo && !logo && (
          <Text style={styles.title} variant="h0">
            {title}
          </Text>
        )}
        <Text numberOfLines={3} style={styles.subtitle}>
          {description}
        </Text>
        <Link asChild href={routeByType({ id, type })}>
          <Button icon="arrow-right" size="lg" style={styles.cta} variant="secondary">
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
  cta: {
    marginTop: theme.space.lg,
  },
  logo: {
    maxHeight: 150,
    width: 250,
  },
  subtitle: {
    color: theme.colors.white,
    marginTop: theme.space.sm,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  wrapper: {
    height: 600,
    justifyContent: 'flex-end',
  },
})
