import { useHeaderHeight } from '@react-navigation/elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useTheme } from 'styled-components/native';

export const statusBarHeight = getStatusBarHeight();

export function useHeaderHeights() {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();

  return {
    headerHeight: headerHeight + theme.space.xl,
    statusBarHeight
  };
}
