import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';

import { TabBar } from './TabBar';

import { CollectionScreen } from 'screens/Collection';
import { GenreScreen } from 'screens/Genre';
import { GenresScreen } from 'screens/Genres';
import { ImagesScreen } from 'screens/Images';
import { MovieScreen } from 'screens/Movie';
import { NetworkScreen } from 'screens/Network';
import { PeopleScreen } from 'screens/People';
import { TvShowScreen } from 'screens/TvShow';
import { VideoScreen } from 'screens/Video';
import { SeasonScreen } from 'screens/Season';
import { TrendScreen } from 'screens/Trend';

type MainStackParamList = {
  TabBar: undefined;
  Movie: { id: number };
  TvShow: { id: number };
  Collection: { id: number };
  Genre: { id: number; name: String; type: 'movie' | 'tv' };
  Genres: { type: 'movie' | 'tv' };
  Network: { id: number };
  People: { id: number };
  Trend: { type: 'movie' | 'tv' | 'people' | 'all' };
};

type ModalStackParamList = {
  Main: MainStackParamList;
  Images: {
    title?: string;
    images: {
      aspectRatio?: number;
      source: string;
    };
  };
  Video: { title: string; id: number };
  Season: {
    seasonNumber: number;
    seasonTitle: string;
    tvID: number;
    tvShowTitle: string;
  };
};

const Main = createStackNavigator<MainStackParamList>();
const Modal = createStackNavigator<ModalStackParamList>();

function navigatorTheme(theme) {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.behind
    }
  };
}

const MainStack = () => (
  <Main.Navigator screenOptions={{ headerShown: false }}>
    <Main.Screen name="TabBar" component={TabBar} />
    <Main.Screen name="Movie" component={MovieScreen} />
    <Main.Screen name="TvShow" component={TvShowScreen} />
    <Main.Screen name="Collection" component={CollectionScreen} />
    <Main.Screen name="Genre" component={GenreScreen} />
    <Main.Screen name="Genres" component={GenresScreen} />
    <Main.Screen name="Network" component={NetworkScreen} />
    <Main.Screen name="People" component={PeopleScreen} />
    <Main.Screen name="Trend" component={TrendScreen} />
  </Main.Navigator>
);

export function Navigation() {
  const theme = useTheme();

  return (
    <NavigationContainer theme={navigatorTheme(theme)}>
      <Modal.Navigator
        screenOptions={{ presentation: 'modal', headerShown: false }}
      >
        <Modal.Screen name="Main" component={MainStack} />
        <Modal.Screen name="Images" component={ImagesScreen} />
        <Modal.Screen name="Video" component={VideoScreen} />
        <Modal.Screen name="Season" component={SeasonScreen} />
      </Modal.Navigator>
    </NavigationContainer>
  );
}
