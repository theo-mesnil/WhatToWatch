import Ionicons from '@expo/vector-icons/Ionicons'
import { useResolveClassNames } from 'uniwind'

export type IconProps = {
  className?: string
  name: keyof typeof Ionicons.glyphMap
  size?: number
}

export const Icon = ({ className, name, size = 24 }: IconProps) => {
  const iconStyles = useResolveClassNames(`text-text-maximal ${className}`)

  return <Ionicons name={name} size={size} style={iconStyles} />
}
