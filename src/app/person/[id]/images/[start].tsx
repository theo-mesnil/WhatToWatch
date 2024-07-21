import { useLocalSearchParams } from 'expo-router';

import { useGetPersonImages } from 'api/person';
import FullScreenImagesList from 'layouts/FullScreenImagesList';

export default function MovieImages() {
  const params = useLocalSearchParams<{
    id: string;
    start: string;
  }>();
  const tvID = Number(params.id);
  const startAt = Number(params.start);
  const { data, isLoading } = useGetPersonImages({
    id: tvID
  });

  return (
    <FullScreenImagesList
      startAt={startAt}
      images={data}
      isLoading={isLoading}
      type="person"
    />
  );
}
