import * as React from 'react';
import type { DimensionValue } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { Gradient } from 'components/Gradient';
import type { IconElement } from 'components/Icon';
import { Icon } from 'components/Icon';
import { globalStyles } from 'styles';
import { theme } from 'theme';

type NoCoverProps = {
  icon: IconElement;
  opacity?: number;
  size?: DimensionValue;
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
        <Icon icon={icon} size={size} />
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
