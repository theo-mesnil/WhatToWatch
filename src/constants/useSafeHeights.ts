import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { theme } from '~/theme'

import { isAndroid } from './screen'

const headerHeight = 60
const tabBarBottomHeight = 50

export function useSafeHeights(withComponent?: boolean) {
  const insets = useSafeAreaInsets()
  const heightWithComponent = withComponent ? headerHeight : 0

  const statusBarHeight = insets.top
  const bottomHeight = insets.bottom + (isAndroid ? 8 : 0)
  const headerSafeHeight = statusBarHeight + headerHeight + heightWithComponent
  const tabBarSafeHeight = bottomHeight + tabBarBottomHeight

  return {
    containerStyle: {
      paddingBottom: tabBarSafeHeight + theme.space.xl,
      paddingTop: headerSafeHeight,
    },
    headerHeight,
    headerSafeHeight,
    statusBarHeight,
    tabBarBottomHeight: tabBarSafeHeight,
    tabBarBottomSafeHeight: tabBarSafeHeight,
  }
}
