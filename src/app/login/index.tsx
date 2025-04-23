import React from 'react'
import type { WebViewNavigation } from 'react-native-webview'
import { WebView } from 'react-native-webview'

import { useCreateAccessToken, useRequestToken } from '~/api/auth'

export default function Login() {
  const [isApproved, setIsApproved] = React.useState(false)
  const { data } = useRequestToken()
  const requestToken = data?.request_token

  useCreateAccessToken(isApproved ? requestToken : undefined)

  function handleWebViewNavigationStateChange(newNavState: WebViewNavigation) {
    const { url } = newNavState
    if (!url) return

    // redirect somewhere else
    if (url.includes('approve')) {
      setIsApproved(true)
    }
  }

  if (!requestToken) return null

  return (
    <WebView
      onNavigationStateChange={handleWebViewNavigationStateChange}
      source={{ uri: `https://www.themoviedb.org/auth/access?request_token=${requestToken}` }}
    />
  )
}
