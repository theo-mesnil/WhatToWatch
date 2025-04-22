import * as React from 'react'
import type { TextInputProps as RNTextInputProps } from 'react-native'
import { TextInput as RNTextInput, StyleSheet } from 'react-native'

import { theme } from '~/theme'

type TextInputProps = RNTextInputProps

export function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      autoCorrect={false}
      placeholderTextColor={theme.colors['default-900']}
      selectionColor={theme.colors['brand-700']}
      style={styles.input}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.sm,
    color: theme.colors['default-900'],
    height: 50,
    padding: theme.space.lg,
    ...theme.texts.lg,
  },
})
