import { BlurView } from 'expo-blur'
import { useNavigation } from 'expo-router'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'

import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Text } from '~/components/Text'
import { isAndroid } from '~/constants/screen'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

type HeaderProps = {
  component?: React.ReactNode
  scrollY?: Animated.Value
  showHeaderOnStart?: boolean
  title: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ scrollY, showHeaderOnStart, title }) => {
  const { headerHeight, headerSafeHeight, statusBarHeight } = useSafeHeights()
  const navigation = useNavigation()

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
  const opacity = showHeaderOnStart ? 1 : 0

  return (
    <View
      style={[
        styles.wrapper,
        {
          height: headerSafeHeight - 20,
        },
      ]}
    >
      {isAndroid ? (
        <Animated.View
          style={[
            {
              backgroundColor: theme.colors.ahead,
              opacity: scrollY?.interpolate({
                inputRange: [250, 300],
                outputRange: [0, 1],
              }),
            },
            globalStyles.absoluteFill,
          ]}
        />
      ) : (
        <AnimatedBlurView
          intensity={150}
          style={[
            {
              opacity: scrollY?.interpolate({
                inputRange: [250, 300],
                outputRange: [opacity, 1],
              }),
            },
            globalStyles.absoluteFill,
          ]}
          tint="dark"
        />
      )}
      <View
        style={[
          styles.content,
          {
            height: headerHeight - 20,
            top: statusBarHeight,
          },
        ]}
      >
        <Button
          isCustomChildren
          isTransparent
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
          testID="header-back-button"
        >
          <Icon name="arrow-left" size={30} />
        </Button>
        <Animated.View
          style={{
            opacity: scrollY?.interpolate({
              inputRange: [250, 300],
              outputRange: [opacity, 1],
            }),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              maxWidth: Dimensions.get('window').width - 60,
            }}
            variant="h2"
          >
            {title}
          </Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    height: 30,
    paddingHorizontal: 0,
    width: 30,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.sm,
    paddingHorizontal: theme.space.lg,
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
})
