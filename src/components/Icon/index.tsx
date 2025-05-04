import * as React from 'react'
import type { DimensionValue } from 'react-native'
import type { SvgProps } from 'react-native-svg'

import { theme } from '~/theme'
import type { Color } from '~/theme'

import { type IconName, Icons } from './components'

export type IconProps = {
  color?: Color
  name: IconName
  size?: DimensionValue
}

export const Icon = ({ color = 'white', name, size = 24 }: IconProps) => {
  const IconComponent = Icons[name]

  return (
    <IconComponent
      color={theme.colors[color]}
      height={size as SvgProps['width']}
      width={size as SvgProps['width']}
    />
  )
}
