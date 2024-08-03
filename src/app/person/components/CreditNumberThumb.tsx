import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { MovieFillIcon, TvFillIcon } from 'components/Icon';
import { Text } from 'components/Text';

export type CreditNumberThumbProps = {
  number: number;
  title: React.ReactElement;
  type: 'movie' | 'tv';
};

export function CreditNumberThumb({
  number,
  title,
  type
}: CreditNumberThumbProps) {
  return (
    <View style={styles.wrapper}>
      <Gradient
        angle={0.6}
        colors={[theme.colors['brand-100'], theme.colors.ahead]}
      />
      <View style={styles.content}>
        {type === 'movie' ? (
          <MovieFillIcon
            width={80}
            color={theme.colors['default-900']}
            height={80}
            style={styles.icon}
          />
        ) : (
          <TvFillIcon
            width={80}
            color={theme.colors['default-900']}
            height={80}
            style={styles.icon}
          />
        )}
        <View>
          <Text variant="h0" style={styles.number}>
            {number}
          </Text>
          <Text variant="h2" style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.md,
    overflow: 'hidden'
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    marginLeft: -30,
    opacity: 0.4
  },
  number: {
    marginBottom: -theme.space.xs
  },
  title: {
    textTransform: 'capitalize'
  }
});
