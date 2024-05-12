import { FormattedMessage } from 'react-intl';
import { Linking, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import type { NetworkId } from 'types/content';
import { getNetworkColor, getNetworkLogo } from 'utils/networks';

export type ButtonNetworkProps = {
  id: NetworkId;
  link: string;
};

export function ButtonNetwork({ id, link }: ButtonNetworkProps) {
  return (
    <Button
      size="lg"
      style={styles.wrapper}
      gradientColors={getNetworkColor(id)}
      onPress={() => Linking.openURL(link)}
    >
      <FormattedMessage defaultMessage="Watch on" id="watch-on" />
      {'  '}
      <View style={styles.logo}>
        <Icon size={60} icon={getNetworkLogo(id)} />
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.space.marginList
  },
  logo: {
    justifyContent: 'center',
    paddingTop: 7
  }
});
