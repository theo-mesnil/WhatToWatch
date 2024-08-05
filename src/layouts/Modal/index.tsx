import { useNavigation } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Button } from 'components/Button';
import { CrossIcon, Icon } from 'components/Icon';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';

export type ModalLayoutProps = {
  children: React.ReactNode;
};

export default function ModalLayout({ children }: ModalLayoutProps) {
  const navigation = useNavigation();
  const { statusBarHeight } = useSafeHeights();

  const HeaderComponent = React.useCallback(
    () => (
      <View
        style={[styles.header, isAndroid && { paddingTop: statusBarHeight }]}
      >
        <Button
          isCustomChildren
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Icon icon={CrossIcon} />
        </Button>
      </View>
    ),
    [navigation, statusBarHeight]
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return <View style={styles.wrapper}>{children}</View>;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.behind,
    alignItems: 'flex-end',
    position: 'absolute',
    width: '100%'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.behind
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    paddingHorizontal: 0,
    backgroundColor: theme.colors['default-600'],
    marginRight: theme.space.md,
    marginTop: theme.space.md
  }
});
