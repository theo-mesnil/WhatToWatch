import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Animated, StyleSheet, View } from 'react-native';

import { useGetPerson, useGetPersonTvCredits } from 'api/person';
import { ItemThumb } from 'components/app/person/ItemThumb';
import { ThumbLink } from 'components/ThumbLink';
import { useSafeHeights } from 'constants/useSafeHeights';
import { BasicLayout } from 'layouts/Basic';
import { Header } from 'layouts/Content/Header';
import { tvPath } from 'routes';
import { globalStyles } from 'styles';
import { theme } from 'theme';

export default function PersonTv() {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ id: string }>();
  const { containerStyle } = useSafeHeights();
  const personID = Number(params?.id);

  const { data, isLoading } = useGetPerson({ id: personID });

  const isActing = data?.department === 'Acting';

  const { data: tv, isLoading: isLoadingTv } = useGetPersonTvCredits({
    id: personID,
    isActing
  });

  const name = data?.name;

  const HeaderComponent = React.useCallback(
    () => (
      <Header
        showHeaderOnStart
        title={
          <>
            {name}
            <FormattedMessage defaultMessage="'s series" id="NfdtQ8" />
          </>
        }
        scrollY={scrollYPosition}
      />
    ),
    [name, scrollYPosition]
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout
      getScrollYPosition={getScrollYPosition}
      contentContainerStyle={containerStyle}
    >
      {!isLoadingTv && (
        <View style={styles.items}>
          {tv?.map(
            (
              {
                // @ts-expect-error
                character,
                first_air_date,
                id,
                name,
                overview,
                poster_path
              },
              index
            ) => (
              <ThumbLink
                key={`tv-${index}-${id}`}
                isLoading={isLoading}
                href={tvPath({ id })}
              >
                <ItemThumb
                  date={first_air_date}
                  overview={overview}
                  posterUrl={poster_path}
                  subtitle={character}
                  title={name}
                  type="tv"
                />
              </ThumbLink>
            )
          )}
        </View>
      )}
    </BasicLayout>
  );
}

const styles = StyleSheet.create({
  items: {
    gap: theme.space.md,
    ...globalStyles.centered
  }
});
