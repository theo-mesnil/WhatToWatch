import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { theme } from 'theme';

export type TextProps = Pick<RNTextProps, 'children'>;

export const Text: React.FC<TextProps> = ({ children }) => {
  return <RNText style={{ color: theme.colors.text }}>{children}</RNText>;
};
