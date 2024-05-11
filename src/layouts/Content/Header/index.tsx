import { BlurView } from 'expo-blur';
import { useNavigation } from 'expo-router';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Button } from 'components/Button';
import { CrossIcon, Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { isAndroid } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';

type HeaderProps = {
  component?: React.ReactNode;
  scrollY?: Animated.Value;
  title: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ scrollY, title }) => {
  const { headerHeight } = useSafeHeights();
  const navigation = useNavigation();

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return (
    <View style={[styles.wrapper, { height: headerHeight }]}>
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
          styles.content,
          {
            height: headerHeight
          }
        ]}
      >
        <Animated.View
          style={{
            opacity: scrollY?.interpolate({
              inputRange: [250, 300],
              outputRange: [0, 1]
            })
          }}
        >
          <Text
            style={{
              maxWidth: Dimensions.get('window').width - 60
            }}
            variant="h3"
            numberOfLines={1}
          >
            {title}
          </Text>
        </Animated.View>
        <Button
          isRounded
          isCustomChildren
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Icon icon={CrossIcon} />
        </Button>
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
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: theme.colors['default-900'],
    position: 'absolute',
    right: -5,
    bottom: -15
  }
});
