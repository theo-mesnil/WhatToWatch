import { router } from 'expo-router';
import { Linking, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import { Touchable } from 'components/Touchable';

export type VideoThumbProps = {
  id: string;
  name: string;
  platform: string;
  type: 'movie' | 'tv';
};

export function VideoThumb({ id, name, platform, type }: VideoThumbProps) {
  const isYoutube = platform === 'YouTube';
  const imageUrl = isYoutube
    ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    : `https://i.vimeocdn.com/video/${id}_640.jpg`;

  function handlePress() {
    if (isYoutube) {
      router.navigate(`video/${id}`);
    } else {
      Linking.openURL(`https://vimeo.com/${id}`);
    }
  }

  return (
    <Touchable onPress={handlePress}>
      <Thumb aspectRatio={16 / 9} type={type} imageUrl={imageUrl} />
      <View style={styles.text}>
        <Text variant="h3" numberOfLines={2}>
          {name}
        </Text>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: theme.space.xs
  }
});
