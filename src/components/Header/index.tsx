import { BlurView } from 'expo-blur';
import { Animated, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Icon, MoreFillIcon } from 'components/Icon';
import { Text } from 'components/Text';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';

type HeaderProps = {
  scrollY?: Animated.Value;
  title: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ scrollY, title }) => {
  const { headerHeight, headerSafeHeight, statusBarHeight } = useSafeHeights();
  const styles = useStyles();

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return (
    <View style={{ ...styles.wrapper, height: headerSafeHeight }}>
      {isAndroid ? (
        <Animated.View
          style={{
            opacity: scrollY?.interpolate({
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
            opacity: scrollY?.interpolate({
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
          ...styles.content,
          height: headerHeight,
          marginTop: statusBarHeight
        }}
      >
        <Text variant="h1">{title}</Text>
        <Icon icon={MoreFillIcon} />
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
    content: {
      paddingHorizontal: theme.space.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  });
}
