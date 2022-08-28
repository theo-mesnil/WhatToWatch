import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 50 50" {...props}>
      <Path d="M30.608 33.46h3.97V17h-3.97v16.46zm-6.994-4.683c0 .587-.476 1.063-1.063 1.063h-2.308c-.59 0-1.065-.476-1.065-1.063v-6.641H15.21v6.972c0 2.85 1.823 4.351 4.518 4.351h3.886v-.02c2.483 0 3.97-1.767 3.97-4.33v-6.973h-3.97v6.64zM46 22.136v6.64c0 .588-.476 1.064-1.062 1.064H42.63a1.063 1.063 0 01-1.063-1.063v-6.641h-3.97v6.972c0 2.85 1.823 4.351 4.519 4.351H46v-.02c2.483 0 3.969-1.767 3.969-4.33v-6.973H46zm-38.146 0H5.31c-.894 0-1.341.24-1.341.24V17H0v16.46h3.969v-6.642c0-.588.476-1.064 1.063-1.064h2.31c.587 0 1.062.476 1.062 1.064v6.641h3.97v-7.156c0-3.009-2.007-4.167-4.52-4.167z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
