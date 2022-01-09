import React from 'react';
import Svg, { Circle } from 'react-native-svg';

function SvgComponent({ color, size, ...props }) {
  return (
    <Svg height={size} fill={color} viewBox="0 0 24 24" width={size} {...props}>
      <Circle cx={12} cy={12} r={2} />
      <Circle cx={19} cy={12} r={2} />
      <Circle cx={5} cy={12} r={2} />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
