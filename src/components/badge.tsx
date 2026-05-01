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
  variant?: 'primary' | 'secondary' | 'vote'
}

export function Badge({ children, className = '', icon, testID, variant = 'primary' }: BadgeProps) {
  const variantStyles = {
    primary: {
      background: 'bg-black/10 border border-white/30',
      text: 'text-text-base',
    },
    secondary: {
      background: 'bg-violet-400/20 border border-violet-500/80',
      text: 'text-violet-300',
    },
    vote: {
      background: 'bg-yellow-400/20 border border-yellow-500/80',
      text: 'text-yellow-300',
    },
  }

  return (
    <View
      className={`items-center rounded-full flex-row gap-1.5 px-3 h-7 ${variantStyles[variant].background} ${className}`}
      testID={testID}
    >
      {icon && <Icon className={variantStyles[variant].text} name={icon} size={13} />}
      <Text className={variantStyles[variant].text} numberOfLines={1}>
        {children}
      </Text>
    </View>
  )
}
