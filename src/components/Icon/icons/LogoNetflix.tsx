import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 50 50" {...props}>
      <Path d="M6.883 30.636c-.753.132-1.52.172-2.312.277l-2.418-7.07v7.373c-.753.08-1.44.185-2.153.29V18h2.008l2.748 7.663V18h2.127v12.636zm4.189-7.689c.818 0 2.071-.04 2.823-.04v2.112c-.937 0-2.032 0-2.823.04v3.14c1.24-.08 2.48-.185 3.733-.225v2.032l-5.844.462V18h5.844v2.11h-3.733v2.837zm11.525-2.841h-2.19v9.686c-.713 0-1.426 0-2.112.026v-9.712h-2.191V18h6.493v2.106zm3.482 2.69h2.863v2.109h-2.863v4.783h-2.053V18h5.844v2.108H26.08v2.689zm7.206 5.021c1.204.027 2.42.119 3.598.184v2.077c-1.891-.118-3.783-.237-5.714-.276V18h2.116v9.817zm5.416 2.492c.675.04 1.39.08 2.078.159V18h-2.078v12.309zM50 18l-2.664 6.424L50 31.506c-.787-.105-1.575-.25-2.362-.382L46.13 27.22l-1.535 3.588c-.76-.133-1.495-.172-2.256-.278l2.702-6.186L42.6 18h2.257l1.377 3.548L47.704 18H50z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
