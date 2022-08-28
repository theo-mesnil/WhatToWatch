import * as React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps
} from 'react-native';
import { useTheme } from 'styled-components/native';

import { Box, BoxProps } from 'components/Box';

type TextInputProps = BoxProps & RNTextInputProps;

export function TextInput(props: TextInputProps) {
  const theme = useTheme();

  return (
    <Box
      as={RNTextInput}
      color="light900"
      selectionColor={theme.colors.light900}
      autoCorrect={false}
      flex={1}
      {...props}
    />
  );
}
