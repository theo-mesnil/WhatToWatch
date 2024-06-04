import { BlurView } from 'expo-blur';
import { Animated, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Logo } from 'components/Logo';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';

type HeaderProps = {
  component?: React.ReactNode;
  scrollY?: Animated.Value;
};

export const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  const { headerHeight, headerSafeHeight, statusBarHeight } = useSafeHeights();

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { height: headerSafeHeight },
        {
          opacity: scrollY?.interpolate({
            inputRange: [400, 450],
            outputRange: [0, 1]
          })
        }
      ]}
    >
      {isAndroid ? (
        <View
          style={[
            { backgroundColor: theme.colors.ahead },
            globalStyles.absoluteFill
          ]}
        />
      ) : (
        <AnimatedBlurView
          style={globalStyles.absoluteFill}
          tint="dark"
          intensity={150}
        />
      )}
      <View
        style={[
          styles.content,
          {
            height: headerHeight,
            marginTop: statusBarHeight
          }
        ]}
      >
        <View
          style={{
            height: headerHeight - 20
          }}
        >
          <Logo />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 999
  },
  content: {
    paddingHorizontal: theme.space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    paddingHorizontal: theme.space.lg
  }
});
