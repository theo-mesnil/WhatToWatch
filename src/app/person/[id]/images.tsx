import { useLocalSearchParams } from 'expo-router';

import { useGetPersonImages } from 'api/person';
import FullScreenImages from 'components/FullScreenList';

export default function MovieImages() {
  const params = useLocalSearchParams<{
    id: string;
  }>();
  const tvID = Number(params.id);
  const { data, isLoading } = useGetPersonImages({
    id: tvID
  });

  return <FullScreenImages images={data} isLoading={isLoading} type="person" />;
}
