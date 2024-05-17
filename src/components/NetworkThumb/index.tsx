import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { NetworkLogo } from 'components/NetworkLogo';
import type { NetworkId } from 'types/content';
import { getNetworkColor } from 'utils/networks';

export type NetworkThumbProps = {
  aspectRatio?: number;
  id: NetworkId;
  isRounded?: boolean;
};

export const NetworkThumb = ({
  aspectRatio = 2 / 3,
  id,
  isRounded
}: NetworkThumbProps) => {
  return (
    <View style={[styles.wrapper, isRounded ? styles.rounded : undefined]}>
      <Gradient colors={getNetworkColor(isRounded ? undefined : id)} />
      <View
        style={[
          styles.icon,
          {
            aspectRatio
          }
        ]}
      >
        <NetworkLogo id={id} width="80%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.sm,
    overflow: 'hidden'
  },
  rounded: {
    borderRadius: 200
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
