import * as React from 'react';
import { Box, BoxProps } from 'components/Box';
import { Touchable, TouchableProps } from 'components/Touchable';
import { Text } from 'components/Text';

type ButtonProps = BoxProps & {
  onPress?: TouchableProps['onPress'];
  isCustomChildren?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
};

export function Button({
  backgroundColor = 'primary500',
  children,
  isCustomChildren,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <Touchable alignSelf="flex-start" onPress={onPress}>
      <Box
        backgroundColor={backgroundColor}
        justifyContent="center"
        overflow="hidden"
        height={34}
        borderRadius={34}
        px="md"
        alignSelf="flex-start"
        {...rest}
      >
        {isCustomChildren ? (
          children
        ) : (
          <Text variant="h3" color="dark900" numberOfLines={1}>
            {children}
          </Text>
        )}
      </Box>
    </Touchable>
  );
}
