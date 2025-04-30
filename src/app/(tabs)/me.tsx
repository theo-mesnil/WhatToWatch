import { useNavigation } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Animated, View } from 'react-native'

import { Logged } from '~/components/app/me/logged'
import { GradientHeader } from '~/components/GradientHeader'
import { Header } from '~/components/Header'
import { LoginButton } from '~/components/Loginbutton'
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
        <View style={globalStyles.centered}>
          <LoginButton onPress={openLoginWebview} />
        </View>
      )}
      {accountId && <Logged />}
    </BasicLayout>
  )
}
