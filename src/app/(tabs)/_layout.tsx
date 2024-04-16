import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { useIntl } from 'react-intl';
import { StyleSheet } from 'react-native';
import { theme } from 'theme';

import type { IconElement } from 'components/Icon';
import {
  FlashFillIcon,
  FlashIcon,
  GlobeFillIcon,
  GlobeIcon,
  Icon,
  MoreFillIcon,
  MoreIcon,
  SearchFillIcon,
  SearchIcon
} from 'components/Icon';
import { isAndroid, isIos } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';

function tabBarIcon({
  focused,
  icon: IconComponent,
  iconFocused: IconComponentFocused
}: {
  focused: boolean;
  icon: IconElement;
  iconFocused: IconElement;
}) {
  return (
    <Icon
      color={focused ? 'brand-500' : 'text'}
      icon={focused ? IconComponentFocused : IconComponent}
    />
  );
}

function BottomBarBackground() {
  return (
    <BlurView tint="dark" intensity={150} style={StyleSheet.absoluteFill} />
  );
}

export default function Layout() {
  const { formatMessage } = useIntl();
  const { tabBarBottomHeight } = useSafeHeights();

  const screenOptions: BottomTabNavigationOptions = {
    headerTransparent: true,
    headerShown: false,
    tabBarActiveTintColor: theme.colors['brand-500'],
    tabBarBackground: isIos ? BottomBarBackground : undefined,
    tabBarInactiveTintColor: theme.colors.text,
    tabBarLabelStyle: {
      // fontSize: 12, todo
      fontFamily: 'Poppins_600SemiBold'
    },
    tabBarStyle: isAndroid
      ? {
          height: tabBarBottomHeight,
          backgroundColor: theme.colors.ahead,
          borderTopColor: theme.colors.ahead,
          position: 'absolute'
        }
      : {
          height: tabBarBottomHeight,
          borderTopColor: 'transparent',
          position: 'absolute'
        }
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: formatMessage({ id: 'tabs.discover' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: FlashIcon,
              iconFocused: FlashFillIcon
            })
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: formatMessage({ id: 'tabs.search' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: SearchIcon,
              iconFocused: SearchFillIcon
            })
        }}
      />
      <Tabs.Screen
        name="networks"
        options={{
          title: formatMessage({ id: 'tabs.networks' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: GlobeIcon,
              iconFocused: GlobeFillIcon
            })
        }}
      />
      <Tabs.Screen
        name="more/index"
        options={{
          title: formatMessage({ id: 'tabs.more' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: MoreIcon,
              iconFocused: MoreFillIcon
            })
        }}
      />
    </Tabs>
  );
}
