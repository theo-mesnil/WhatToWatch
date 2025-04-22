import { useLocalSearchParams } from 'expo-router'

import { useGetPersonImages } from '~/api/person'
import FullScreenImagesList from '~/components/FullScreenImagesList'
import ModalLayout from '~/layouts//Modal'

export default function MovieImages() {
  const params = useLocalSearchParams<{
    id: string
    start: string
  }>()
  const tvID = Number(params.id)
  const startAt = Number(params.start)
  const { data, isLoading } = useGetPersonImages({
    id: tvID,
  })

  return (
    <ModalLayout>
      <FullScreenImagesList images={data} isLoading={isLoading} startAt={startAt} type="person" />
    </ModalLayout>
  )
}
