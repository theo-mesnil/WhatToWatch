import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import type { IconProps } from 'components/Icon';
import { Icon } from 'components/Icon';

type NoCoverProps = {
  icon: IconProps['name'];
  opacity?: number;
  size?: IconProps['size'];
  withGradient?: boolean;
};

export function NoCover({
  icon,
  opacity = 0.3,
  size = '60%',
  withGradient
}: NoCoverProps) {
  return (
    <>
      <View style={[styles.wrapper, globalStyles.absoluteFill, { opacity }]}>
        <Icon name={icon} size={size} />
      </View>
      {withGradient && <Gradient style={{ opacity }} />}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.ahead,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
