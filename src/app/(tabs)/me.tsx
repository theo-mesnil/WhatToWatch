import { useNavigation } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Animated, StyleSheet, View } from 'react-native'

import { Logged } from '~/components/app/me/logged'
import { GradientHeader } from '~/components/GradientHeader'
import { Header } from '~/components/Header'
import { Icon } from '~/components/Icon'
import { LoginButton } from '~/components/Loginbutton'
import { Text } from '~/components/Text'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { useAuth } from '~/contexts/Auth'
import { BasicLayout } from '~/layouts//Basic'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export default function Discover() {
  const { containerStyle, headerHeight } = useSafeHeights()
  const navigation = useNavigation()
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const { accountId, openLoginWebview } = useAuth()

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        hideOnStart={!!accountId}
        scrollY={scrollYPosition}
        title={<FormattedMessage defaultMessage="Profile" id="itPgxd" />}
      />
    ),
    [scrollYPosition, accountId]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout
      contentContainerStyle={[
        containerStyle,
        accountId ? { paddingTop: headerHeight + theme.space.lg } : {},
      ]}
      getScrollYPosition={getScrollYPosition}
    >
      <GradientHeader scrollY={scrollYPosition} />
      {!accountId && (
        <View style={[styles.notLogged, globalStyles.centered]}>
          <View style={styles.bullet}>
            <Icon color="brand-500" name="heart-fill" size={30} />
            <Text variant="h2">
              <FormattedMessage
                defaultMessage="Manage your favourite films and series"
                id="K0XQE7"
              />
            </Text>
          </View>
          <View style={styles.bullet}>
            <Icon color="brand-500" name="bookmark-fill" size={30} />
            <Text variant="h2">
              <FormattedMessage
                defaultMessage="Add movies and series on your watchlist"
                id="OQEcON"
              />
            </Text>
          </View>
          <View style={styles.bullet}>
            <Icon color="brand-500" name="user-circle-fill" size={30} />
            <Text variant="h2">
              <FormattedMessage
                defaultMessage="Get recommandations based on your profile"
                id="a8fdyL"
              />
            </Text>
          </View>
          <View style={styles.empty}>
            <Text variant="lg">
              <FormattedMessage
                defaultMessage="Use your TMDB account to sync your watchlist, favorite and more."
                id="TKM0PN"
              />
            </Text>
            <LoginButton onPress={openLoginWebview} />
          </View>
        </View>
      )}
      {accountId && <Logged />}
    </BasicLayout>
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
})
