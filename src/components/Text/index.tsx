import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { theme } from 'theme';
import type { Text as ThemeText } from 'theme/texts';

export type TextProps = Pick<RNTextProps, 'children'> & {
  variant?: ThemeText;
};

export const Text: React.FC<TextProps> = ({ children, variant = 'text' }) => {
  return <RNText style={theme.texts[variant]}>{children}</RNText>;
};
