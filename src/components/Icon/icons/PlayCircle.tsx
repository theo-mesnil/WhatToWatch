import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M11.5 14.6l2.81-2.6-2.81-2.6v5.2z" />
      <Path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4 11.18l-3.64 3.37a1.74 1.74 0 01-1.16.45 1.68 1.68 0 01-.69-.15 1.6 1.6 0 01-1-1.48V8.63a1.6 1.6 0 011-1.48 1.7 1.7 0 011.85.3L16 10.82a1.6 1.6 0 010 2.36z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
