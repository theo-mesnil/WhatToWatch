import * as React from 'react'
import type { TextInputProps as RNTextInputProps } from 'react-native'
import { TextInput as RNTextInput } from 'react-native'

type TextInputProps = RNTextInputProps

export function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      autoCorrect={false}
      className="bg-white/10 light:bg-white/50 border border-neutral-100/20 light:border-violet-400/40 rounded-full h-12 px-4 text-lg text-violet-200 light:text-violet-900 leading-0"
      placeholderTextColorClassName="accent-violet-300 light:accent-violet-800"
      selectionColorClassName="accent-violet-500"
      {...props}
      accessibilityLabel={props.accessibilityLabel ?? props.placeholder}
    />
  )
}
