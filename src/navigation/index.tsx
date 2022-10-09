import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTheme } from 'styled-components/native';

import { screenHeight } from 'constants/screen';
import { CollectionScreen } from 'screens/Collection';
import { GenreScreen } from 'screens/Genre';
import { GenresScreen } from 'screens/Genres';
import { ImagesScreen } from 'screens/Images';
import { MovieScreen } from 'screens/Movie';
import { NetworkScreen } from 'screens/Network';
import { PeopleScreen } from 'screens/People';
import { SeasonScreen } from 'screens/Season';
import { TrendScreen } from 'screens/Trend';
import { TvShowScreen } from 'screens/TvShow';
import { VideoScreen } from 'screens/Video';

import { modalHeaderOptions } from './headers';
import { TabBar } from './TabBar';
import { RootStackParamList } from './types';

const Main = createStackNavigator<RootStackParamList>();

function navigatorTheme(theme) {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.behind
    }
  };
}

export function Navigation() {
  const theme = useTheme();

  return (
    <NavigationContainer theme={navigatorTheme(theme)}>
      <Main.Navigator screenOptions={{ headerShown: false }}>
        <Main.Group>
          <Main.Screen name="TabBar" component={TabBar} />
          <Main.Screen
            options={{ headerShown: false }}
            name="Genre"
            component={GenreScreen}
          />
          <Main.Screen
            options={{ headerShown: false }}
            name="Genres"
            component={GenresScreen}
          />
          <Main.Screen
            options={{ headerShown: false }}
            name="Network"
            component={NetworkScreen}
          />
          <Main.Screen
            options={{ headerShown: false }}
            name="Trend"
            component={TrendScreen}
          />
        </Main.Group>
        <Main.Group
          screenOptions={({ navigation, route }) => ({
            presentation: 'modal',
            gestureDirection: 'vertical',
            gestureResponseDistance: screenHeight,
            ...modalHeaderOptions({ navigation, route, theme })
          })}
        >
          <Main.Screen name="Movie" component={MovieScreen} />
          <Main.Screen name="TvShow" component={TvShowScreen} />
          <Main.Screen name="Collection" component={CollectionScreen} />
          <Main.Screen name="People" component={PeopleScreen} />
          <Main.Screen name="Images" component={ImagesScreen} />
          <Main.Screen name="Video" component={VideoScreen} />
          <Main.Screen name="Season" component={SeasonScreen} />
        </Main.Group>
      </Main.Navigator>
    </NavigationContainer>
  );
}
