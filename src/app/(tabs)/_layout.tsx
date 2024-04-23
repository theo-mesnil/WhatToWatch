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
  const intl = useIntl();
  const { tabBarBottomHeight } = useSafeHeights();

  const screenOptions: BottomTabNavigationOptions = {
    headerTransparent: true,
    tabBarActiveTintColor: theme.colors['brand-500'],
    tabBarBackground: isIos ? BottomBarBackground : undefined,
    tabBarInactiveTintColor: theme.colors.text,
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: 'Poppins_400Regular'
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
          title: intl.formatMessage({
            id: 'discover',
            defaultMessage: 'Discover'
          }),
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
          title: intl.formatMessage({
            id: 'search',
            defaultMessage: 'Search'
          }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: SearchIcon,
              iconFocused: SearchFillIcon
            })
        }}
      />
      <Tabs.Screen
        name="streaming"
        options={{
          title: intl.formatMessage({
            id: 'streaming',
            defaultMessage: 'Streaming'
          }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: GlobeIcon,
              iconFocused: GlobeFillIcon
            })
        }}
      />
    </Tabs>
  );
}
