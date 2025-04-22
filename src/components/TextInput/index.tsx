import * as React from 'react'
import type { TextInputProps as RNTextInputProps } from 'react-native'
import { TextInput as RNTextInput, StyleSheet } from 'react-native'

import { theme } from 'theme'

type TextInputProps = RNTextInputProps

export function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      selectionColor={theme.colors['brand-700']}
      placeholderTextColor={theme.colors['default-900']}
      style={styles.input}
      autoCorrect={false}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.sm,
    color: theme.colors['default-900'],
    padding: theme.space.lg,
    ...theme.texts.lg,
  },
})
