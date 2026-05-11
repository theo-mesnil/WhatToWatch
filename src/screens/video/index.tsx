import { useLocalSearchParams } from 'expo-router'
import { useWindowDimensions, View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

import { ModalLayout } from '~/layouts/modal'

const GAP = 8

export default function Video() {
  const params = useLocalSearchParams<{
    id: string
  }>()
  const videoID = params.id

  const { width: windowWidth } = useWindowDimensions()
  const width = windowWidth - GAP
  const height = (width / 16) * 9

  return (
    <ModalLayout centered>
      <View testID="video">
        <YoutubePlayer
          height={height}
          videoId={videoID}
          webViewStyle={{ marginLeft: GAP }}
          width={width}
        />
      </View>
    </ModalLayout>
  )
}
