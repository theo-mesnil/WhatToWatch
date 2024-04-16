import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M10.46 18a2.23 2.23 0 01-.91-.2 1.76 1.76 0 01-1.05-1.59V7.79A1.76 1.76 0 019.55 6.2a2.1 2.1 0 012.21.26l5.1 4.21a1.7 1.7 0 010 2.66l-5.1 4.21a2.06 2.06 0 01-1.3.46z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
