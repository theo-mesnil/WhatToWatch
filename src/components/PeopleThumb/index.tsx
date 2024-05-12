import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';

export type PeopleThumbProps = {
  character?: string;
  imageUrl: string;
  name: string;
};

export function PeopleThumb({ character, imageUrl, name }: PeopleThumbProps) {
  return (
    <View>
      <Thumb aspectRatio={3 / 4} type="person" imageUrl={imageUrl} />
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
