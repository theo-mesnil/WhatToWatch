import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Loader } from 'components/Loader';
import { NoCover } from 'components/NoCover';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';
import type { ContentType } from 'types/content';
import { getIconType } from 'utils/icons';
import { getImageUrl } from 'utils/images';

export type ThumbProps = Pick<TouchableProps, 'onPress'> & {
  aspectRatio?: number;
  height?: number;
  imageUrl?: string;
  imageWidth?: number;
  isLoading?: boolean;
  type?: ContentType;
};

export const Thumb = React.memo(
  ({
    aspectRatio = 2 / 3,
    height,
    imageUrl,
    imageWidth,
    isLoading,
    onPress,
    type
  }: ThumbProps) => {
    const styles = useStyles();

    return (
      <Touchable onPress={!isLoading ? onPress : undefined}>
        <View style={styles.wrapper}>
          <ImageBackground
            source={{
              uri: getImageUrl(imageUrl, imageWidth)
            }}
            style={{
              aspectRatio,
              height,
              ...styles.image
            }}
          >
            {isLoading ? (
              <Loader style={styles.loading} />
            ) : (
              <>{!imageUrl && <NoCover icon={getIconType(type)} />}</>
            )}
          </ImageBackground>
        </View>
      </Touchable>
    );
  }
);

function useStyles() {
  return StyleSheet.create({
    wrapper: {
      borderRadius: theme.radii.sm,
      width: '100%',
      overflow: 'hidden'
    },
    image: {
      backgroundColor: theme.colors.ahead
    },
    loading: {
      width: '100%'
    }
  });
}
