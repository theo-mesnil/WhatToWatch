import { useCallback, useState } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';

const maxLines = 8;

export type ReadMoreProps = {
  children: string;
};

export function ReadMore({ children }: ReadMoreProps) {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isExpanded, setIsExpended] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  const toggleTextShown = () => {
    setNumLines(isExpanded ? maxLines : undefined);
    setIsExpended(!isExpanded);
  };

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length > maxLines && !isExpanded) {
        setShowMoreButton(true);
        setNumLines(maxLines);
      }
    },
    [isExpanded]
  );

  return (
    <View>
      <Text onTextLayout={onTextLayout} numberOfLines={numLines}>
        {children}
      </Text>
      {showMoreButton && (
        <Text style={styles.button} onPress={toggleTextShown}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: { color: theme.colors.white, marginTop: theme.space.sm }
});
