import { useLocalSearchParams } from 'expo-router';

import { useGetPersonImages } from 'api/person';
import FullScreenImagesList from 'layouts/FullScreenImagesList';

export default function MovieImages() {
  const params = useLocalSearchParams<{
    id: string;
  }>();
  const tvID = Number(params.id);
  const { data, isLoading } = useGetPersonImages({
    id: tvID
  });

  return (
    <FullScreenImagesList images={data} isLoading={isLoading} type="person" />
  );
}
