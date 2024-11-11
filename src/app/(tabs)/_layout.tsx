import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import type { IconProps } from 'components/Icon';
import { Icon } from 'components/Icon';
import { isAndroid, isIos } from 'constants/screen';
import { useSafeHeights } from 'constants/useSafeHeights';

function tabBarIcon({
  focused,
  iconName,
  iconNameFocused
}: {
  focused: boolean;
  iconName: IconProps['name'];
  iconNameFocused: IconProps['name'];
}) {
  return (
    <Icon
      size={30}
      color={focused ? 'brand-500' : 'text'}
      name={focused ? iconNameFocused : iconName}
    />
  );
}

function BottomBarBackground() {
  return (
    <BlurView tint="dark" intensity={150} style={globalStyles.absoluteFill} />
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
            id: 'home',
            defaultMessage: 'Home'
          }),
          tabBarLabel: () => null,
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              iconName: 'Home',
              iconNameFocused: 'HomeFill'
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
          tabBarLabel: () => null,
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              iconName: 'Search',
              iconNameFocused: 'SearchFill'
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
          tabBarLabel: () => null,
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              iconName: 'PlayCircle',
              iconNameFocused: 'PlayCircleFill'
            })
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: intl.formatMessage({
            id: 'me',
            defaultMessage: 'Me'
          }),
          tabBarLabel: () => null,
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              iconName: 'UserSmile',
              iconNameFocused: 'UserSmileFill'
            })
        }}
      />
    </Tabs>
  );
}
