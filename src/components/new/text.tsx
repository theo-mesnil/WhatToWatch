import type { TextProps } from 'react-native'
import { Text as RNText } from 'react-native'

export const Text = ({ children, className = '', ...rest }: TextProps) => {
  return (
    <RNText className={`text-sm font-normal text-text-base ${className}`} {...rest}>
      {children}
    </RNText>
  )
}
