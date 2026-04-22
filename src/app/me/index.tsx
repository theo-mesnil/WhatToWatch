import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Alert, StyleSheet, View } from 'react-native'

import { useUser } from '~/api/account'
import { useDeleteRequestToken } from '~/api/logout'
import { Avatar } from '~/components/Avatar'
import { Button } from '~/components/new/button'
import { LoginWithDescription } from '~/components/new/login-with-description'
import { Text } from '~/components/Text/index'
import { useAuth } from '~/contexts/Auth'
import { useTheme } from '~/contexts/theme'
import { ModalLayout } from '~/layouts/modal'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export default function Me() {
  const { changeTheme } = useTheme()
  const { accountId } = useAuth()
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
    <ModalLayout>
      <Button onPress={() => changeTheme('light')}>Light</Button>
      <Button onPress={() => changeTheme('dark')}>Dark</Button>
      <Button onPress={() => changeTheme('system')}>System</Button>
      {!accountId && <LoginWithDescription />}
      {accountId && (
        <View style={styles.wrapper}>
          <View style={styles.user}>
            <Avatar imageUrl={user?.avatar ?? undefined} name={user?.name} size={80} />
            <Text variant="h1">{user?.name}</Text>
          </View>
          <View style={globalStyles.centered}>
            <Button icon="log-out" onPress={() => handleLogout()} size="lg" withHaptic>
              <FormattedMessage defaultMessage="Logout" id="C81/uG" />
            </Button>
          </View>
        </View>
      )}
    </ModalLayout>
  )
}

const styles = StyleSheet.create({
  bullet: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.sm,
  },
  empty: {
    backgroundColor: theme.colors.ahead,
    borderRadius: theme.radii.md,
    gap: theme.space.md,
    marginTop: theme.space.xl,
    padding: theme.space.xl,
  },
  notLogged: {
    gap: theme.space.lg,
    marginTop: theme.space.xxl,
  },
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
