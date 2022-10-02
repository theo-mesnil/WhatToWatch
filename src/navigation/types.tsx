import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  TabBar: BottomTabScreenProps<MainTabParamList>;
  Movie: { id: number; name: string };
  TvShow: { id: number; name: string };
  Collection: { id: number; name: string };
  Genre: { id: number; name: string; type: 'movie' | 'tv' };
  Genres: { type: 'movie' | 'tv' };
  Network: { id: number };
  People: { id?: number; name: string };
  Trend: { type: 'movie' | 'tv' | 'person' | 'all' };
  Images: {
    name: string;
    startAt?: number;
    images: {
      aspectRatio?: number;
      source: string;
    }[];
  };
  Video: { name: string; id: number };
  Season: {
    seasonNumber: number;
    name: string;
    tvID: number;
    tvShowTitle: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabParamList = {
  Discover: undefined;
  More: undefined;
  Search: undefined;
  Trends: undefined;
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
