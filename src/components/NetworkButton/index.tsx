import { FormattedMessage } from 'react-intl'
import { Linking, StyleSheet, View } from 'react-native'

import type { ButtonProps } from '~/components/Button'
import { Button } from '~/components/Button'
import { NetworkLogo } from '~/components/NetworkLogo'
import { Text } from '~/components/Text'
import { theme } from '~/theme'
import type { NetworkId } from '~/types/content'
import { getNetworkColor } from '~/utils/networks'

export type NetworkButtonProps = Pick<ButtonProps, 'style'> & {
  id: NetworkId
  link: string
}

export function NetworkButton({ id, link, style }: NetworkButtonProps) {
  return (
    <Button
      gradientColors={getNetworkColor(id)}
      isCustomChildren
      onPress={() => Linking.openURL(link)}
      size="lg"
      style={style}
      testID={`network-${id}`}
      withHaptic
    >
      <Text variant="h3">
        <FormattedMessage defaultMessage="Watch on" id="hFKSw/" />
      </Text>
      <View style={styles.logo}>
        <NetworkLogo height={23} id={id} />
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginLeft: theme.space.sm,
  },
})
