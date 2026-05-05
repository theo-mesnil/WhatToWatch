import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import { View } from 'react-native'

import { Text } from '~/components/text'

const maxLines = 6

type ReadMoreProps = {
  children: React.ReactNode
  className?: string
}

export function ReadMore({ children, className = '' }: ReadMoreProps) {
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
    <View className={className}>
      <Text numberOfLines={numLines} onTextLayout={onTextLayout}>
        {children}
      </Text>
      {showMoreButton && (
        <Text className="mt-2 text-violet-400" onPress={toggleTextShown}>
          {isExpanded ? (
            <FormattedMessage defaultMessage="Read Less" id="jB/Lmw" />
          ) : (
            <FormattedMessage defaultMessage="Read More" id="4Cltcc" />
          )}
        </Text>
      )}
    </View>
  )
}
