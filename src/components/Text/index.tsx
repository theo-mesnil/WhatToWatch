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

export const Text: React.FC<TextProps> = ({
  children,
  ellipsizeMode,
  numberOfLines,
  onPress,
  onTextLayout,
  style,
  testID,
  variant = 'md',
}) => {
  return (
    <RNText
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      onPress={onPress}
      onTextLayout={onTextLayout}
      style={[theme.texts[variant], { lineHeight: theme.texts[variant].fontSize + 3 }, style]}
      testID={testID}
    >
      {children}
    </RNText>
  )
}
