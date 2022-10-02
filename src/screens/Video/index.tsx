import { useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React, { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import {
  ExternalLinkIcon,
  Icon,
  PauseCircleIcon,
  PlayCircleIcon
} from 'components/Icon';
import { windowWidth } from 'constants/screen';

const width = windowWidth;
const ratio = windowWidth / 16;
const height = ratio * 9;

export function VideoScreen() {
  const [isPlaying, setIsPlaying] = useState(true);
  const route = useRoute<RootStackScreenProps<'Video'>['route']>();
  const { id } = route?.params;

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setIsPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <Box flex={1} justifyContent="center" alignItems="center">
        <YoutubePlayer
          height={height}
          width={width}
          play={isPlaying}
          videoId={`${id}`}
          onChangeState={onStateChange}
        />
        <Box flexDirection="row" mt="xl">
          <Button onPress={togglePlaying} mr="md" isCustomChildren>
            <Icon
              color="dark900"
              icon={isPlaying ? PauseCircleIcon : PlayCircleIcon}
            />
          </Button>
          <Button
            onPress={() =>
              Linking.openURL(`https://www.youtube.com/watch?v=${id}`)
            }
            isCustomChildren
          >
            <Icon color="dark900" icon={ExternalLinkIcon} />
          </Button>
        </Box>
      </Box>
    </>
  );
}
