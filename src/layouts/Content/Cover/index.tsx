import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import type { ImageSizeBackdrop } from 'types/content';
import { getImageUrl } from 'utils/images';

export type CoverProps = {
  imageUrl?: string;
  imageWidth?: ImageSizeBackdrop;
  isLoading?: boolean;
  subtitle?: string;
  title?: string;
};

export const Cover = React.memo(
  ({
    imageUrl,
    imageWidth = 'w1280',
    isLoading,
    subtitle,
    title
  }: CoverProps) => {
    return (
      <View style={styles.wrapper}>
        <ImageBackground
          source={{
            uri: getImageUrl(imageUrl, imageWidth)
          }}
          style={[
            {
              aspectRatio: 1 / 1
            },
            styles.image
          ]}
        >
          {isLoading && <Loader style={styles.loading} />}
        </ImageBackground>
        <View style={[globalStyles.absoluteFill, styles.content]}>
          <Gradient colors={['transparent', theme.colors.behind]} />
          <View style={styles.texts}>
            {title && (
              <Text style={styles.text} variant="h0">
                {title}
              </Text>
            )}
            {subtitle && <Text style={styles.text}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: theme.space.lg
  },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  texts: {
    paddingHorizontal: theme.space.xxl,
    paddingBottom: theme.space.lg,
    alignItems: 'center',
    gap: theme.space.sm
  },
  text: {
    textAlign: 'center'
  },
  image: {
    backgroundColor: theme.colors.ahead
  },
  loading: {
    width: '100%'
  }
});
