import React from 'react';
import { ImageBackground } from 'react-native';

import * as S from './styles';

import { getImageUrl } from 'utils/images';
import { Text } from 'components/Text';
import { Box } from 'components/Box';
import { Touchable } from 'components/Touchable';
import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { PeopleFillIcon } from 'components/Icon';
import { NoCover } from 'components/NoCover';

export function PeopleThumb({
  aspectRatio = 3 / 5,
  onPress,
  isLoading,
  item,
  ...rest
}) {
  const title = item?.name;
  const subtitle = item?.character;
  const cover = item?.profile_path;

  return (
    <Box {...rest}>
      <Touchable onPress={!isLoading ? onPress : undefined}>
        <S.People>
          <ImageBackground
            source={{ uri: getImageUrl(cover) }}
            style={{
              aspectRatio
            }}
          >
            {isLoading ? (
              <Loader height="100%" />
            ) : (
              <>
                {!cover && <NoCover icon={PeopleFillIcon} />}
                <Gradient
                  position="absolute"
                  top="30%"
                  bottom={-1}
                  left={0}
                  right={0}
                  opacity={0.9}
                />
                <Box
                  pb="xs"
                  pl="xs"
                  pr="xs"
                  justifyContent="flex-end"
                  flexGrow={1}
                >
                  {!!title && (
                    <Text
                      variant="h3"
                      mt="xxs"
                      numberOfLines={!subtitle ? 2 : 1}
                      textAlign={!subtitle && 'center'}
                    >
                      {title}
                    </Text>
                  )}
                  {!!subtitle && (
                    <Text variant="subtitle2" numberOfLines={1}>
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
