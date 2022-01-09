import React from 'react';

import { Touchable } from 'components/Touchable';
import { Text } from 'components/Text';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';

export function ButtonText({ children }) {
  return (
    <Text variant="h3" numberOfLines={1}>
      {children}
    </Text>
  );
}

export function ButtonLoader() {
  return (
    <Box height={34} borderRadius={34} width={100} overflow="hidden">
      <Loader />
    </Box>
  );
}

export function Button({
  backgroundColor = 'primary500',
  children,
  isCustomChildren,
  onPress,
  ...rest
}) {
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
        {isCustomChildren ? children : <ButtonText>{children}</ButtonText>}
      </Box>
    </Touchable>
  );
}
