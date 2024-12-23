import { useRouter } from 'expo-router';

import { Button } from 'components/Button';

export const LoginButton = () => {
  const router = useRouter();

  function handleClick() {
    router.push('/login/webview');
  }

  return <Button onPress={handleClick}>Log In</Button>;
};
