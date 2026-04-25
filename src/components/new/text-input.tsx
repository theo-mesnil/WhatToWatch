import * as React from 'react'
import type { TextInputProps as RNTextInputProps } from 'react-native'
import { TextInput as RNTextInput } from 'react-native'

type TextInputProps = RNTextInputProps

export function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      autoCorrect={false}
      className="bg-white rounded-md h-12 px-4 text-base text-neutral-900"
      placeholderTextColorClassName="text-neutral-900"
      selectionColorClassName="text-brand-700"
      {...props}
    />
  )
}
