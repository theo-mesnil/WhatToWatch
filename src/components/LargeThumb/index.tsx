import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';
import type { ImageSizeBackdrop } from 'types/content';
import { getImageUrl } from 'utils/images';

export type LargeThumbProps = Pick<TouchableProps, 'onPress'> & {
  imageUrl?: string;
  imageWidth?: ImageSizeBackdrop;
  isLoading?: boolean;
  title?: string;
};

export const LargeThumb = React.memo(
  ({
    imageUrl,
    imageWidth = 'w780',
    isLoading,
    onPress,
    title
  }: LargeThumbProps) => {
    const styles = useStyles();

    return (
      <Touchable onPress={!isLoading ? onPress : undefined}>
        <View style={styles.wrapper}>
          <ImageBackground
            source={{
              uri: getImageUrl(imageUrl, imageWidth)
            }}
            style={{
              aspectRatio: 16 / 10,
              ...styles.image
            }}
          >
            {isLoading && <Loader style={styles.loading} />}
          </ImageBackground>
          <View style={[globalStyles.absoluteFill, styles.content]}>
            <Gradient colors={['transparent', theme.colors.behind]} />
            {title && (
              <Text variant="h0" style={styles.title}>
                {title}
              </Text>
            )}
          </View>
        </View>
      </Touchable>
    );
  }
);

function useStyles() {
  return StyleSheet.create({
    wrapper: {
      borderTopLeftRadius: theme.radii.xxl,
      borderTopRightRadius: theme.radii.xxl,
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
    image: {
      backgroundColor: theme.colors.ahead
    },
    loading: {
      width: '100%'
    }
  });
}
