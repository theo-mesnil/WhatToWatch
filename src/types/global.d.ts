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

  type ContentType = 'tv' | 'movie' | 'people' | string;

  type Type = 'tv' | 'movie' | 'people' | 'person' | 'all';

  type Image = {
    aspectRatio?: number;
    source: string;
  };

  type Images = Image[];

  type LocaleLanguage = 'fr' | 'en' | 'auto';
}
