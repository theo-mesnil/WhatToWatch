import { FormattedMessage } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { theme } from '~/theme'

import type { ButtonProps } from '../Button'
import { Button } from '../Button'
import { Text } from '../Text'
import { TMDBLogo } from '../TMDBLogo'

type LoginButtonProps = {
  onPress: ButtonProps['onPress']
}

export const LoginButton = ({ onPress }: LoginButtonProps) => {
  return (
    <Button isCustomChildren onPress={onPress} size="lg" style={styles.button} withHaptic>
      <Text variant="h3">
        <FormattedMessage defaultMessage="Login with" id="+iFjzy" />
      </Text>
      <View style={styles.logo}>
        <TMDBLogo height={23} />
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  logo: {
    marginLeft: theme.space.sm,
  },
})
