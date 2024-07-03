import { Slot, useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import { Animated } from 'react-native';
import { theme } from 'theme';

import { useGetGenreMovieList, useGetGenreTvList } from 'api/genres';
import { GradientHeader } from 'components/GradientHeader';
import { Header } from 'components/Header';
import { BasicLayout } from 'layouts/Basic';
import { genresColor } from 'utils/genres';

type ScrollYPositionContextType = React.Dispatch<
  React.SetStateAction<Animated.Value>
>;

export const ScrollYPositionContext =
  React.createContext<ScrollYPositionContextType>(null);

export default function Genre() {
  const params = useLocalSearchParams<{ id: string }>();
  const genreID = Number(params?.id) as keyof typeof genresColor;
  const navigation = useNavigation();
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );

  const { data: genreTv } = useGetGenreTvList();
  const { data: genreMovie } = useGetGenreMovieList();
  const title =
    genreMovie?.filter((genre) => genre.id === genreID)?.[0] ||
    genreTv?.filter((genre) => genre.id === genreID)?.[0];

  const HeaderComponent = React.useCallback(
    () => (
      <Header withBackButton title={title?.name} scrollY={scrollYPosition} />
    ),
    [scrollYPosition, title]
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
      <ScrollYPositionContext.Provider value={getScrollYPosition}>
        <Slot />
      </ScrollYPositionContext.Provider>
    </BasicLayout>
  );
}
