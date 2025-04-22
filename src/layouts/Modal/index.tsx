import { useNavigation } from 'expo-router'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Button } from '~/components/Button'
import { CrossIcon, Icon } from '~/components/Icon'
import { isAndroid } from '~/constants/screen'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { theme } from '~/theme'

export type ModalLayoutProps = {
  children: React.ReactNode
}

export default function ModalLayout({ children }: ModalLayoutProps) {
  const navigation = useNavigation()
  const { statusBarHeight } = useSafeHeights()

  const HeaderComponent = React.useCallback(
    () => (
      <View style={[styles.header, isAndroid && { paddingTop: statusBarHeight }]}>
        <Button
          isCustomChildren
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
          testID="header-close-button"
        >
          <Icon icon={CrossIcon} />
        </Button>
      </View>
    ),
    [navigation, statusBarHeight]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return <View style={styles.wrapper}>{children}</View>
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: theme.colors['default-600'],
    borderRadius: 30,
    height: 30,
    marginRight: theme.space.md,
    marginTop: theme.space.md,
    paddingHorizontal: 0,
    width: 30,
  },
  header: {
    alignItems: 'flex-end',
    backgroundColor: theme.colors.behind,
    position: 'absolute',
    width: '100%',
  },
  wrapper: {
    backgroundColor: theme.colors.behind,
    flex: 1,
    justifyContent: 'center',
  },
})
