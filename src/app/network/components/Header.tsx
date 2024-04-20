import { BlurView } from 'expo-blur';
import { useNavigation } from 'expo-router';
import { Animated, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Button } from 'components/Button';
import { ArrowBackIcon, Icon } from 'components/Icon';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';
import type { NetworkId } from 'types/content';
import { getNetworkLogo } from 'utils/networks';

type HeaderProps = {
  id: NetworkId;
  scrollY: Animated.Value;
};

export const Header: React.FC<HeaderProps> = ({ id, scrollY }) => {
  const { headerHeight, headerSafeHeight, statusBarHeight } = useSafeHeights();
  const navigation = useNavigation();
  const styles = useStyles();

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return (
    <View style={{ ...styles.wrapper, height: headerSafeHeight }}>
      {isAndroid ? (
        <Animated.View
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [0, 1]
            }),
            backgroundColor: theme.colors.ahead,
            ...globalStyles.absoluteFill
          }}
        />
      ) : (
        <AnimatedBlurView
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [0, 1]
            }),
            ...globalStyles.absoluteFill
          }}
          tint="dark"
          intensity={150}
        />
      )}
      <View
        style={{
          ...styles.backButton,
          height: headerHeight,
          marginTop: statusBarHeight
        }}
      >
        <Button
          isTransparent
          isCustomChildren
          onPress={() => navigation.goBack()}
        >
          <Icon icon={ArrowBackIcon} />
        </Button>
        <View style={styles.logo}>
          <Icon size={100} icon={getNetworkLogo(id)} />
        </View>
        <View style={styles.end} />
      </View>
    </View>
  );
};

function useStyles() {
  return StyleSheet.create({
    wrapper: {
      width: '100%',
      position: 'absolute',
      zIndex: 999
    },
    backButton: {
      paddingHorizontal: theme.space.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    logo: {
      flex: 6,
      alignItems: 'center'
    },
    end: {
      flex: 1
    }
  });
}
