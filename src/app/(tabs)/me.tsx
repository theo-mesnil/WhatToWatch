import { useNavigation } from 'expo-router'
import * as React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Alert, Animated, StyleSheet, View } from 'react-native'

import { useUser } from '~/api/account'
import { useDeleteRequestToken } from '~/api/auth'
import { Avatar } from '~/components/Avatar'
import { Button } from '~/components/Button'
import { GradientHeader } from '~/components/GradientHeader'
import { Header } from '~/components/Header'
import { LoginButton } from '~/components/Loginbutton'
import { Text } from '~/components/Text'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { useAuth } from '~/contexts/Auth'
import { BasicLayout } from '~/layouts//Basic'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export default function Discover() {
  const { containerStyle } = useSafeHeights()
  const navigation = useNavigation()
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const { accountId, openLoginWebview } = useAuth()
  const { data: user } = useUser()
  const { mutate: mutateLogout } = useDeleteRequestToken()
  const intl = useIntl()

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

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        hideOnStart
        scrollY={scrollYPosition}
        title={<FormattedMessage defaultMessage="Profile" id="itPgxd" />}
      />
    ),
    [scrollYPosition]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout contentContainerStyle={containerStyle} getScrollYPosition={getScrollYPosition}>
      <GradientHeader scrollY={scrollYPosition} />
      {!accountId && (
        <View style={globalStyles.centered}>
          <LoginButton onPress={openLoginWebview} />
        </View>
      )}
      {accountId && (
        <>
          <View style={styles.user}>
            <Avatar imageUrl={user?.avatar} name={user?.name} size={80} />
            <Text variant="h1">{user?.name}</Text>
          </View>
          <View style={globalStyles.centered}>
            <Button icon="arrow-right-on-rectangle" onPress={() => handleLogout()} size="lg">
              <FormattedMessage defaultMessage="Logout" id="C81/uG" />
            </Button>
          </View>
        </>
      )}
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  user: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.space.md,
    justifyContent: 'center',
    paddingBottom: theme.space.xxl,
  },
})
