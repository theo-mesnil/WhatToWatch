import * as React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';
import type { Color } from 'theme';

import { Text } from 'components/Text';
import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';

type ButtonProps = ViewProps & {
  backgroundColor?: Color;
  children: string | JSX.Element;
  isCustomChildren?: boolean;
  isRounded?: boolean;
  isTransparent?: boolean;
  onPress?: TouchableProps['onPress'];
};

export function Button({
  backgroundColor = 'brand-500',
  children,
  isCustomChildren,
  isRounded,
  isTransparent,
  onPress,
  style = {},
  ...rest
}: ButtonProps) {
  return (
    <Touchable onPress={onPress}>
      <View
        style={[
          styles.wrapper,
          isTransparent
            ? styles.transparent
            : { backgroundColor: theme.colors[backgroundColor] },
          isRounded ? styles.rounded : undefined,
          style
        ]}
        {...rest}
      >
        {isCustomChildren ? children : <Text>{children}</Text>}
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    height: 40,
    borderRadius: 25,
    paddingHorizontal: theme.space.md
  },
  rounded: {
    width: 40,
    alignItems: 'center'
  },
  transparent: {
    backgroundColor: 'transparent'
  }
});
