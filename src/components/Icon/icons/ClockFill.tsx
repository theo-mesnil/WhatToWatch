import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4 11h-4a1 1 0 01-1-1V8a1 1 0 012 0v3h3a1 1 0 010 2z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
