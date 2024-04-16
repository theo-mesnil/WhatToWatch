import type { Href } from 'expo-router';
import { Link } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Gradient } from 'components/Gradient';
import { Icon } from 'components/Icon';
import { Touchable } from 'components/Touchable';
import { getNetworkColor, getNetworkLogo } from 'utils/networks';

export type NetworkThumbProps = {
  aspectRatio?: number;
  href?: Href<string>;
  isRounded?: boolean;
  item: {
    id: number;
  };
};

export const NetworkThumb = ({
  aspectRatio = 1 / 1,
  href,
  isRounded,
  item
}: NetworkThumbProps) => {
  const styles = useStyles();

  return (
    <Link href={href} asChild>
      <Touchable>
        <View style={[styles.wrapper, isRounded ? styles.rounded : undefined]}>
          <Gradient
            colors={getNetworkColor(isRounded ? undefined : item?.id)}
            angle={-0.4}
          />
          <View
            style={{
              ...styles.icon,
              aspectRatio
            }}
          >
            <Icon size="80%" icon={getNetworkLogo(item?.id)} />
          </View>
        </View>
      </Touchable>
    </Link>
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
