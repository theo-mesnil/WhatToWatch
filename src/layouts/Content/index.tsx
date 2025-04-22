import { useNavigation } from 'expo-router'
import * as React from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { COVER_HEIGHT } from '~/constants/cover'
import { BasicLayout } from '~/layouts//Basic'
import { theme } from '~/theme'

import { Cover } from './Cover'
import { Header } from './Header'

export type ContentLayoutProps = {
  badges?: React.ReactNode
  children: React.ReactNode
  imageUrl?: string
  isLoading?: boolean
  logo?: {
    aspectRatio: number
    url: string
  }
  subtitle?: string
  title?: string
}

export function ContentLayout({
  badges,
  children,
  imageUrl,
  isLoading,
  logo,
  subtitle,
  title,
}: ContentLayoutProps) {
  const [scrollYPosition, getScrollYPosition] = React.useState(new Animated.Value(0))
  const navigation = useNavigation()

  const HeaderComponent = React.useCallback(
    () => <Header scrollY={scrollYPosition} title={title} />,
    [scrollYPosition, title]
  )

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent,
    })
  }, [HeaderComponent, navigation])

  return (
    <BasicLayout
      contentContainerStyle={{ paddingBottom: theme.space.xl }}
      getScrollYPosition={getScrollYPosition}
    >
      <Cover imageUrl={imageUrl} isLoading={isLoading} logo={logo} title={title} />
      <View style={styles.infos}>
        {badges && <View style={styles.badges}>{badges}</View>}
        {subtitle && <Text testID="subtitle">{subtitle}</Text>}
      </View>
      {children}
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space.xs,
    justifyContent: 'center',
  },
  infos: {
    alignItems: 'center',
    gap: theme.space.sm,
    marginTop: COVER_HEIGHT + theme.space.lg,
    paddingBottom: theme.space.lg,
    paddingHorizontal: theme.space.xxl,
  },
})
