import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import type { Animated } from 'react-native';
import { theme } from 'theme';

import { useGetGenreMovieList, useGetGenreTvList } from 'api/genres';
import { GradientHeader } from 'components/GradientHeader';
import { Header } from 'components/Header';
import { BasicLayout } from 'layouts/Basic';
import { genresColor } from 'utils/genres';

export type GenreLayoutProps = {
  children: React.ReactNode;
  scrollYPosition: Animated.Value;
};

export default function GenreLayout({
  children,
  scrollYPosition
}: GenreLayoutProps) {
  const params = useLocalSearchParams<{ id: string }>();
  const genreID = Number(params?.id) as keyof typeof genresColor;
  const navigation = useNavigation();

  const { data: genreTv } = useGetGenreTvList();
  const { data: genreMovie } = useGetGenreMovieList();
  const title =
    genreMovie?.filter((genre) => genre.id === genreID)?.[0] ||
    genreTv?.filter((genre) => genre.id === genreID)?.[0];

  const HeaderComponent = React.useCallback(
    () => (
      <Header withBackButton title={title?.name} scrollY={scrollYPosition} />
    ),
    [scrollYPosition, title?.name]
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout isView>
      <GradientHeader
        colors={[...genresColor[genreID], theme.colors.behind]}
        scrollY={scrollYPosition}
      />
      {children}
    </BasicLayout>
  );
}
