import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import merge from 'lodash.merge';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useTheme } from 'styled-components/native';

import {
  // BulbFillIcon,
  // BulbIcon,
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
import { isAndroid } from 'constants/screen';
import { DiscoverScreen } from 'screens/Discover';
import { MoreScreen } from 'screens/More';
// import { IdeasScreen } from 'screens/Ideas'
import { SearchScreen } from 'screens/Search';
import { TrendsScreen } from 'screens/Trends';

const Tab = createBottomTabNavigator();

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
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary500,
      tabBarInactiveTintColor: theme.colors.light400,
      tabBarStyle: {
        backgroundColor: theme.colors.ahead,
        borderTopColor: theme.colors.ahead
      },
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
        name={intl.formatMessage({ id: 'tabs.discover' })}
        component={DiscoverScreen}
        options={{
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: FlashIcon,
              iconFocused: FlashFillIcon
            })
        }}
      />
      {/* <Tab.Screen
        name={intl.formatMessage({ id: 'tabs.ideas' })}
        component={IdeasScreen}
        options={{
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: BulbIcon,
              iconFocused: BulbFillIcon
            })
        }}
      /> */}
      <Tab.Screen
        name={intl.formatMessage({ id: 'tabs.search' })}
        component={SearchScreen}
        options={{
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: SearchIcon,
              iconFocused: SearchFillIcon
            })
        }}
      />
      <Tab.Screen
        name={intl.formatMessage({ id: 'tabs.trends' })}
        component={TrendsScreen}
        options={{
          tabBarIcon: (props) =>
            tabBarIcon({
              ...props,
              icon: GlobeIcon,
              iconFocused: GlobeFillIcon
            })
        }}
      />
      <Tab.Screen
        name={intl.formatMessage({ id: 'tabs.more' })}
        component={MoreScreen}
        options={{
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
