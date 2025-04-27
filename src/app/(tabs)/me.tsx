import { useNavigation } from 'expo-router'
import * as React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { useUser } from '~/api/account'
import { useDeleteRequestToken } from '~/api/auth'
import { Button } from '~/components/Button'
import { Header } from '~/components/Header'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { useAuth } from '~/contexts/Auth'
import { BasicLayout } from '~/layouts//Basic'
import { theme } from '~/theme'

export default function Discover() {
  const { containerStyle, headerSafeHeight } = useSafeHeights()
  const navigation = useNavigation()
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const { accountId, openLoginWebview } = useAuth()
  const { data: user } = useUser()
  const { mutate: handleLogout } = useDeleteRequestToken()

  const HeaderComponent = React.useCallback(
    () => <Header scrollY={scrollYPosition} title={user?.name || user?.username} />,
    [scrollYPosition, user?.name, user?.username]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout
      contentContainerStyle={[containerStyle, styles.wrapper]}
      getScrollYPosition={getScrollYPosition}
    >
      <View style={{ paddingTop: headerSafeHeight }}>
        {!accountId && (
          <Button icon="arrow-right" onPress={openLoginWebview} size="lg">
            Login
          </Button>
        )}
        {accountId && (
          <Button icon="arrow-right-on-rectangle" onPress={() => handleLogout()} size="lg">
            LogOut
          </Button>
        )}
      </View>
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.space.xxl, paddingTop: 0 },
})
