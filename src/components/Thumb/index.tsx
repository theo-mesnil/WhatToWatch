import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Loader } from 'components/Loader';
import { NoCover } from 'components/NoCover';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';
import type {
  ContentType,
  ImageSizeBackdrop,
  ImageSizePoster
} from 'types/content';
import { getIconType } from 'utils/icons';
import { getImageUrl } from 'utils/images';

export type ThumbProps = Pick<TouchableProps, 'onPress'> & {
  aspectRatio?: number;
  height?: number;
  imageUrl?: string;
  imageWidth?: ImageSizeBackdrop | ImageSizePoster;
  isLoading?: boolean;
  type?: ContentType;
};

export const Thumb = React.memo(
  ({
    aspectRatio = 6 / 9,
    height,
    imageUrl,
    imageWidth,
    isLoading,
    onPress,
    type
  }: ThumbProps) => {
    return (
      <Touchable onPress={!isLoading ? onPress : undefined}>
        <View style={styles.wrapper}>
          <ImageBackground
            source={{
              uri: getImageUrl(imageUrl, imageWidth)
            }}
            style={[
              {
                aspectRatio,
                height
              },
              styles.image
            ]}
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

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.sm,
    overflow: 'hidden'
  },
  image: {
    backgroundColor: theme.colors.ahead
  },
  loading: {
    width: '100%'
  }
});
