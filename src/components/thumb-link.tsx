import type { Href } from 'expo-router'
import { Link } from 'expo-router'
import * as React from 'react'

import type { TouchableProps } from '~/components/touchable'
import { Touchable } from '~/components/touchable'

import type { ThumbProps } from './thumb'
import { Thumb } from './thumb'

type ThumbLinkProps = Pick<TouchableProps, 'className'> & {
  children: React.ReactElement
  href: Href
  isLoading?: boolean
}

export function ThumbLink({ children, className, href, isLoading }: ThumbLinkProps) {
  if (isLoading) {
    return <Thumb {...(children.props as ThumbProps)} isLoading />
  }

  return (
    <Link asChild href={href} push>
      <Touchable className={className}>{children}</Touchable>
    </Link>
  )
}
