import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Alert, View } from 'react-native'

import { useUser } from '~/api/account'
import { useDeleteRequestToken } from '~/api/logout'
import { Avatar } from '~/components/avatar'
import { Button } from '~/components/button'
import { LoginWithDescription } from '~/components/login-with-description'
import { Text } from '~/components/text'
import { useAuth } from '~/contexts/auth'
import { useTheme } from '~/contexts/theme'
import { ModalLayout } from '~/layouts/modal'

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
        <View className="gap-8">
          <View className="items-center flex-col gap-3 justify-center">
            <Avatar imageUrl={user?.avatar ?? undefined} name={user?.name} size={80} />
            <Text variant="h1">{user?.name}</Text>
          </View>
          <View className="mx-screen">
            <Button icon="log-out" onPress={() => handleLogout()} size="lg" withHaptic>
              <FormattedMessage defaultMessage="Logout" id="C81/uG" />
            </Button>
          </View>
        </View>
      )}
    </ModalLayout>
  )
}
