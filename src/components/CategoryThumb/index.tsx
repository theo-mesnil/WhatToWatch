import * as React from 'react';
import { ImageBackground } from 'react-native';

import { Box, BoxProps } from 'components/Box';
import { Gradient, GradientProps } from 'components/Gradient';
import { Icon, IconElement } from 'components/Icon';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';
import { getImageUrl } from 'utils/images';

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
    <Box {...rest}>
      <Touchable onPress={!isLoading ? onPress : undefined} flex={1}>
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
