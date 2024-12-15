import * as React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { COVER_HEIGHT } from 'constants/cover';
import { theme } from 'theme';
import type { ImageSizeBackdrop } from 'types/content';
import { getImageUrl } from 'utils/images';

export type CoverProps = {
  imageUrl?: string;
  imageWidth?: ImageSizeBackdrop;
  isLoading?: boolean;
  logo?: {
    aspectRatio: number;
    url: string;
  };
  title: string;
};

export const Cover = React.memo(
  ({ imageUrl, isLoading, logo, title }: CoverProps) => {
    return (
      <View style={styles.wrapper}>
        <ImageBackground
          testID="cover-image"
          source={{
            uri: getImageUrl(imageUrl, 'w780')
          }}
          style={styles.image}
        >
          {isLoading && <Loader style={styles.loading} />}
        </ImageBackground>
        <Gradient
          style={styles.gradient}
          colors={['transparent', theme.colors.behind]}
        />
        <View style={styles.content}>
          {logo && (
            <Image
              testID="cover-logo"
              style={[styles.logo, { aspectRatio: logo.aspectRatio }]}
              src={getImageUrl(logo.url, 'w500')}
            />
          )}
          {!logo && title && (
            <Text testID="cover-title" style={styles.text} variant="h0">
              {title}
            </Text>
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    height: COVER_HEIGHT,
    width: '100%',
    marginBottom: theme.space.lg,
    position: 'absolute'
  },
  gradient: {
    position: 'absolute',
    marginTop: 150,
    height: COVER_HEIGHT - 150,
    width: '100%'
  },
  content: {
    height: '100%',
    marginHorizontal: theme.space.xl,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: COVER_HEIGHT,
    backgroundColor: theme.colors.ahead
  },
  logo: {
    width: 250,
    maxHeight: 150
  },
  text: {
    textAlign: 'center'
  },
  loading: {
    width: '100%'
  }
});
