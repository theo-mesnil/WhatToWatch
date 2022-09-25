import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  TabBar: BottomTabScreenProps<MainTabParamList>;
  Movie: { id: number };
  TvShow: { id: number };
  Collection: { id: number };
  Genre: { id: number; name: string; type: 'movie' | 'tv' };
  Genres: { type: 'movie' | 'tv' };
  Network: { id: number };
  People: { id?: number };
  Trend: { type: 'movie' | 'tv' | 'person' | 'all' };
  Images: {
    title?: string;
    startAt?: number;
    images: {
      aspectRatio?: number;
      source: string;
    }[];
  };
  Video: { title: string; id: number };
  Season: {
    seasonNumber: number;
    seasonTitle: string;
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
