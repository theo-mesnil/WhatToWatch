import type { TextProps as RNTextProps } from 'react-native'
import { Text as RNText } from 'react-native'

export type TextProps = RNTextProps & {
  bold?: boolean
  variant?: 'h0' | 'h1' | 'h2' | 'h3' | 'lg' | 'md' | 'sm' | undefined
}

export const Text = ({
  bold,
  children,
  className = '',
  maxFontSizeMultiplier = 1.6,
  variant = 'md',
  ...rest
}: TextProps) => {
  const variantClass = {
    h0: 'text-4xl font-bold text-text-maximal',
    h1: 'text-2xl font-bold text-text-maximal',
    h2: 'text-xl font-bold text-text-maximal',
    h3: 'text-lg font-bold text-text-maximal',
    lg: 'text-base font-normal text-text-base',
    md: 'text-sm font-normal text-text-base',
    sm: 'text-xs font-normal text-text-base',
  }[variant]

  return (
    <RNText
      className={`${variantClass} ${bold ? 'font-bold leading-tight' : ''} ${className}`}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      {...rest}
    >
      {children}
    </RNText>
  )
}
