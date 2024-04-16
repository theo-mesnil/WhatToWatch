import * as React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';
import type { Color } from 'theme/colors';

import { Text } from 'components/Text';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';

type ButtonProps = ViewProps & {
  backgroundColor?: Color;
  children: string | JSX.Element;
  isCustomChildren?: boolean;
  isTransparent?: boolean;
  onPress?: TouchableProps['onPress'];
};

export function Button({
  backgroundColor = 'brand-500',
  children,
  isCustomChildren,
  isTransparent,
  onPress,
  style = {},
  ...rest
}: ButtonProps) {
  const styles = useStyles();

  return (
    <Touchable onPress={onPress}>
      <View
        style={[
          styles.wrapper,
          isTransparent ? styles.transparent : { backgroundColor },
          style
        ]}
        {...rest}
      >
        {isCustomChildren ? children : <Text>{children}</Text>}
      </View>
    </Touchable>
  );
}

function useStyles() {
  return StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      height: 40,
      borderRadius: 25,
      paddingHorizontal: theme.space.md
    },
    transparent: {
      backgroundColor: 'transparent'
    }
  });
}
