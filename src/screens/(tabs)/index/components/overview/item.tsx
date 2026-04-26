import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'
import { withUniwind } from 'uniwind'

import { useGetContentLogo } from '~/api/logo'
import { Button } from '~/components/button'
import { Text } from '~/components/text'
import { routeByType } from '~/routes/utils'
import type { ContentType } from '~/types/content'
import { getImageUrl } from '~/utils/images'

const UniwindImage = withUniwind(Image)

type ItemProps = {
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
    <View className="h-150 justify-end">
      <UniwindImage className="absolute inset-0" source={getImageUrl(imageUrl, 'w1280')} />
      <View className="items-center h-100 justify-end pb-10 px-8">
        <View className="absolute inset-0 bg-linear-180 from-transparent to-foreground" />
        {!isLoadingLogo && logo && (
          <UniwindImage
            className="max-h-cover-top w-62.5"
            source={getImageUrl(logo.url, 'w500')}
            style={{ aspectRatio: logo.aspectRatio }}
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
