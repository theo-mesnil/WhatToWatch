import { useLocalSearchParams } from 'expo-router';

import { useGetTvImages } from 'api/tv';
import FullScreenImages from 'components/FullScreenList';

export default function TvImages() {
  const params = useLocalSearchParams<{
    id: string;
    type: 'posters' | 'backdrops';
  }>();
  const tvID = Number(params.id);
  const type = params.type;
  const { data, isLoading } = useGetTvImages({
    id: tvID
  });

  const images = data?.[type];

  return <FullScreenImages images={images} isLoading={isLoading} type="tv" />;
}
