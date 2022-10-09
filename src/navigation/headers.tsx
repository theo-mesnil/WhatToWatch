import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Box } from 'components/Box';
import { CrossIcon, Icon } from 'components/Icon';
import { Touchable } from 'components/Touchable';
import { isAndroid } from 'constants/screen';

export const modalHeaderOptions = ({ navigation, route, theme }) => {
  return {
    headerShown: true,
    headerLeft: () => null,
    headerRight: () => (
      <Touchable onPress={() => navigation.goBack()}>
        <Box mr="sm" backgroundColor="dark900" borderRadius={30}>
          <Icon size={30} icon={CrossIcon} />
        </Box>
      </Touchable>
    ),
    title: route.params.name,
    headerTintColor: theme.colors.light900,
    headerTransparent: true,
    headerBackground: () =>
      isAndroid ? (
        <Box backgroundColor="behind" width="100%" height="100%" />
      ) : (
        <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
      )
  };
};

export const tabBarHeaderOptions = ({ theme }) => {
  return {
    headerShown: true,
    headerLeft: () => null,
    headerRight: () => null,
    headerTintColor: theme.colors.light900,
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerBackground: () =>
      isAndroid ? (
        <Box backgroundColor="behind" width="100%" height="100%" />
      ) : (
        <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
      )
  };
};
