import type {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import * as React from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet } from 'react-native'

import type { IconProps } from '~/components/Icon'
import { Icon } from '~/components/Icon'
import { Touchable } from '~/components/Touchable'
import { isAndroid, isIos } from '~/constants/screen'
import { useSafeHeights } from '~/constants/useSafeHeights'
import { useAuth } from '~/contexts/Auth'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export default function Layout() {
  const intl = useIntl()
  const { tabBarBottomHeight } = useSafeHeights()
  const { accountId } = useAuth()

  const screenOptions: BottomTabNavigationOptions = {
    headerTransparent: true,
    tabBarActiveTintColor: theme.colors['brand-500'],
    tabBarBackground: isIos ? BottomBarBackground : undefined,
    tabBarButton: TabBarButton,
    tabBarInactiveTintColor: theme.colors.text,
    tabBarLabel: () => null,
    tabBarStyle: isAndroid
      ? {
          backgroundColor: theme.colors.ahead,
          borderTopWidth: 0,
          height: tabBarBottomHeight,
          position: 'absolute',
        }
      : {
          borderTopColor: 'transparent',
          height: tabBarBottomHeight,
          position: 'absolute',
        },
  }

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: props =>
            tabBarIcon({
              ...props,
              icon: 'home',
              iconFocused: 'home-fill',
            }),
          title: intl.formatMessage({
            defaultMessage: 'Discover',
            id: 'cE4Hfw',
          }),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: props =>
            tabBarIcon({
              ...props,
              icon: 'magnifying-glass',
              iconFocused: 'magnifying-glass-fill',
            }),
          title: intl.formatMessage({
            defaultMessage: 'Search',
            id: 'xmcVZ0',
          }),
        }}
      />
      <Tabs.Screen
        name="streaming"
        options={{
          tabBarIcon: props =>
            tabBarIcon({
              ...props,
              icon: 'eye',
              iconFocused: 'eye-fill',
            }),
          title: intl.formatMessage({
            defaultMessage: 'Streaming',
            id: 'NCupKV',
          }),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          tabBarIcon: props =>
            tabBarIcon({
              ...props,
              icon: accountId ? 'user-circle' : 'user-circle',
              iconFocused: accountId ? 'user-circle-fill' : 'user-circle-fill',
            }),
          title: intl.formatMessage({
            defaultMessage: 'Me',
            id: 'TdbPNK',
          }),
        }}
      />
    </Tabs>
  )
}

function BottomBarBackground() {
  return <BlurView intensity={150} style={globalStyles.absoluteFill} tint="dark" />
}

function TabBarButton({ onPress, ...props }: BottomTabBarButtonProps) {
  return (
    <Touchable onPress={onPress} style={styles.tabBarButton}>
      {props.children}
    </Touchable>
  )
}

function tabBarIcon({
  focused,
  icon,
  iconFocused,
}: {
  focused: boolean
  icon: IconProps['name']
  iconFocused: IconProps['name']
}) {
  return (
    <Icon color={focused ? 'brand-500' : 'text'} name={focused ? iconFocused : icon} size={32} />
  )
}

const styles = StyleSheet.create({
  tabBarButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
