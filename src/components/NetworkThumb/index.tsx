import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { Icon } from 'components/Icon';
import { getNetworkColor, getNetworkLogo } from 'utils/networks';

export type NetworkThumbProps = {
  aspectRatio?: number;
  id: number;
  isRounded?: boolean;
};

export const NetworkThumb = ({
  aspectRatio = 1 / 1,
  id,
  isRounded
}: NetworkThumbProps) => {
  const styles = useStyles();

  return (
    <View style={[styles.wrapper, isRounded ? styles.rounded : undefined]}>
      <Gradient
        colors={getNetworkColor(isRounded ? undefined : id)}
        angle={-0.4}
      />
      <View
        style={{
          ...styles.icon,
          aspectRatio
        }}
      >
        <Icon size="80%" icon={getNetworkLogo(id)} />
      </View>
    </View>
  );
};

function useStyles() {
  return StyleSheet.create({
    wrapper: {
      borderRadius: theme.radii.sm,
      overflow: 'hidden'
    },
    rounded: {
      borderRadius: 200
    },
    icon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
}
