import { Image } from 'expo-image'
import type { Href } from 'expo-router'
import { useRouter } from 'expo-router'
import * as React from 'react'

import type { TouchableProps } from '~/components/touchable'
import { Touchable } from '~/components/touchable'

import type { ThumbProps } from './thumb'
import { Thumb } from './thumb'

type ThumbLinkProps = Pick<TouchableProps, 'className'> & {
  children: React.ReactElement
  href: Href
  isLoading?: boolean
  prefetchUrl?: string
}

export function ThumbLink({
  children,
  className = '',
  href,
  isLoading,
  prefetchUrl,
}: ThumbLinkProps) {
  const { push } = useRouter()

  if (isLoading) {
    return <Thumb {...(children.props as ThumbProps)} isLoading />
  }

  function handlePress() {
    if (prefetchUrl) {
      Image.prefetch(prefetchUrl)
    }
    push(href)
  }

  return (
    <Touchable className={className} onPress={handlePress}>
      {children}
    </Touchable>
  )
}
