import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from 'theme';

const headerHeight = 60;
const tabBarBottomHeight = 50;

export function useSafeHeights() {
  const insets = useSafeAreaInsets();

  const statusBarHeight = insets.top;
  const bottomHeight = insets.bottom;
  const headerSafeHeight = statusBarHeight + headerHeight;
  const tabBarSafeHeight = bottomHeight + tabBarBottomHeight;

  return {
    tabBarBottomHeight: tabBarSafeHeight,
    tabBarBottomSafeHeight: tabBarSafeHeight,
    containerStyle: {
      paddingTop: headerSafeHeight,
      paddingBottom: tabBarSafeHeight + theme.space.md
    },
    headerSafeHeight,
    headerHeight,
    statusBarHeight
  };
}
