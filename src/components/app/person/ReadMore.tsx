import { useCallback, useState } from 'react'
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import { StyleSheet, View } from 'react-native'

import { Text } from '~/components/Text'
import { theme } from '~/theme'

const maxLines = 8

export type ReadMoreProps = {
  children: string
}

export function ReadMore({ children }: ReadMoreProps) {
  const [showMoreButton, setShowMoreButton] = useState(false)
  const [isExpanded, setIsExpended] = useState(false)
  const [numLines, setNumLines] = useState(undefined)

  const toggleTextShown = () => {
    setNumLines(isExpanded ? maxLines : undefined)
    setIsExpended(!isExpanded)
  }

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length > maxLines && !isExpanded) {
        setShowMoreButton(true)
        setNumLines(maxLines)
      }
    },
    [isExpanded]
  )

  return (
    <View>
      <Text numberOfLines={numLines} onTextLayout={onTextLayout}>
        {children}
      </Text>
      {showMoreButton && (
        <Text onPress={toggleTextShown} style={styles.button}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: { color: theme.colors.white, marginTop: theme.space.sm },
})
