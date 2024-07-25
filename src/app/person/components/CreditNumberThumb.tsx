import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { Text } from 'components/Text';

export type CreditNumberThumbProps = {
  number: number;
  title: React.ReactElement;
};

export function CreditNumberThumb({ number, title }: CreditNumberThumbProps) {
  return (
    <View style={styles.wrapper}>
      <Gradient
        colors={[theme.colors['brand-600'], theme.colors['brand-900']]}
      />
      <Text variant="h0">{number}</Text>
      <Text variant="h1" style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    padding: theme.space.md
  },
  title: {
    textTransform: 'uppercase'
  }
});
