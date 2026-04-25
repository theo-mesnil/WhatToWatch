import type { DimensionValue } from 'react-native'
import { View } from 'react-native'

import AppleTvPlus from '~/assets/networks-logos/apple-tv-plus'
import DisneyPlus from '~/assets/networks-logos/disney-plus'
import Fox from '~/assets/networks-logos/fox'
import HBO from '~/assets/networks-logos/hbo'
import Hulu from '~/assets/networks-logos/hulu'
import Netflix from '~/assets/networks-logos/netflix'
import ParamountPlus from '~/assets/networks-logos/paramount-plus'
import PrimeVideo from '~/assets/networks-logos/prime-video'
import Showtime from '~/assets/networks-logos/showtime'
import {
  NETWORK_APPLE_TV_PLUS_ID,
  NETWORK_DISNEY_PLUS_ID,
  NETWORK_FOX_ID,
  NETWORK_HBO_ID,
  NETWORK_HULU_ID,
  NETWORK_NETFLIX_ID,
  NETWORK_PARAMOUNT_PLUS,
  NETWORK_PRIME_VIDEO,
  NETWORK_SHOWTIME_ID,
} from '~/constants/networks'
import { theme } from '~/theme'
import type { NetworkId } from '~/types/content'

export type NetworkLogoProps = {
  color?: string
  height?: DimensionValue
  id: NetworkId
  width?: DimensionValue
}

export function NetworkLogo({ color = theme.colors.white, height, id, width }: NetworkLogoProps) {
  return (
    <View
      style={{
        height,
        width,
      }}
    >
      {id === NETWORK_APPLE_TV_PLUS_ID && <AppleTvPlus color={color} />}
      {id === NETWORK_DISNEY_PLUS_ID && <DisneyPlus color={color} />}
      {id === NETWORK_FOX_ID && <Fox color={color} />}
      {id === NETWORK_HBO_ID && <HBO color={color} />}
      {id === NETWORK_HULU_ID && <Hulu color={color} />}
      {id === NETWORK_NETFLIX_ID && <Netflix color={color} />}
      {id === NETWORK_PRIME_VIDEO && <PrimeVideo color={color} />}
      {id === NETWORK_SHOWTIME_ID && <Showtime color={color} />}
      {id === NETWORK_PARAMOUNT_PLUS && <ParamountPlus color={color} />}
    </View>
  )
}
