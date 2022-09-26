import * as React from 'react';
import { useTheme } from 'styled-components/native';

import { Box, BoxProps } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { Icon, MovieFillIcon, TvFillIcon } from 'components/Icon';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';

type GenreThumbProps = BoxProps &
  Pick<TouchableProps, 'onPress'> & {
    aspectRatio?: number;
    item: Genre;
    isLoading?: boolean;
    isTV?: boolean;
    isTag?: boolean;
    withIcon?: boolean;
  };

export const GenreThumb = ({
  aspectRatio = 5 / 4,
  isLoading,
  isTV,
  item,
  onPress,
  isTag,
  withIcon,
  ...rest
}: GenreThumbProps) => {
  const theme = useTheme();
  const id = item?.id;
  const title = item?.name;

  const tagStyle = isTag
    ? {
        height: '40px',
        width: '100%'
      }
    : {};

  return (
    <Box {...rest}>
      <Touchable onPress={!isLoading ? onPress : undefined} flex={1}>
        <Box
          backgroundColor="dark600"
          aspectRatio={isTag ? undefined : aspectRatio}
          borderRadius="md"
          overflow="hidden"
          {...tagStyle}
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
                colors={theme.colors.genres[id] || theme.colors.genres.default}
                angle={-0.4}
              />
              <Box p="sm" flexGrow={1} justifyContent="flex-end">
                <Text fontSize={14} weight="bold" numberOfLines={3}>
                  {title?.toUpperCase()}
                </Text>
                {withIcon && (
                  <Box position="absolute" right="-20px" bottom="-10px">
                    <Icon
                      size={80}
                      transform={[{ rotate: '20deg' }]}
                      opacity={0.3}
                      icon={isTV ? TvFillIcon : MovieFillIcon}
                    />
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
      </Touchable>
    </Box>
  );
};
