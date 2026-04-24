import { useState } from 'react'
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import { View } from 'react-native'

import { Text } from '~/components/new/text'

const maxLines = 8

export type ReadMoreProps = {
  children: string
}

export function ReadMore({ children }: ReadMoreProps) {
  const [showMoreButton, setShowMoreButton] = useState(false)
  const [isExpanded, setIsExpended] = useState(false)
  const [numLines, setNumLines] = useState<number | undefined>(undefined)

  const toggleTextShown = () => {
    setNumLines(isExpanded ? maxLines : undefined)
    setIsExpended(!isExpanded)
  }

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (e.nativeEvent.lines.length > maxLines && !isExpanded) {
      setShowMoreButton(true)
      setNumLines(maxLines)
    }
  }

  return (
    <View>
      <Text numberOfLines={numLines} onTextLayout={onTextLayout}>
        {children}
      </Text>
      {showMoreButton && (
        <Text className="mt-2 text-text-maximal" onPress={toggleTextShown}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      )}
    </View>
  )
}
