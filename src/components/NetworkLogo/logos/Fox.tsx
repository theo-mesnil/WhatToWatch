import * as React from 'react';
import { memo } from 'react';
import { View } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <View style={{ aspectRatio: 330 / 142 }}>
    <Svg
      height="100%"
      width="100%"
      fill="none"
      viewBox="0 0 330 142"
      {...props}
    >
      <Path
        fill={color}
        d="M40.198 38.73v18.457h38.914v38.636H39.91v45.761H0V0h85.336l2.578 38.724-47.716.005ZM326.092.195h-42.705L265.64 30.693 248.222.196h-44.215l39.548 68.19-41.946 73.085 42.952-.021 20.486-35.792 20.728 35.725H330l-42.694-73.46L326.092.196ZM86.882 70.967c0-37.89 30.242-68.762 67.635-68.762s67.547 30.873 67.547 68.824c0 37.951-30.349 68.809-67.547 68.809-37.197 0-67.634-30.822-67.634-68.87Zm79.665 28.272V42.675c-.134-6.614-5.414-11.972-12.03-12.22a12.07 12.07 0 0 0-8.185 3.806 12.047 12.047 0 0 0-3.251 8.414v56.41a11.588 11.588 0 0 0 3.305 8.201 11.604 11.604 0 0 0 8.131 3.487 11.862 11.862 0 0 0 8.386-3.299 11.845 11.845 0 0 0 3.644-8.235Z"
      />
    </Svg>
  </View>
);
const Memo = memo(SvgComponent);
export default Memo;
