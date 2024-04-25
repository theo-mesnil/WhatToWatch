import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { theme } from 'theme';
import type { Text as ThemeText } from 'theme';

export type TextProps = Pick<RNTextProps, 'children' | 'style'> & {
  variant?: ThemeText;
};

export const Text: React.FC<TextProps> = ({
  children,
  style,
  variant = 'md'
}) => {
  return <RNText style={[theme.texts[variant], style]}>{children}</RNText>;
};
