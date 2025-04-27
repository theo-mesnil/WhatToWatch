import { BlurView } from 'expo-blur'
import { useNavigation } from 'expo-router'
import { Animated, StyleSheet, View } from 'react-native'

import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Text } from '~/components/Text'
import { isAndroid } from '~/constants/screen'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

type HeaderProps = {
  component?: React.ReactNode
  customTitle?: React.ReactNode
  hideOnStart?: boolean
  scrollY?: Animated.Value
  title?: React.ReactNode | string
  withBackButton?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  component,
  customTitle,
  hideOnStart,
  scrollY,
  title,
  withBackButton,
}) => {
  const navigation = useNavigation()
  const { headerHeight, headerSafeHeight, statusBarHeight } = useSafeHeights(!!component)

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { height: headerSafeHeight },
        hideOnStart && {
          opacity: scrollY?.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
          }),
        },
      ]}
    >
      {isAndroid ? (
        <Animated.View
          style={[
            {
              backgroundColor: theme.colors.ahead,
              opacity: scrollY?.interpolate({
                inputRange: [0, 50],
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
                inputRange: [0, 50],
                outputRange: [0, 1],
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
            height: headerHeight,
            marginTop: statusBarHeight,
          },
        ]}
      >
        {withBackButton && (
          <View style={styles.firstLast}>
            <Button
              isCustomChildren
              isTransparent
              onPress={() => navigation.goBack()}
              testID="header-back-button"
            >
              <Icon name="arrow-left" size={30} />
            </Button>
          </View>
        )}
        <View style={[styles.middle, customTitle && styles.middleCustom]}>
          {title && <Text variant="h1">{title}</Text>}
          {customTitle}
        </View>
        {withBackButton && <View style={styles.firstLast} />}
      </View>
      {component && <View style={styles.input}>{component}</View>}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.lg,
  },
  firstLast: {
    width: 50,
  },
  input: {
    paddingHorizontal: theme.space.lg,
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
  },
  middleCustom: {
    justifyContent: 'center',
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
})
