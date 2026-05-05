import type { Href } from 'expo-router'
import { Link } from 'expo-router'
import { View } from 'react-native'

import type { IconProps } from '~/components/icon'
import { Icon } from '~/components/icon'
import { Text } from '~/components/text'
import { Touchable } from '~/components/touchable'

type ListTitleProps = {
  children: React.ReactElement | string
  className?: string
  icon?: IconProps['name']
  titleHref?: Href
}

export function ListTitle({ children, className = '', icon, titleHref }: ListTitleProps) {
  return (
    <View
      className={`flex-row items-center gap-1.5 mb-1.5 ${titleHref ? 'justify-between' : ''} ${className}`}
    >
      <View className="flex-row items-center gap-1.5">
        {icon && <Icon className="text-violet-400" name={icon} size={20} />}
        <Text variant="h2">{children}</Text>
      </View>
      {titleHref && (
        <Link asChild href={titleHref}>
          <Touchable>
            <Icon className="text-violet-400" name="arrow-forward" size={30} />
          </Touchable>
        </Link>
      )}
    </View>
  )
}
