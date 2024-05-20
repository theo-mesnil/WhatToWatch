import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';

export type PersonThumbProps = {
  character?: string;
  imageUrl: string;
  name: string;
};

export function PersonThumb({ character, imageUrl, name }: PersonThumbProps) {
  return (
    <View>
      <Thumb isRounded aspectRatio={1 / 1} type="person" imageUrl={imageUrl} />
      <Text style={styles.name}>{name}</Text>
      {character && <Text>{character}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: theme.colors.white,
    marginTop: theme.space.xs
  }
});
