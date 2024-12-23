import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

import { useGetRequestToken } from 'api/user';

export default function TMDBWebView() {
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const { data, isLoading } = useGetRequestToken();

  const onNavigationChange = (navState: any) => {
    const { url } = navState;
    setUrl(url);
  };

  useEffect(() => {
    const closeWebview = () => {
      if (url?.includes('allow')) {
        alert('Success');
        router.back();
      } else if (url?.includes('deny')) {
        alert('Denied');
        router.back();
      }
    };

    closeWebview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (isLoading) {
    return null;
  }

  const uri = `https://www.themoviedb.org/authenticate/${data.request_token}`;

  console.log(uri);

  return (
    <WebView
      onNavigationStateChange={onNavigationChange}
      source={{ uri }}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
    />
  );
}
