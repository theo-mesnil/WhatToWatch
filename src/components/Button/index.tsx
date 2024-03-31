import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';

type ButtonProps = BoxProps & {
  backgroundColor?: string;
  children: string | JSX.Element;
  isCustomChildren?: boolean;
  onPress?: TouchableProps['onPress'];
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
