import { useLocalSearchParams } from 'expo-router'

import { useGetMovieImages } from '~/api/movie'
import FullScreenImagesList from '~/components/FullScreenImagesList'
import ModalLayout from '~/layouts//Modal'

export default function MovieImages() {
  const params = useLocalSearchParams<{
    id: string
    type: 'backdrops' | 'posters'
  }>()
  const movieID = Number(params.id)
  const type = params.type
  const { data, isLoading } = useGetMovieImages({
    enabled: true,
    id: movieID,
  })

  const images = data?.[type]

  return (
    <ModalLayout>
      <FullScreenImagesList images={images} isLoading={isLoading} type="movie" />
    </ModalLayout>
  )
}
