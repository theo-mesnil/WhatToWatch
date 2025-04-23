import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import * as React from 'react'
import { useIntl } from 'react-intl'

import type { IconElement } from '~/components/Icon'
import {
  BulbFillIcon,
  BulbIcon,
  EyeFillIcon,
  EyeIcon,
  FlashFillIcon,
  FlashIcon,
  Icon,
  SearchFillIcon,
  SearchIcon,
  SmileIcon,
} from '~/components/Icon'
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
    tabBarInactiveTintColor: theme.colors.text,
    tabBarLabelStyle: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
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
              icon: FlashIcon,
              iconFocused: FlashFillIcon,
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
              icon: SearchIcon,
              iconFocused: SearchFillIcon,
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
              icon: EyeIcon,
              iconFocused: EyeFillIcon,
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
              icon: accountId ? SmileIcon : BulbIcon,
              iconFocused: accountId ? SmileIcon : BulbFillIcon,
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

function tabBarIcon({
  focused,
  icon: IconComponent,
  iconFocused: IconComponentFocused,
}: {
  focused: boolean
  icon: IconElement
  iconFocused: IconElement
}) {
  return (
    <Icon
      color={focused ? 'brand-500' : 'text'}
      icon={focused ? IconComponentFocused : IconComponent}
    />
  )
}
