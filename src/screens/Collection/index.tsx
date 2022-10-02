import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { useGetCollection } from 'api/collection';
import { ContentCover } from 'components/ContentCover';
import { ContentOverview } from 'components/ContentOverview';
import { MovieThumb } from 'components/MovieThumb';
import { VerticalList } from 'components/VerticalList';
import { ContentLayout } from 'layouts/Content';

export function CollectionScreen() {
  const [titleOffset, setTitleOffset] = React.useState(undefined);
  const [collection, setCollection] = React.useState({
    backdrop: 'loading',
    movies: 'loading',
    title: undefined
  });
  const navigation =
    useNavigation<RootStackScreenProps<'Movie'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'Collection'>['route']>();
  const collectionID = route?.params?.id || 1241;
  const getCollection = useGetCollection(collectionID);
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
    getCollection({ callback: setCollection });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContentLayout titleOffset={titleOffset}>
      <ContentCover
        backdrop={backdrop}
        setTitleOffset={setTitleOffset}
        title={title}
      />
      <ContentOverview releaseDate={subtitle} mb="xl" />
      <VerticalList
        resultsData={movies}
        getApi={getCollection}
        renderItem={MovieThumb}
        onPress={({ id, name }) => navigation.push('Movie', { id, name })}
      />
    </ContentLayout>
  );
}
