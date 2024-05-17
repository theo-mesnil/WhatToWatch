import * as React from 'react';
import { memo } from 'react';
import { View } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <View style={{ aspectRatio: 330 / 136 }}>
    <Svg
      height="100%"
      width="100%"
      fill="none"
      viewBox="0 0 330 136"
      {...props}
    >
      <Path
        fill={color}
        d="M96.826 135.205h-36.13V83.51H37.243v51.695H0V1.969h37.243v49.563h23.453V1.968h36.13v133.236ZM262.348 94.268c14.661 0 26.546-11.912 26.546-26.611 0-14.695-11.885-26.61-26.546-26.61-14.662 0-26.546 11.915-26.546 26.61 0 14.699 11.884 26.611 26.546 26.611ZM228.58 67.657c0-18.694 15.117-33.85 33.768-33.85s33.771 15.156 33.771 33.85c0 18.697-15.12 33.852-33.771 33.852-18.651 0-33.768-15.156-33.768-33.852Zm-47.022 0c4.178-.53 11.144-5.32 13.598-8.376-.863 3.79-.929 14.76.079 18.55-2.8-4.322-9.431-9.642-13.677-10.174ZM157.281 31.82c5.307 0 9.486 5.25 9.486 11.236 0 5.984-4.179 11.239-9.486 11.239h-18.24V31.82h18.24Zm-.067 49.932c5.306 0 9.486 5.254 9.486 11.237 0 5.985-4.18 11.237-9.486 11.237h-18.24V81.753h18.24Zm105.112 54.108c37.167-.014 67.412-30.969 67.404-68.23C329.723 29.584 299.493.028 262.326 0c-37.123-.027-56.092 27.366-60.779 38.422.044-16.598-16.276-36.189-35.366-36.21h-61.505V135.2l57.344.011c23.119 0 39.571-20.081 39.599-37.3 5.277 10.837 23.584 37.964 60.707 37.951Z"
      />
    </Svg>
  </View>
);
const Memo = memo(SvgComponent);
export default Memo;