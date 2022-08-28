import * as React from 'react';
import { ImageBackground } from 'react-native';

import { Box } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { PeopleFillIcon } from 'components/Icon';
import { Loader } from 'components/Loader';
import { NoCover } from 'components/NoCover';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';
import { getImageUrl } from 'utils/images';

import * as S from './styles';

type PeopleThumbProps = Pick<TouchableProps, 'onPress'> & {
  aspectRatio?: number;
  isLoading?: boolean;
  item: {
    name: string;
    character: string;
    profile_path: string;
  };
};

export function PeopleThumb({
  aspectRatio = 3 / 5,
  onPress,
  isLoading,
  item,
  ...rest
}: PeopleThumbProps) {
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
                      textAlign={!subtitle ? 'center' : undefined}
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
