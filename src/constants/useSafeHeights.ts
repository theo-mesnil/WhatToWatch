import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from 'theme';

const headerHeight = 60;
const tabBarBottomHeight = 50;

export function useSafeHeights(withComponent?: boolean) {
  const insets = useSafeAreaInsets();
  const heightWithComponent = withComponent ? headerHeight : 0;

  const statusBarHeight = insets.top;
  const bottomHeight = insets.bottom;
  const headerSafeHeight = statusBarHeight + headerHeight + heightWithComponent;
  const tabBarSafeHeight = bottomHeight + tabBarBottomHeight;

  return {
    tabBarBottomHeight: tabBarSafeHeight,
    tabBarBottomSafeHeight: tabBarSafeHeight,
    containerStyle: {
      paddingTop: headerSafeHeight,
      paddingBottom: tabBarSafeHeight + theme.space.xl
    },
    headerSafeHeight,
    headerHeight,
    statusBarHeight
  };
}
