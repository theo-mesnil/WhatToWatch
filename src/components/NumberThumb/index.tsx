import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import type { ContentType } from 'types/content';

export type NumberThumbProps = {
  imageUrl: string;
  number: number;
  type: ContentType;
};

export function NumberThumb({ imageUrl, number, type }: NumberThumbProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.numberWrapper}>
        <Text variant="h0" style={styles.number}>
          {number}
        </Text>
      </View>
      <View style={[styles.thumb, number === 1 && styles.firstNumber]}>
        <Thumb imageUrl={imageUrl} type={type} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row' },
  thumb: {
    width: 110,
    marginLeft: 45
  },
  firstNumber: {
    marginLeft: 37
  },
  numberWrapper: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    justifyContent: 'center'
  },
  number: {
    flexDirection: 'row',
    letterSpacing: -15,
    color: theme.colors['brand-500'],
    fontSize: 100,
    lineHeight: 100
  }
});
