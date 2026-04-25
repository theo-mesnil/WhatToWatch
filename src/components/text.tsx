import type { TextProps as RNTextProps } from 'react-native'
import { Text as RNText } from 'react-native'

export type TextProps = RNTextProps & {
  bold?: boolean
  variant?: 'h0' | 'h1' | 'h2' | 'h3' | 'lg' | 'md'
}

export const Text = ({ bold, children, className = '', variant = 'md', ...rest }: TextProps) => {
  const variantClass = {
    h0: 'text-4xl font-bold text-white',
    h1: 'text-2xl font-bold text-white',
    h2: 'text-xl font-bold text-white',
    h3: 'text-lg font-bold text-white',
    lg: 'text-base font-normal text-text-base',
    md: 'text-sm font-normal text-text-base',
  }[variant]

  return (
    <RNText className={`${variantClass} ${bold ? 'font-bold' : ''} ${className}`} {...rest}>
      {children}
    </RNText>
  )
}
