import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'

function SvgTv({ color = 'currentColor', ...props }: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M6 20.25H18M10.5 17.25V20.25M13.5 17.25V20.25M3.375 17.25H20.625C21.2463 17.25 21.75 16.7463 21.75 16.125V4.875C21.75 4.25368 21.2463 3.75 20.625 3.75H3.375C2.75368 3.75 2.25 4.25368 2.25 4.875V16.125C2.25 16.7463 2.75368 17.25 3.375 17.25Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}
export default SvgTv
