import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { useAuth } from '~/contexts/Auth'

import { Icon } from '../Icon'
import { LoginButton } from '../Loginbutton'
import { Text } from '../new/text'

export const LoginWithDescription = () => {
  const { openLogin } = useAuth()

  return (
    <View>
      <View className="items-center flex-row gap-2">
        <Icon color="brand-500" name="heart-fill" size={30} />
        <Text variant="h2">
          <FormattedMessage defaultMessage="Manage your favourite films and series" id="K0XQE7" />
        </Text>
      </View>
      <View className="items-center flex-row gap-2">
        <Icon color="brand-500" name="bookmark-fill" size={30} />
        <Text variant="h2">
          <FormattedMessage defaultMessage="Add movies and series on your watchlist" id="OQEcON" />
        </Text>
      </View>
      <View className="items-center flex-row gap-2">
        <Icon color="brand-500" name="user-fill" size={30} />
        <Text variant="h2">
          <FormattedMessage
            defaultMessage="Get Recommendations based on your profile"
            id="ASO7Cw"
          />
        </Text>
      </View>
      <View>
        <Text variant="lg">
          <FormattedMessage
            defaultMessage="Use your TMDB account to sync your watchlist, favorite and more."
            id="TKM0PN"
          />
        </Text>
        <LoginButton onPress={() => openLogin()} />
      </View>
    </View>
  )
}
