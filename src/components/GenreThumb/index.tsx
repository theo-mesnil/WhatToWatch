import React from 'react';
import { useTheme } from 'styled-components/native';
import { Text, TextProps } from 'components/Text';
import { Box, BoxProps } from 'components/Box';
import { Touchable, TouchableProps } from 'components/Touchable';
import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';

type GenreThumbProps = BoxProps &
  Pick<TouchableProps, 'onPress'> & {
    aspectRatio?: number;
    item: Genre;
    isLoading?: boolean;
    textVariant?: TextProps['variant'];
  };

export const GenreThumb = ({
  aspectRatio = 7 / 4,
  item,
  onPress,
  isLoading,
  textVariant = 'h3',
  ...rest
}: GenreThumbProps) => {
  const theme = useTheme();
  const id = item?.id;
  const title = item?.name;

  return (
    <Box {...rest}>
      <Touchable onPress={!isLoading ? onPress : undefined} flex={1}>
        <Box
          backgroundColor="dark600"
          overflow="hidden"
          style={{ aspectRatio }}
          borderRadius="md"
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
              <Box
                pb="xxs"
                pl="xs"
                pr="xs"
                justifyContent="center"
                flexGrow={1}
              >
                <Text
                  variant={textVariant}
                  mt="xxs"
                  numberOfLines={2}
                  textAlign="center"
                >
                  {title}
                </Text>
              </Box>
            </>
          )}
        </Box>
      </Touchable>
    </Box>
  );
};
