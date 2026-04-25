import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import type { ButtonProps } from '~/components/new/button'
import { Button } from '~/components/new/button'
import { TMDBLogo } from '~/components/new/tmdb-logo'

type LoginButtonProps = {
  onPress: ButtonProps['onPress']
}

export const LoginButton = ({ onPress }: LoginButtonProps) => {
  return (
    <Button
      className="w-full"
      customRightElement={
        <View>
          <TMDBLogo height={23} />
        </View>
      }
      onPress={onPress}
      size="lg"
      withHaptic
    >
      <FormattedMessage defaultMessage="Login with" id="+iFjzy" />
    </Button>
  )
}
