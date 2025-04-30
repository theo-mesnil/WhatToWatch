import { FormattedMessage, useIntl } from 'react-intl'
import { Alert, StyleSheet, View } from 'react-native'

import { useUser } from '~/api/account'
import { useDeleteRequestToken } from '~/api/auth'
import { Avatar } from '~/components/Avatar'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

import { Favorites } from './components/Favorites'

export function Logged() {
  const intl = useIntl()
  const { data: user } = useUser()
  const { mutate: mutateLogout } = useDeleteRequestToken()

  const handleLogout = () =>
    Alert.alert(
      intl.formatMessage({ defaultMessage: 'Log Out 💔', id: 'ujsrRx' }),
      intl.formatMessage({ defaultMessage: 'Are you sure you want to leave?', id: 'KkuYls' }),
      [
        {
          style: 'default',
          text: intl.formatMessage({
            defaultMessage: 'No',
            id: 'oUWADl',
          }),
        },
        {
          onPress: () => mutateLogout(),
          style: 'destructive',
          text: intl.formatMessage({ defaultMessage: 'Yes', id: 'a5msuh' }),
        },
      ]
    )

  return (
    <View style={styles.wrapper}>
      <View style={styles.user}>
        <Avatar imageUrl={user?.avatar} name={user?.name} size={80} />
        <Text variant="h1">{user?.name}</Text>
      </View>
      <Favorites type="tv" />
      <Favorites type="movies" />
      <View style={globalStyles.centered}>
        <Button icon="arrow-right-on-rectangle" onPress={() => handleLogout()} size="lg">
          <FormattedMessage defaultMessage="Logout" id="C81/uG" />
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  user: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.space.md,
    justifyContent: 'center',
  },
  wrapper: {
    gap: theme.space.xxl,
  },
})
