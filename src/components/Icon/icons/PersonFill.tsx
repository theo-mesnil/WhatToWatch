import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPersonFill = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <G data-name="Layer 2">
      <G data-name="person">
        <Path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4M18 21a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z" />
      </G>
    </G>
  </Svg>
);
export default SvgPersonFill;
