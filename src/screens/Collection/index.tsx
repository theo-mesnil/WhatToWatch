import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Animated } from 'react-native';

import { useGetCollection } from 'api/collection';
import { ContentCover } from 'components/ContentCover';
import { Header } from 'components/Header';
import { MovieThumb } from 'components/MovieThumb';
import { VerticalList } from 'components/VerticalList';

export function CollectionScreen() {
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const [titleOffset, setTitleOffset] = React.useState(300);
  const [collection, setCollection] = React.useState({
    backdrop: 'loading',
    movies: 'loading'
  });
  const navigation = useNavigation();
  const route = useRoute();
  const collectionID = route?.params?.id || 1241;
  const getCollection = useGetCollection(collectionID);
  const inputRange = titleOffset - 70;
  const title = collection?.title;
  const backdrop = collection?.backdrop;
  const movies = collection?.movies;
  const subtitle = !!movies && (
    <FormattedMessage
      id="collection.subtitle"
      values={{ length: movies?.length }}
    />
  );

  React.useEffect(() => {
    getCollection(setCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        title={title}
        subtitle={subtitle}
        opacity={
          scrollY.interpolate({
            inputRange: [inputRange, inputRange],
            outputRange: [0, 1]
          }) as Animated.Value
        }
      />
      <VerticalList
        resultsData={movies}
        getApi={getCollection}
        renderItem={MovieThumb}
        onPress={({ id }) => navigation.push('Movie', { id })}
        handleScroll={setScrollY}
      >
        <ContentCover
          backdrop={backdrop}
          setTitleOffset={setTitleOffset}
          subtitle={subtitle}
          title={title}
          borderBottomWidth={1}
          borderBottomColor="border"
        />
      </VerticalList>
    </>
  );
}
