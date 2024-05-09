import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import type { UseGetTvSeasonApiResponse } from 'api/tv';
import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import { getImageUrl } from 'utils/images';

export type EpisodeThumbProps = Pick<
  UseGetTvSeasonApiResponse['episodes'][number],
  'id' | 'name' | 'overview'
> & {
  imageUrl: UseGetTvSeasonApiResponse['episodes'][number]['still_path'];
};

export function EpisodeThumb({
  id,
  imageUrl,
  name,
  overview
}: EpisodeThumbProps) {
  return (
    <View style={styles.wrapper} key={id}>
      <View style={styles.thumb}>
        <Thumb
          type="tv"
          aspectRatio={16 / 9}
          imageUrl={getImageUrl(imageUrl)}
        />
      </View>
      <View style={styles.infos}>
        <Text style={styles.name} variant="lg">
          {name}
        </Text>
        {overview && <Text numberOfLines={4}>{overview}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  thumb: {
    width: 130
  },
  infos: {
    marginLeft: theme.space.md,
    flexShrink: 1,
    gap: theme.space.xxs
  },
  name: {
    color: theme.colors.white
  }
});
