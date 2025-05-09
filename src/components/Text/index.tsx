import type { TextProps as RNTextProps } from 'react-native'
import { Text as RNText } from 'react-native'

import { theme } from '~/theme'
import type { Text as ThemeText } from '~/theme'

export type TextProps = Pick<
  RNTextProps,
  'children' | 'ellipsizeMode' | 'numberOfLines' | 'onPress' | 'onTextLayout' | 'style' | 'testID'
> & {
  variant?: ThemeText
}

export const Text = ({
  children,
  ellipsizeMode,
  numberOfLines,
  onPress,
  onTextLayout,
  style,
  testID,
  variant = 'md',
}: TextProps) => {
  return (
    <RNText
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      onPress={onPress}
      onTextLayout={onTextLayout}
      style={[theme.texts[variant], style, { flexShrink: 1 }]}
      testID={testID}
    >
      {children}
    </RNText>
  )
}
