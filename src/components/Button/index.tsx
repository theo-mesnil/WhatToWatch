import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';

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
        height={40}
        borderRadius={25}
        px="md"
        {...rest}
      >
        {isCustomChildren ? (
          children
        ) : (
          <Text variant="h2" color="dark900">
            {children}
          </Text>
        )}
      </Box>
    </Touchable>
  );
}
