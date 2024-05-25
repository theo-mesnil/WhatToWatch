import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { useGetContentLogo } from 'api/logo';
import { Gradient } from 'components/Gradient';
import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import type { ContentType, ImageSizeBackdrop } from 'types/content';
import { getImageUrl } from 'utils/images';

export type LargeThumbProps = {
  id: number;
  imageUrl?: string;
  imageWidth?: ImageSizeBackdrop;
  isLoading?: boolean;
  title?: string;
  type: ContentType;
};

export const LargeThumb = React.memo(
  ({
    id,
    imageUrl,
    imageWidth = 'w780',
    isLoading,
    title,
    type
  }: LargeThumbProps) => {
    const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
      id,
      type
    });

    return (
      <View style={styles.wrapper}>
        <Thumb
          imageUrl={imageUrl}
          imageWidth={imageWidth}
          type={type}
          isLoading={isLoading}
          aspectRatio={16 / 12}
        />
        <View style={[globalStyles.absoluteFill, styles.content]}>
          <Gradient colors={['transparent', theme.colors.behind]} />
          {!isLoadingLogo && logo && (
            <Image
              style={[styles.logo, { aspectRatio: logo.aspectRatio }]}
              src={getImageUrl(logo.url, 'w500')}
            />
          )}
          {!isLoadingLogo && !logo && title && (
            <Text numberOfLines={2} variant="h0" style={styles.title}>
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
    borderRadius: theme.radii.xxl,
    width: '100%',
    overflow: 'hidden',
    marginBottom: theme.space.lg
  },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    paddingHorizontal: theme.space.lg,
    paddingBottom: theme.space.sm,
    textAlign: 'center'
  },
  loading: {
    width: '100%'
  },
  logo: {
    width: 250,
    maxHeight: 100,
    marginBottom: theme.space.lg
  }
});
