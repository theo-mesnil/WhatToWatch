import { router } from 'expo-router'
import { useIntl } from 'react-intl'

import { useUser } from '~/api/account'
import defaultAvatar from '~/assets/no-avatar.png'
import { Button } from '~/components/button'

export const UserButton = () => {
  const intl = useIntl()
  const { data: user, isLoading } = useUser()

  const avatar = user?.avatar

  const image = avatar ? { uri: avatar } : defaultAvatar

  return (
    <Button
      accessibilityLabel={intl.formatMessage({ defaultMessage: 'My profile', id: 'BEX6A7' })}
      image={isLoading ? undefined : image}
      isLoading={isLoading}
      onPress={() => router.navigate('/me')}
      size="lg"
    />
  )
}
