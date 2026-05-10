import * as React from 'react'
import { View } from 'react-native'

import { Icon } from '~/components/icon'
import type { IconProps } from '~/components/icon'
import { Text } from '~/components/text'

type BadgeProps = {
  children: React.ReactNode
  className?: string
  icon?: IconProps['name']
  testID?: string
  variant?: 'primary' | 'vote' | 'vote-high' | 'vote-low'
}

export function Badge({ children, className = '', icon, testID, variant = 'primary' }: BadgeProps) {
  const variantStyles = {
    primary: {
      background: 'bg-black/10 border border-white/30 light:bg-white/10 light:border-black/30',
      text: 'text-text-maximal',
    },
    vote: {
      background:
        'bg-yellow-400/10 border border-yellow-300/60 light:bg-yellow-200/30 light:border-yellow-700/30',
      text: 'text-yellow-300 light:text-yellow-700',
    },
    'vote-high': {
      background:
        'bg-green-400/10 border border-green-300/60 light:bg-green-200/30 light:border-green-700/30',
      text: 'text-green-300 light:text-green-700',
    },
    'vote-low': {
      background:
        'bg-red-400/10 border border-red-300/60 light:bg-red-200/30 light:border-red-700/30',
      text: 'text-red-300 light:text-red-700',
    },
  }

  return (
    <View
      className={`self-start items-center rounded-full flex-row gap-1.5 px-3 h-7 ${variantStyles[variant].background} ${className}`}
      testID={testID}
    >
      {icon && <Icon className={variantStyles[variant].text} name={icon} size={13} />}
      <Text className={variantStyles[variant].text} numberOfLines={1}>
        {children}
      </Text>
    </View>
  )
}
