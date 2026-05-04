import { FormattedMessage } from 'react-intl'
import { Linking } from 'react-native'

import type { ButtonProps } from '~/components/button'
import { Button } from '~/components/button'
import { NetworkLogo } from '~/components/network-logo'
import type { NetworkId } from '~/types/content'
import { getNetworkBackgroundClassName } from '~/utils/networks'

type NetworkButtonProps = Pick<ButtonProps, 'className'> & {
  id: NetworkId
  link: string
}

export function NetworkButton({ className = '', id, link }: NetworkButtonProps) {
  const backgroundNetworkColor = id ? getNetworkBackgroundClassName(id) : ''

  return (
    <Button
      className={`${className} ${backgroundNetworkColor}`}
      customRightElement={<NetworkLogo height={23} id={id} />}
      networkId={id}
      onPress={() => Linking.openURL(link)}
      size="xl"
      testID={`network-${id}`}
      withHaptic
    >
      <FormattedMessage defaultMessage="Watch on" id="hFKSw/" />
    </Button>
  )
}
