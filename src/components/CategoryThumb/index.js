import React from 'react';
import { ImageBackground } from 'react-native';

import * as S from './styles';

import { getImageUrl } from 'utils/images';
import { Text } from 'components/Text';
import { Box } from 'components/Box';
import { Touchable } from 'components/Touchable';
import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { Icon } from 'components/Icon';

export function CategoryThumb({
  aspectRatio = 5 / 4,
  gradient,
  icon,
  imageUrl,
  isLoading,
  onPress,
  subtitle,
  title,
  ...rest
}) {
  return (
    <Box {...rest}>
      <Touchable onPress={!isLoading ? onPress : undefined} flex={1}>
        <S.People>
          <ImageBackground
            source={{ uri: getImageUrl(imageUrl, 780) }}
            style={{
              aspectRatio
            }}
          >
            {isLoading ? (
              <Loader height="100%" />
            ) : (
              <>
                <Gradient
                  position="absolute"
                  top={0}
                  bottom={0}
                  left={0}
                  right={0}
                  opacity={0.6}
                  colors={gradient || ['dark900', 'dark900']}
                  angle={-0.4}
                />
                <Gradient
                  position="absolute"
                  top={0}
                  bottom={0}
                  left={0}
                  right={0}
                  opacity={gradient ? 0.3 : 0.6}
                />
                <Box
                  pb={!gradient && 'sm'}
                  justifyContent={gradient ? 'center' : 'center'}
                  flexGrow={1}
                  alignItems="center"
                >
                  {!!icon && (
                    <Icon size={40} icon={icon} opacity={0.9} mb="sm" />
                  )}
                  {!!title && (
                    <Text
                      variant="h1"
                      mt="xxs"
                      numberOfLines={!subtitle ? 2 : 1}
                    >
                      {title}
                    </Text>
                  )}
                  {!!subtitle && (
                    <Text color="light400" numberOfLines={1}>
                      {subtitle}
                    </Text>
                  )}
                </Box>
              </>
            )}
          </ImageBackground>
        </S.People>
      </Touchable>
    </Box>
  );
}
