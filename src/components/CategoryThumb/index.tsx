import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { Icon, IconElement } from 'components/Icon';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';

import * as S from './styles';

type CategoryThumbProps = BoxProps &
  Pick<TouchableProps, 'onPress'> & {
    aspectRatio?: number;
    icon?: IconElement;
    isLoading?: boolean;
    title?: string | React.ReactElement;
  };

export function CategoryThumb({
  aspectRatio = 5 / 4,
  icon,
  isLoading,
  onPress,
  title,
  ...rest
}: CategoryThumbProps) {
  return (
    <Box flex={1} {...rest}>
      <Touchable onPress={!isLoading ? onPress : undefined}>
        <S.People aspectRatio={aspectRatio}>
          <Box justifyContent="center" flexGrow={1} alignItems="center">
            {!!icon && <Icon size={25} icon={icon} opacity={0.9} mb="sm" />}
            {!!title && <Text variant="h2">{title}</Text>}
          </Box>
        </S.People>
      </Touchable>
    </Box>
  );
}
