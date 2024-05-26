import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { Text } from 'components/Text';
import { genresColor } from 'utils/genres';

export type GenreThumbProps = {
  id: number;
  title: string;
};

export function GenreThumb({ id, title }: GenreThumbProps) {
  const gradientColors = genresColor[id as keyof typeof genresColor];

  return (
    <View style={styles.wrapper}>
      <Gradient angle={0.4} colors={gradientColors} />
      <Text variant="h2">{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    aspectRatio: 2 / 1,
    padding: theme.space.md,
    justifyContent: 'flex-end'
  }
});
