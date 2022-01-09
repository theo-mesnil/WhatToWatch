import React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, size, ...props }) {
  return (
    <Svg height={size} fill={color} viewBox="0 0 24 24" width={size} {...props}>
      <Path d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
