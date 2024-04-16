import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M11 3a8 8 0 018 8 7.92 7.92 0 01-1.454 4.583l3.228 3.229a1.5 1.5 0 11-2.12 2.121l-3.26-3.257A7.92 7.92 0 0111 19a8 8 0 110-16zm0 3a5 5 0 100 10 5 5 0 000-10z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
