import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import { getImageUrl } from 'utils/images';
import { formatTime } from 'utils/time';

export type EpisodeThumbProps = {
  id: number;
  imageUrl: string;
  name: string;
  number: number;
  overview?: string;
  runtime?: number;
};

export function EpisodeThumb({
  id,
  imageUrl,
  name,
  number,
  overview,
  runtime
}: EpisodeThumbProps) {
  return (
    <View style={styles.wrapper} key={id}>
      <View style={styles.main}>
        <View style={styles.thumb}>
          <Thumb
            type="tv"
            aspectRatio={16 / 9}
            imageUrl={getImageUrl(imageUrl)}
          />
        </View>
        <View style={styles.infos}>
          <Text style={styles.name} variant="lg">
            {number}. {name}
          </Text>
          {runtime && <Text>{formatTime(runtime)}</Text>}
        </View>
      </View>
      {overview && <Text>{overview}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.space.md
  },
  main: {
    flexDirection: 'row'
  },
  thumb: {
    width: 120
  },
  infos: {
    marginLeft: theme.space.md,
    flexShrink: 1,
    justifyContent: 'center',
    gap: theme.space.sm
  },
  name: {
    color: theme.colors.white
  }
});
