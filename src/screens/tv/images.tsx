import { useLocalSearchParams } from 'expo-router'

import { useGetTvImages } from '~/api/tv'
import FullScreenImagesList from '~/components/full-screen-images-list'
import { ModalLayout } from '~/layouts/modal'

export default function TvImages() {
  const params = useLocalSearchParams<{
    id: string
    type: 'backdrops' | 'posters'
  }>()
  const tvID = Number(params.id)
  const type = params.type
  const { data, isLoading } = useGetTvImages({
    enabled: true,
    id: tvID,
  })

  const images = data?.[type]

  return (
    <ModalLayout centered>
      <FullScreenImagesList images={images} isLoading={isLoading} type="tv" />
    </ModalLayout>
  )
}
