import { router } from 'expo-router'

import { useUser } from '~/api/account'
import defaultAvatar from '~/assets/no-avatar.png'
import { Button } from '~/components/new/button'

export const UserButton = () => {
  const { data: user, isLoading } = useUser()

  const avatar = user?.avatar

  const image = avatar ? { uri: avatar } : defaultAvatar

  return (
    <Button
      image={isLoading ? undefined : image}
      isLoading={isLoading}
      onPress={() => router.navigate('/me')}
      size="lg"
    />
  )
}
