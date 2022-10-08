import { DefaultTheme } from 'styled-components/native';

declare global {
  type Color = string | keyof DefaultTheme['colors'];

  type NetworkId =
    | /* Netflix */ 213
    | /* AmazonPrime */ 1024
    | /* HBO */ 49
    | /* DisneyPlus */ 2739
    | /* AppleTvPlus */ 2552
    | /* Hulu */ 453
    | /* Fox */ 67
    | /* Showtime */ 19
    | number;

  type Genre = {
    id: number;
    name: string;
  };

  type Platform = 'YouTube' | 'Vimeo' | string;

  type Video = {
    type: string;
    key: string;
    site: string;
    name: string;
  };

  type Videos = Video[];

  type IconSize = number;

  type ContentType = 'tv' | 'movie' | 'person' | string;

  type Type = 'tv' | 'movie' | 'person' | 'all';

  type Image = {
    aspectRatio?: number;
    source: string;
  };

  type Images = Image[];

  type Collection = {
    name: string;
    id: number;
    backdrop_path: string;
  };

  type ProductionCompany = {
    name: string;
  };

  type LocaleLanguage = 'fr' | 'en' | 'auto';

  type Credit = {
    name: string;
    job: string;
    id: number;
  };
}
