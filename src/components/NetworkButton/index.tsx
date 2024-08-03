import { FormattedMessage } from 'react-intl';
import { Linking, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import type { ButtonProps } from 'components/Button';
import { Button } from 'components/Button';
import { NetworkLogo } from 'components/NetworkLogo';
import { Text } from 'components/Text';
import type { NetworkId } from 'types/content';
import { getNetworkColor } from 'utils/networks';

export type NetworkButtonProps = Pick<ButtonProps, 'style'> & {
  id: NetworkId;
  link: string;
};

export function NetworkButton({ id, link, style }: NetworkButtonProps) {
  return (
    <Button
      size="lg"
      gradientColors={getNetworkColor(id)}
      onPress={() => Linking.openURL(link)}
      style={style}
      isCustomChildren
    >
      <Text variant="h3">
        <FormattedMessage defaultMessage="Watch on" id="watch-on" />
      </Text>
      <View style={styles.logo}>
        <NetworkLogo id={id} height={23} />
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginLeft: theme.space.sm
  }
});
