import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M12 7a5 5 0 00-3 9v4a2 2 0 002 2h2a2 2 0 002-2v-4a5 5 0 00-3-9zm1.5 7.59a1 1 0 00-.5.87V20h-2v-4.54a1 1 0 00-.5-.87A3 3 0 019 12a3 3 0 016 0 3 3 0 01-1.5 2.59zM12 6a1 1 0 001-1V3a1 1 0 00-2 0v2a1 1 0 001 1zM21 11h-2a1 1 0 000 2h2a1 1 0 000-2zM5 11H3a1 1 0 000 2h2a1 1 0 000-2zM7.66 6.42L6.22 5a1 1 0 00-1.39 1.47l1.44 1.39a1 1 0 00.73.28 1 1 0 00.72-.31 1 1 0 00-.06-1.41zM19.19 5.05a1 1 0 00-1.41 0l-1.44 1.37a1 1 0 000 1.41 1 1 0 00.72.31 1 1 0 00.69-.28l1.44-1.39a1 1 0 000-1.42z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
