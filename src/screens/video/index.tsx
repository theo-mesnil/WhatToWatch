import { useLocalSearchParams } from 'expo-router'
import { Dimensions, View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

import { ModalLayout } from '~/layouts/modal'

const gap = 8
const width = Dimensions.get('window').width - gap
const ratio = width / 16
const height = ratio * 9

export default function Video() {
  const params = useLocalSearchParams<{
    id: string
  }>()
  const videoID = params.id

  return (
    <ModalLayout centered>
      <View testID="video">
        <YoutubePlayer
          height={height}
          videoId={videoID}
          webViewStyle={{ marginLeft: gap }}
          width={width}
        />
      </View>
    </ModalLayout>
  )
}
