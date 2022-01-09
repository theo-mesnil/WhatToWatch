import React, { useCallback, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Linking } from 'react-native';

import { Box } from 'components/Box';
import { Header } from 'components/Header';
import { windowWidth } from 'constants/screen';
import { Button } from 'components/Button';
import {
  ExternalLinkIcon,
  Icon,
  PauseCircleIcon,
  PlayCircleIcon
} from 'components/Icon';

const width = windowWidth;
const ratio = windowWidth / 16;
const height = ratio * 9;

export function VideoScreen() {
  const [isPlaying, setIsPlaying] = useState(true);
  const route = useRoute();
  const { id, title } = route?.params;

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
      <Header position="relative" withCrossIcon opacity={1} title={title} />
      <Box flex={1} justifyContent="center" alignItems="center">
        <YoutubePlayer
          height={height}
          width={width}
          play={isPlaying}
          videoId={id}
          onChangeState={onStateChange}
        />
        <Box flexDirection="row" mt="xl">
          <Button onPress={togglePlaying} mr="md" isCustomChildren>
            <Icon icon={isPlaying ? PauseCircleIcon : PlayCircleIcon} />
          </Button>
          <Button
            onPress={() =>
              Linking.openURL(`https://www.youtube.com/watch?v=${id}`)
            }
            isCustomChildren
          >
            <Icon icon={ExternalLinkIcon} />
          </Button>
        </Box>
      </Box>
    </>
  );
}
