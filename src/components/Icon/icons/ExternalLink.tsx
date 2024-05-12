import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M20 11a1 1 0 00-1 1v6a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h6a1 1 0 000-2H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3v-6a1 1 0 00-1-1z" />
      <Path d="M16 5h1.58l-6.29 6.28a1 1 0 000 1.42 1 1 0 001.42 0L19 6.42V8a1 1 0 001 1 1 1 0 001-1V4a1 1 0 00-1-1h-4a1 1 0 000 2z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
