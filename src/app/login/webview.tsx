import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

import { useGetAuthenticationSession } from 'api/authentication';
import { useSession } from 'contexts/Session';

export default function TMDBWebView() {
  const [url, setUrl] = useState<string>('');
  const { token } = useLocalSearchParams();
  const router = useRouter();
  const { createSession } = useSession();
  const {
    data: sessionId,
    isSuccess,
    mutate: getSessionId
  } = useGetAuthenticationSession();

  const onNavigationChange = (navState: any) => {
    const { url } = navState;
    setUrl(url);
  };

  useEffect(() => {
    const closeWebview = async () => {
      if (url?.includes('allow')) {
        await getSessionId({ request_token: token as string });

        if (isSuccess) {
          createSession(sessionId);
          router.replace({ pathname: '/login', params: { status: 'allow' } });
        }
      } else if (url?.includes('deny')) {
        router.push({ pathname: '/login', params: { status: 'deny' } });
      }
    };

    closeWebview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const uri = `https://www.themoviedb.org/authenticate/${token}`;

  return (
    <WebView
      onNavigationStateChange={onNavigationChange}
      source={{ uri }}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
    />
  );
}
