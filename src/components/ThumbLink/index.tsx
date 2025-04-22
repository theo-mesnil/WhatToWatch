import type { Href } from 'expo-router'
import { Link } from 'expo-router'
import * as React from 'react'

import type { TouchableProps } from '~/components/Touchable'
import { Touchable } from '~/components/Touchable'

export type ThumbLinkProps = Pick<TouchableProps, 'style'> & {
  children: React.ReactElement
  href: Href
  isLoading?: boolean
}

export function ThumbLink({ children, href, isLoading, style }: ThumbLinkProps) {
  if (isLoading) {
    return React.cloneElement(children, { isLoading, style })
  }

  return (
    <Link asChild href={href} push>
      <Touchable style={style}>{children}</Touchable>
    </Link>
  )
}
