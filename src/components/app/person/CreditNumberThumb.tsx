import { StyleSheet, View } from 'react-native';

import { Gradient } from 'components/Gradient';
import { Icon, MovieFillIcon, TvFillIcon } from 'components/Icon';
import { Text } from 'components/Text';
import { theme } from 'theme';

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
    <View style={styles.wrapper} testID={`credits-${type}`}>
      <Gradient
        angle={0.6}
        colors={[theme.colors['brand-100'], theme.colors.ahead]}
      />
      <View style={styles.content}>
        <View style={styles.icon}>
          <Icon
            icon={type === 'movie' ? MovieFillIcon : TvFillIcon}
            size={80}
            color="default-900"
          />
        </View>
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
