import { useLocalSearchParams } from 'expo-router';

import { useGetTvImages } from 'api/tv';
import FullScreenImagesList from 'components/FullScreenImagesList';
import ModalLayout from 'layouts/Modal';

export default function TvImages() {
  const params = useLocalSearchParams<{
    id: string;
    type: 'posters' | 'backdrops';
  }>();
  const tvID = Number(params.id);
  const type = params.type;
  const { data, isLoading } = useGetTvImages({
    id: tvID,
    enabled: true
  });

  const images = data?.[type];

  return (
    <ModalLayout>
      <FullScreenImagesList images={images} isLoading={isLoading} type="tv" />
    </ModalLayout>
  );
}
