import * as React from 'react';

import { Box } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { Icon, PlayIcon } from 'components/Icon';
import { Loader } from 'components/Loader';
import { NoCover } from 'components/NoCover';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';
import { getIconType } from 'utils/icons';
import { getImageUrl } from 'utils/images';

import * as S from './styles';

type ThumbProps = Pick<TouchableProps, 'onPress'> & {
  aspectRatio?: number;
  height?: number;
  imageUrl?: string;
  imageWidth?: number;
  isLoading?: boolean;
  isVideo?: boolean;
  number?: number;
  subtitle?: string;
  title?: string;
  type?: ContentType;
  withTitleOnCover?: boolean;
};

export const Thumb = React.memo(
  ({
    aspectRatio = 2 / 3,
    height,
    imageUrl,
    imageWidth,
    isLoading,
    isVideo,
    number,
    onPress,
    subtitle,
    title,
    type,
    withTitleOnCover,
    ...rest
  }: ThumbProps) => {
    const isNumber = !!number;

    return (
      <Touchable onPress={!isLoading ? onPress : undefined}>
        <Box {...rest}>
          {!!isNumber && (
            <Box
              position="absolute"
              bottom={10}
              left={number > 1 ? '-15%' : 0}
              width={number > 1 ? (number === 10 ? '100px' : '80px') : '40px'}
              overflow="hidden"
              height="100px"
              zIndex={1}
            >
              <Text
                ml="-25%"
                fontSize="130px"
                color="primary300"
                letterSpacing="-15px"
                lineHeight="145px"
                weight="bold"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10
                }}
              >
                {number}
              </Text>
            </Box>
          )}
          <Box
            borderRadius="md"
            width={isNumber ? '75%' : '100%'}
            ml={isNumber && '10%'}
          >
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
                        height="100px"
                        bottom={0}
                        left={0}
                        right={0}
                        opacity={1}
                      />
                      <Box
                        alignItems="center"
                        justifyContent="flex-end"
                        flexGrow={1}
                        mb="md"
                      >
                        <Text
                          variant="h1"
                          numberOfLines={2}
                          textAlign="center"
                          width="80%"
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
        </Box>
      </Touchable>
    );
  }
);
