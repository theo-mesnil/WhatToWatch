import { BlurView } from 'expo-blur';
import { useNavigation } from 'expo-router';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

import { Button } from 'components/Button';
import { ArrowBackIcon, Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';
import { globalStyles } from 'styles';
import { theme } from 'theme';

type HeaderProps = {
  component?: React.ReactNode;
  scrollY?: Animated.Value;
  showHeaderOnStart?: boolean;
  title: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  scrollY,
  showHeaderOnStart,
  title
}) => {
  const { headerHeight, headerSafeHeight, statusBarHeight } = useSafeHeights();
  const navigation = useNavigation();

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const opacity = showHeaderOnStart ? 1 : 0;

  return (
    <View
      style={[
        styles.wrapper,
        {
          height: headerSafeHeight - 20
        }
      ]}
    >
      {isAndroid ? (
        <Animated.View
          style={[
            {
              opacity: scrollY?.interpolate({
                inputRange: [250, 300],
                outputRange: [0, 1]
              }),
              backgroundColor: theme.colors.ahead
            },
            globalStyles.absoluteFill
          ]}
        />
      ) : (
        <AnimatedBlurView
          style={[
            {
              opacity: scrollY?.interpolate({
                inputRange: [250, 300],
                outputRange: [opacity, 1]
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
          styles.content,
          {
            top: statusBarHeight,
            height: headerHeight - 20
          }
        ]}
      >
        <Button
          isCustomChildren
          isTransparent
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
          testID="header-back-button"
        >
          <Icon icon={ArrowBackIcon} size={30} />
        </Button>
        <Animated.View
          style={{
            opacity: scrollY?.interpolate({
              inputRange: [250, 300],
              outputRange: [opacity, 1]
            })
          }}
        >
          <Text
            style={{
              maxWidth: Dimensions.get('window').width - 60
            }}
            variant="h2"
            numberOfLines={1}
          >
            {title}
          </Text>
        </Animated.View>
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
  content: {
    paddingHorizontal: theme.space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.sm
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    paddingHorizontal: 0,
    backgroundColor: 'transparent'
  }
});
