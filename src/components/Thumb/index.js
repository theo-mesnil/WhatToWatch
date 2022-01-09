import React, { memo } from 'react';

import * as S from './styles';

import { getImageUrl } from 'utils/images';
import { Touchable } from 'components/Touchable';
import { Text } from 'components/Text';
import { Box } from 'components/Box';
import { Icon, PlayIcon } from 'components/Icon';
import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { NoCover } from 'components/NoCover';
import { getIconType } from 'utils/icons';

export const Thumb = memo(
  ({
    aspectRatio = 2 / 3,
    height,
    imageUrl,
    imageWidth,
    isLoading,
    isVideo,
    number,
    onPress,
    smallTitleOnCover,
    subtitle,
    title,
    withTitleOnCover,
    type,
    ...rest
  }) => {
    return (
      <Box borderRadius="md" overflow="hidden" {...rest}>
        <Touchable onPress={!isLoading ? onPress : undefined}>
          <Box>
            <S.Image
              source={{
                uri: isVideo ? imageUrl : getImageUrl(imageUrl, imageWidth)
              }}
              style={{
                aspectRatio,
                height
              }}
            >
              {isLoading ? (
                <Loader height="100%" />
              ) : (
                <>
                  {!isVideo && !imageUrl && (
                    <NoCover icon={getIconType(type)} />
                  )}
                  {!!number && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      backgroundColor="primary500"
                      height={30}
                      minWidth={30}
                      px="xs"
                      borderBottomRightRadius="md"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize={28} lineHeight="35px" fontWeight="bold">
                        {number}
                      </Text>
                    </Box>
                  )}
                  {isVideo && (
                    <Box
                      backgroundColor="opacity"
                      flex={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon icon={PlayIcon} size={60} />
                    </Box>
                  )}
                  {withTitleOnCover && !!title && (
                    <>
                      <Gradient
                        position="absolute"
                        top="10%"
                        bottom={0}
                        left={0}
                        right={0}
                        opacity={0.6}
                      />
                      <Box
                        px="xs"
                        justifyContent="flex-end"
                        alignItems={smallTitleOnCover ? 'flex-start' : 'center'}
                        flexGrow={1}
                        mb={smallTitleOnCover ? 'xs' : 'lg'}
                      >
                        <Text
                          variant={smallTitleOnCover ? 'h3' : 'h1'}
                          numberOfLines={2}
                          width={!smallTitleOnCover && 0.8}
                          px="xxs"
                          textAlign="center"
                        >
                          {title}
                        </Text>
                      </Box>
                    </>
                  )}
                </>
              )}
            </S.Image>
            {!withTitleOnCover && !!title && (
              <Text variant="h3" mt="xxs" numberOfLines={1}>
                {title}
              </Text>
            )}
            {!!subtitle && (
              <Text variant="subtitle2" numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Touchable>
      </Box>
    );
  }
);
