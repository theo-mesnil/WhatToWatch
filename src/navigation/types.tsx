import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Collection: { id: number; name: string };
  Genre: { id: number; name: string; type: 'movie' | 'tv' };
  Genres: { type: 'movie' | 'tv' };
  Images: {
    images: {
      aspectRatio?: number;
      source: string;
    }[];
    name: string;
    startAt?: number;
  };
  Movie: { id: number; name: string };
  Network: { id: number };
  People: { id?: number; name: string };
  Season: {
    name: string;
    seasonNumber: number;
    tvID: number;
    tvShowTitle: string;
  };
  TabBar: BottomTabScreenProps<MainTabParamList>;
  Trend: { type: 'movie' | 'tv' | 'person' | 'all' };
  TvShow: { id: number; name: string };
  Video: { id: number; name: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabParamList = {
  Discover: undefined;
  More: undefined;
  Networks: undefined;
  Search: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
