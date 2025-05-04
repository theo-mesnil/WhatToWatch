import type { Href } from 'expo-router'
import { Link } from 'expo-router'
import * as React from 'react'

import type { TouchableProps } from '~/components/Touchable'
import { Touchable } from '~/components/Touchable'

import type { ThumbProps } from '../Thumb'
import { Thumb } from '../Thumb'

export type ThumbLinkProps = Pick<TouchableProps, 'style'> & {
  children: React.ReactElement
  href: Href
  isLoading?: boolean
}

export function ThumbLink({ children, href, isLoading, style }: ThumbLinkProps) {
  if (isLoading) {
    return <Thumb {...(children.props as ThumbProps)} isLoading />
  }

  return (
    <Link asChild href={href} push>
      <Touchable style={style}>{children}</Touchable>
    </Link>
  )
}
