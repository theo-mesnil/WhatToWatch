import * as React from 'react';
import { Animated } from 'react-native';

import { AnimatedBox } from 'components/AnimatedBox';
import { Box } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { windowWidth } from 'constants/screen';
import { blurRadius } from 'constants/styles';
import { getImageUrl } from 'utils/images';

import * as S from './styles';

type CoverLayoutProps = {
  imageUrl: string;
  children: React.ReactNode;
};

export function CoverLayout({ children, imageUrl, ...rest }: CoverLayoutProps) {
  const [scrollY] = React.useState(new Animated.Value(0));
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
        <S.Image
          source={{ uri: getImageUrl(imageUrl) }}
          style={{ aspectRatio }}
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
          }
        )}
      >
        <Box pb="xl" pt="xxl" {...rest}>
          {children}
        </Box>
      </Animated.ScrollView>
    </>
  );
}
