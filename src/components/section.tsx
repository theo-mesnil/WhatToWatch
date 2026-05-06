import { View } from 'react-native'

import { Text } from '~/components/text'

type SectionProps = {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
}

export function Section({ children, className = '', title }: SectionProps) {
  return (
    <View className="gap-2 mx-screen">
      {title && <Text variant="h3">{title}</Text>}
      <View
        className={`bg-foreground border-border-default/30 border px-3 py-4 rounded-3xl gap-2 ${className}`}
      >
        {children}
      </View>
    </View>
  )
}
