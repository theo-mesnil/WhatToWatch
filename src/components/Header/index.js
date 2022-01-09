import React from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Box } from '../Box';
import { Text } from '../Text';

import { statusBarHeight } from 'constants/statusBar';
import { AnimatedBox } from 'components/AnimatedBox';
import { ArrowBackIcon, CrossIcon, Icon } from 'components/Icon';
import { Touchable } from 'components/Touchable';

export const headerHeight =
  Platform.select({
    android: 56,
    default: 44
  }) + statusBarHeight;

const styleWrapper = {
  position: 'absolute',
  alignItems: 'center',
  bottom: 0,
  flexDirection: 'row',
  height: headerHeight,
  left: 0,
  paddingLeft: 'lg',
  paddingRight: 'lg',
  paddingTop: statusBarHeight,
  right: '0',
  top: '0'
};

const BackButton = ({ withCrossIcon }) => {
  const navigation = useNavigation();

  return (
    <Box mr="sm">
      <Touchable onPress={() => navigation.goBack(null)}>
        <Icon size={25} icon={withCrossIcon ? CrossIcon : ArrowBackIcon} />
      </Touchable>
    </Box>
  );
};

export function Header({ opacity, subtitle, title, withCrossIcon, ...rest }) {
  return (
    <Box
      height={headerHeight}
      position="absolute"
      top="0"
      width={1}
      zIndex={1}
      {...rest}
    >
      <AnimatedBox {...styleWrapper}>
        <BackButton withCrossIcon={withCrossIcon} />
      </AnimatedBox>
      <AnimatedBox
        {...styleWrapper}
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
      </AnimatedBox>
    </Box>
  );
}
