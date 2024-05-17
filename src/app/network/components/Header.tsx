import { BlurView } from 'expo-blur';
import { useNavigation } from 'expo-router';
import { Animated, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Button } from 'components/Button';
import { ArrowBackIcon, Icon } from 'components/Icon';
import { NetworkLogo } from 'components/NetworkLogo';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';
import type { NetworkId } from 'types/content';

type HeaderProps = {
  id: NetworkId;
  scrollY: Animated.Value;
};

export const Header: React.FC<HeaderProps> = ({ id, scrollY }) => {
  const { headerHeight, headerSafeHeight, statusBarHeight } = useSafeHeights();
  const navigation = useNavigation();

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return (
    <View style={[styles.wrapper, { height: headerSafeHeight }]}>
      {isAndroid ? (
        <Animated.View
          style={[
            globalStyles.absoluteFill,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 1]
              }),
              backgroundColor: theme.colors.ahead
            }
          ]}
        />
      ) : (
        <AnimatedBlurView
          style={[
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 1]
              })
            },
            globalStyles.absoluteFill
          ]}
          tint="dark"
          intensity={150}
        />
      )}
      <View
        style={[
          {
            height: headerHeight,
            marginTop: statusBarHeight
          },
          styles.backButton
        ]}
      >
        <Button
          isTransparent
          isCustomChildren
          onPress={() => navigation.goBack()}
        >
          <Icon icon={ArrowBackIcon} />
        </Button>
        <View style={styles.logo}>
          <NetworkLogo id={id} width={100} />
        </View>
        <View style={styles.end} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
