import { windowWidth } from 'constants/screen';
import { blurRadius } from 'constants/styles';

import * as React from 'react';
import { Animated, ImageBackground } from 'react-native';
import { getImageUrl } from 'utils/images';
import { Box } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { AnimatedBox } from 'components/AnimatedBox';

type CoverLayoutProps = {
  imageUrl: string;
};

export function CoverLayout({ imageUrl, ...rest }: CoverLayoutProps) {
  const [scrollY] = React.useState(new Animated.Value(0));
  const [opacity] = React.useState(new Animated.Value(1));
  const aspectRatio = 16 / 9;
  const inputRange = windowWidth / aspectRatio;

  return (
    <>
      <AnimatedBox
        position="absolute"
        left="0"
        right="0"
        style={{
          opacity: scrollY.interpolate({
            inputRange: [0, inputRange],
            outputRange: [1, 0]
          })
        }}
      >
        <ImageBackground
          flex={1}
          source={{ uri: getImageUrl(imageUrl) }}
          style={{ aspectRatio }}
          opacity={0.5}
          blurRadius={blurRadius}
        />
      </AnimatedBox>
      <Gradient
        aspectRatio={aspectRatio}
        position="absolute"
        top={0}
        left={0}
        right={0}
        colors={['transparent', 'behind']}
      />
      <Animated.ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY }
              }
            }
          ],
          {
            useNativeDriver: true
          },
          [
            {
              nativeEvent: {
                contentOffset: { y: opacity }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
      >
        <Box pb="xl" pt="xxl" {...rest} />
      </Animated.ScrollView>
    </>
  );
}
