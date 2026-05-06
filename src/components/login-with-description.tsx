import { FormattedMessage } from 'react-intl'
import { View } from 'react-native'

import { Icon } from '~/components/icon'
import { LoginButton } from '~/components/login-button'
import { Text } from '~/components/text'
import { useAuth } from '~/contexts/auth'

export const LoginWithDescription = () => {
  const { openLogin } = useAuth()

  return (
    <View className="gap-4 m-2">
      <View className="items-center flex-row w-full gap-4">
        <Icon className="text-violet-500" name="heart" size={30} />
        <Text bold className="flex-1 text-text-maximal" variant="lg">
          <FormattedMessage defaultMessage="Manage your favourite films and series" id="K0XQE7" />
        </Text>
      </View>
      <View className="items-center flex-row gap-4">
        <Icon className="text-violet-500" name="bookmark" size={30} />
        <Text bold className="flex-1 text-text-maximal" variant="lg">
          <FormattedMessage defaultMessage="Add movies and series on your watchlist" id="OQEcON" />
        </Text>
      </View>
      <View className="items-center flex-row gap-4">
        <Icon className="text-violet-500" name="person" size={30} />
        <Text bold className="flex-1 text-text-maximal" variant="lg">
          <FormattedMessage
            defaultMessage="Get Recommendations based on your profile"
            id="ASO7Cw"
          />
        </Text>
      </View>
      <Text variant="lg">
        <FormattedMessage
          defaultMessage="Use your TMDB account to sync your watchlist, favorite and more."
          id="TKM0PN"
        />
      </Text>
      <LoginButton onPress={() => openLogin()} />
    </View>
  )
}
