import * as React from 'react'
import { Animated, StyleSheet } from 'react-native'

import { theme } from '~/theme'

type BasicLayoutProps = {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentContainerStyle?: any
  getScrollYPosition?: (value: Animated.Value) => void
  isView?: boolean
  titleOffset?: number
  titleOffsetSubtraction?: number
}

export function BasicLayout({
  children,
  contentContainerStyle = {},
  getScrollYPosition,
  isView = false,
}: BasicLayoutProps) {
  const [scrollY] = React.useState(new Animated.Value(0))

  const AnimateComponent = isView ? Animated.View : Animated.ScrollView

  React.useEffect(() => getScrollYPosition?.(scrollY), [getScrollYPosition, scrollY])

  return (
    <AnimateComponent
      bounces={false}
      contentContainerStyle={contentContainerStyle}
      onScroll={
        !isView
          ? Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: scrollY },
                  },
                },
              ],
              {
                useNativeDriver: false,
              }
            )
          : undefined
      }
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      style={styles.wrapper}
    >
      {children}
    </AnimateComponent>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.behind,
    flex: 1,
  },
})
