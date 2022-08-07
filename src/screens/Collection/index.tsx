import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { Header } from 'components/Header';
import { MovieThumb } from 'components/MovieThumb';
import { ContentCover } from 'components/ContentCover';

import { VerticalList } from 'components/VerticalList';
import { useGetCollection } from 'api/collection';

export function CollectionScreen() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [titleOffset, setTitleOffset] = useState(300);
  const [collection, setCollection] = useState({
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

  useState(() => {
    getCollection(setCollection);
  }, []);

  return (
    <>
      <Header
        title={title}
        subtitle={subtitle}
        offset={titleOffset}
        opacity={scrollY.interpolate({
          inputRange: [inputRange, inputRange],
          outputRange: [0, 1]
        })}
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
