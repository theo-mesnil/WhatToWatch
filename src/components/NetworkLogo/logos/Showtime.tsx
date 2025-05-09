import * as React from 'react'
import { memo } from 'react'
import { View } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'
const SvgComponent = ({ color, ...props }: SvgProps) => (
  <View style={{ aspectRatio: 330 / 119 }}>
    <Svg fill="none" height="100%" viewBox="0 0 330 119" width="100%" {...props}>
      <Path
        d="M59.103 0a58.987 58.987 0 0 0-43.992 19.627C25.435 21.67 28.946 30.32 28.946 43.714H16.32c0-7.891-1.642-11.994-6.324-11.994A5.129 5.129 0 0 0 5.3 34.6c-.14.305-.274.613-.408.921-.39 1.12-.58 2.299-.565 3.484 0 16.373 26.89 15.559 26.89 40.727 0 9.828-7.533 18.991-16.018 18.991 11.615 12.833 27.473 19.331 43.383 19.462 15.91.13 31.872-6.109 43.695-18.75-9.94-2.505-18.595-16.801-18.595-39.523 0-23.673 8.757-38.61 19.218-40.187C92.446 6.87 74.966.01 59.103 0Zm-22.73 21.305H49.9V52.58h14.632V21.305h13.521v77.623H64.532v-33.63H49.934v33.63h-13.56V21.305Zm71.494 11.213c-6.942 0-10.745 13.078-10.745 26.139 0 13.772 3.619 27.083 10.745 27.083 5.928 0 10.335-12.64 10.335-26.647 0-6.378-2.083-26.575-10.335-26.575ZM.002 58.014C-.12 75.147 5.181 86.567 11.687 86.567c3.776 0 6.456-3.324 6.456-8.15.008-10.009-8.765-11.936-18.14-20.403Z"
        fill={color}
      />
      <Path
        clipRule="evenodd"
        d="M137.009 97.885h12.089l6.787-47.825h.212l6.575 47.825h12.513l9.862-75.502h-9.862l-5.409 44.325h-.212l-6.044-44.325h-12.407l-6.575 44.325h-.212l-4.878-44.325h-12.513l10.074 75.502Z"
        fill={color}
        fillRule="evenodd"
      />
      <Path
        clipRule="evenodd"
        d="M195.229 97.885h13.785V34.047h12.626V22.383h-38.288v11.664h11.877v63.838Z"
        fill={color}
        fillRule="evenodd"
      />
      <Path
        clipRule="evenodd"
        d="M221.64 97.885h13.786V22.383H221.64v75.502ZM242.2 97.885h10.18V42.53h.212l9.226 55.354h7.635l9.331-55.354h.212v55.354h12.301V22.383h-17.921l-6.468 38.705h-.212l-6.151-38.705H242.2v75.502ZM298.081 97.885H330V86.22h-18.133V65.648h12.831v-12.3h-12.831v-19.3h17.391V22.383h-31.177v75.502Z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  </View>
)
const Memo = memo(SvgComponent)
export default Memo
