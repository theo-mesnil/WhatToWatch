import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Animated, Platform } from 'react-native';

import { ArrowBackIcon, CrossIcon, Icon } from 'components/Icon';
import { Touchable } from 'components/Touchable';
import { statusBarHeight } from 'constants/statusBar';

import { Box, BoxProps } from '../Box';
import { Text } from '../Text';

import * as S from './styles';

export const headerHeight =
  Platform.select({
    android: 56,
    default: 44
  }) + statusBarHeight;

type BackButtonProps = {
  withCrossIcon?: boolean;
};

const BackButton = ({ withCrossIcon }: BackButtonProps) => {
  const navigation = useNavigation();

  return (
    <Box mr="sm">
      <Touchable onPress={() => navigation.goBack()}>
        <Icon size={25} icon={withCrossIcon ? CrossIcon : ArrowBackIcon} />
      </Touchable>
    </Box>
  );
};

type HeaderProps = Omit<BoxProps, 'opacity'> & {
  subtitle?: string | React.ReactElement;
  title: string | React.ReactElement;
  withCrossIcon?: boolean;
  opacity?: number | Animated.Value;
};

export function Header({
  opacity,
  subtitle,
  title,
  withCrossIcon,
  ...rest
}: HeaderProps) {
  return (
    <Box
      height={headerHeight}
      position="absolute"
      top="0"
      width={1}
      zIndex={1}
      {...rest}
    >
      <S.Block headerHeight={headerHeight} statusBarHeight={statusBarHeight}>
        <BackButton withCrossIcon={withCrossIcon} />
      </S.Block>
      <S.Block
        headerHeight={headerHeight}
        statusBarHeight={statusBarHeight}
        backgroundColor="behind"
        borderBottomWidth="1px"
        borderBottomColor="border"
        style={{ opacity }}
      >
        <BackButton withCrossIcon={withCrossIcon} />
        <Box flex={1}>
          <Text variant="h2" numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text mt={-3} variant="subtitle2" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </Box>
      </S.Block>
    </Box>
  );
}
