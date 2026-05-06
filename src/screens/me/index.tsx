import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Alert, View } from 'react-native'

import { useUser } from '~/api/account'
import { useDeleteRequestToken } from '~/api/logout'
import { Avatar } from '~/components/avatar'
import { Button } from '~/components/button'
import { LoginWithDescription } from '~/components/login-with-description'
import { RadioList, RadioListItem } from '~/components/radio-list'
import { Section } from '~/components/section'
import { Text } from '~/components/text'
import { useAuth } from '~/contexts/auth'
import type { Theme } from '~/contexts/theme'
import { useTheme } from '~/contexts/theme'
import { ModalLayout } from '~/layouts/modal'

type ThemeValue = { id: Theme; label: string }

const THEMES: ThemeValue[] = [
  { id: 'system', label: 'System' },
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
]

export default function Me() {
  const { changeTheme, theme } = useTheme()
  const { accountId } = useAuth()
  const intl = useIntl()
  const { data: user } = useUser()
  const { mutate: mutateLogout } = useDeleteRequestToken()

  const renderThemeItem = ({ item }: { item: ThemeValue }) => {
    return <RadioListItem>{item.label}</RadioListItem>
  }

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
    <ModalLayout title={<FormattedMessage defaultMessage="Me" id="TdbPNK" />}>
      <View className="gap-8">
        {!accountId && (
          <Section>
            <LoginWithDescription />
          </Section>
        )}
        {accountId && (
          <Section className="flex-row items-center gap-3">
            <Avatar imageUrl={user?.avatar ?? undefined} name={user?.name} size={80} />
            <View>
              <Text variant="h1">{user?.name}</Text>
              <Text>{user?.id}</Text>
            </View>
          </Section>
        )}
        <Section title="Appearance">
          <RadioList<ThemeValue>
            data={THEMES}
            id="themes"
            onPress={(item: ThemeValue) => changeTheme(item.id)}
            renderItem={renderThemeItem}
            selectedId={theme}
          />
        </Section>
        {accountId && (
          <View className="mx-screen">
            <Button icon="log-out" onPress={() => handleLogout()} size="lg" withHaptic>
              <FormattedMessage defaultMessage="Logout" id="C81/uG" />
            </Button>
          </View>
        )}
      </View>
    </ModalLayout>
  )
}
