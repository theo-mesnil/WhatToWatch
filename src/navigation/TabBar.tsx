import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import merge from 'lodash.merge';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';

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
import { DiscoverScreen } from 'screens/Discover';
import { MoreScreen } from 'screens/More';
import { NetworksScreen } from 'screens/Networks';
import { SearchScreen } from 'screens/Search';

import { tabBarHeaderOptions } from './headers';
import { MainTabParamList } from './types';

function BottomBarBackground() {
  return (
    <BlurView tint="dark" intensity={150} style={StyleSheet.absoluteFill} />
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

const androidTabBarStyle = isAndroid
  ? {
      tabBarStyle: {
        paddingTop: 7,
        height: 60
      },
      tabBarLabelStyle: {
        paddingBottom: 5
      }
    }
  : undefined;

export function TabBar() {
  const theme = useTheme();
  const intl = useIntl();

  const screenOptions = merge(
    {
      ...tabBarHeaderOptions({ theme }),
      tabBarActiveTintColor: theme.colors.primary500,
      tabBarInactiveTintColor: theme.colors.light400,
      tabBarBackground: isIos ? BottomBarBackground : undefined,
      tabBarStyle: isAndroid
        ? {
            backgroundColor: theme.colors.ahead,
            borderTopColor: theme.colors.ahead,
            position: 'absolute'
          }
        : { borderTopColor: 'transparent', position: 'absolute' },
      tabBarLabelStyle: {
        fontSize: theme.fontSizes.h4,
        fontFamily: 'Poppins_600SemiBold'
      }
    },
    androidTabBarStyle
  );

  function tabBarIcon({
    focused,
    icon: IconComponent,
    iconFocused: IconComponentFocused
  }) {
    return (
      <Icon
        color={focused ? 'primary500' : 'light400'}
        icon={focused ? IconComponentFocused : IconComponent}
      />
    );
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerShown: false,
          title: intl.formatMessage({ id: 'tabs.discover' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: FlashIcon,
              iconFocused: FlashFillIcon
            })
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: intl.formatMessage({ id: 'tabs.search' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: SearchIcon,
              iconFocused: SearchFillIcon
            })
        }}
      />
      <Tab.Screen
        name="Networks"
        component={NetworksScreen}
        options={{
          title: intl.formatMessage({ id: 'tabs.networks' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: GlobeIcon,
              iconFocused: GlobeFillIcon
            })
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          title: intl.formatMessage({ id: 'tabs.more' }),
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: MoreIcon,
              iconFocused: MoreFillIcon
            })
        }}
      />
    </Tab.Navigator>
  );
}
