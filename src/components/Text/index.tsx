import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { theme } from 'theme';
import type { Text as ThemeText } from 'theme';

export type TextProps = Pick<
  RNTextProps,
  | 'children'
  | 'style'
  | 'numberOfLines'
  | 'onPress'
  | 'onTextLayout'
  | 'ellipsizeMode'
> & {
  variant?: ThemeText;
};

export const Text: React.FC<TextProps> = ({
  children,
  ellipsizeMode,
  numberOfLines,
  onPress,
  onTextLayout,
  style,
  variant = 'md'
}) => {
  return (
    <RNText
      style={[
        theme.texts[variant],
        style,
        { lineHeight: theme.texts[variant].fontSize + 3 }
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}
      onTextLayout={onTextLayout}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </RNText>
  );
};
