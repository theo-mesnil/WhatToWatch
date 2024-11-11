import { router } from 'expo-router';
import { View } from 'react-native';

import { useGetAuthenticationToken } from 'api/authentication';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { useSession } from 'contexts/Session';

export default function Login() {
  const { data: token, isLoading } = useGetAuthenticationToken();
  const { session } = useSession();

  const handleLogin = async () => {
    if (!isLoading && token) {
      router.push({ pathname: '/login/webview', params: { token } });
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, backgroundColor: '#0d253f' }}>
      <Button onPress={handleLogin}>Login</Button>
      <Text>session: {session}</Text>
    </View>
  );
}
