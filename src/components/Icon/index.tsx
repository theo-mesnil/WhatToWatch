import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import { theme } from 'theme';
import type { Color } from 'theme';

import { Text } from 'components/Text';

import * as Icons from './icons';

export type Name = keyof typeof Icons;

export type IconProps = {
  color?: Color;
  name: Name;
  size?: SvgProps['width'];
};

const Icon: React.FC<IconProps> = ({ color = 'white', name, size = 24 }) => {
  if (!name) {
    return <Text>Missing name</Text>;
  }

  const Component = Icons[name];

  if (Component) {
    return <Component color={theme.colors[color]} width={size} height={size} />;
  }

  return <Text>Icon not exist</Text>;
};

export { Icon };
