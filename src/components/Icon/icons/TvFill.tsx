import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M18 6h-3.59l2.3-2.29a1 1 0 10-1.42-1.42L12 5.59l-3.29-3.3a1 1 0 10-1.42 1.42L9.59 6H6a3 3 0 00-3 3v10a3 3 0 003 3h12a3 3 0 003-3V9a3 3 0 00-3-3zm1 13a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1h12a1 1 0 011 1z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
