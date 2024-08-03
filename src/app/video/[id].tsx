import { useLocalSearchParams } from 'expo-router';
import { Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { theme } from 'theme';

import ModalLayout from 'layouts/Modal';

const gap = theme.space.sm;
const width = Dimensions.get('window').width - gap;
const ratio = width / 16;
const height = ratio * 9;

export default function Video() {
  const params = useLocalSearchParams<{
    id: string;
  }>();
  const videoID = params.id;

  return (
    <ModalLayout>
      <YoutubePlayer
        webViewStyle={{ marginLeft: gap }}
        height={height}
        width={width}
        videoId={videoID}
      />
    </ModalLayout>
  );
}
