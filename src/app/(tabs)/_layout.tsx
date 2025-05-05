import type {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import * as React from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { useUser } from '~/api/account'
import { Avatar } from '~/components/Avatar'
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
  const tabBarIcon = useTabBarIcon()

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
              isUser: !!accountId,
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
    <Touchable endScale={0.85} onPress={onPress} style={styles.tabBarButton}>
      {props.children}
    </Touchable>
  )
}

function useTabBarIcon() {
  const { data: user } = useUser()

  function tabBarIcon({
    focused,
    icon,
    iconFocused,
    isUser,
  }: {
    focused: boolean
    icon: IconProps['name']
    iconFocused: IconProps['name']
    isUser?: boolean
  }) {
    if (isUser) {
      return (
        <View style={[focused ? styles.focused : undefined]}>
          <Avatar imageUrl={user?.avatar} name={user?.name} size={26} />
        </View>
      )
    }

    return (
      <Icon color={focused ? 'brand-500' : 'text'} name={focused ? iconFocused : icon} size={28} />
    )
  }

  return tabBarIcon
}

const styles = StyleSheet.create({
  focused: {
    borderColor: theme.colors['brand-500'],
    borderRadius: 999,
    borderWidth: 1,
  },
  tabBarButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
