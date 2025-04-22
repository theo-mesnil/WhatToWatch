import { BlurView } from 'expo-blur'
import { useNavigation } from 'expo-router'
import { Animated, StyleSheet, View } from 'react-native'

import { Button } from 'components/Button'
import { ArrowBackIcon, Icon } from 'components/Icon'
import { Text } from 'components/Text'
import { isAndroid } from 'constants/screen'
import { useSafeHeights } from 'constants/useSafeHeights'
import { globalStyles } from 'styles'
import { theme } from 'theme'

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
              opacity: scrollY?.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 1],
              }),
              backgroundColor: theme.colors.ahead,
            },
            globalStyles.absoluteFill,
          ]}
        />
      ) : (
        <AnimatedBlurView
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
          intensity={150}
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
              testID="header-back-button"
              isTransparent
              isCustomChildren
              onPress={() => navigation.goBack()}
            >
              <Icon icon={ArrowBackIcon} size={30} />
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
  wrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 999,
  },
  content: {
    paddingHorizontal: theme.space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: theme.space.lg,
  },
  firstLast: {
    width: 50,
  },
  middle: {
    flexDirection: 'row',
    flex: 1,
  },
  middleCustom: {
    justifyContent: 'center',
  },
})
