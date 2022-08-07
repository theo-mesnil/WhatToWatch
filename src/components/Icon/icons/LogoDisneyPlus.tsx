import React from 'react';
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 50 50" {...props}>
      <Path d="M37.577 26.958c.123.052.066.572-.032.825-.101.252-.816 1.49-.816 1.49s-.446.835-.32 1.495c.842-1.295 2.756-3.906 3.943-3.083.398.285.582.906.582 1.574 0 .587-.141 1.211-.403 1.68-.446.777-1.706 2.407-3.38 2.023-.552 1.34-1.016 2.696-1.282 4.724 0 0-.058.395-.386.258-.325-.114-.86-.654-.968-1.4-.116-.982.32-2.64 1.213-4.542-.26-.423-.437-1.028-.285-1.889l.003-.024c.036-.203.335-1.678 1.827-3.016 0 0 .192-.166.304-.115zm-29.804-5.49c.822.249 1.897.665 2.684 1.044.564.273 1.454.773 1.954 1.1l.135.095c.309.22.97.707 1.088.807.3.244.69.595.974.876.547.543 1.229 1.375 1.56 2.036.08.158.141.313.244.497.035.063.186.438.212.547.024.107.061.265.066.271.007.058.077.38.072.505.032.296-.044.856-.057.93-.024.17-.152.562-.174.61a6.967 6.967 0 01-.314.63 5.21 5.21 0 01-.888 1.089c-.974.842-2.481 1.32-3.774 1.479a9.617 9.617 0 01-2.816-.082c-.32-.058-.796-.168-.796-.168v.054c-.001.067-.004.181-.014.27a1.348 1.348 0 01-.08.274c-.067.14-.178.212-.34.243-.194.036-.4.048-.58-.029-.296-.124-.402-.4-.454-.72-.041-.254-.085-.698-.085-.698s-.221-.104-.405-.196a10.487 10.487 0 01-1.575-.965c-.13-.097-.69-.566-.814-.683-.347-.329-.658-.656-.896-1.076-.184-.328-.237-.62-.097-.967.194-.485.888-.85 1.364-1.058.35-.154 1.434-.508 1.885-.574.213-.03.544-.09.564-.103a.13.13 0 00.02-.019 7.37 7.37 0 00.024-.67c-.004-.172.128-1.305.17-1.545.023-.13.12-.628.221-.76.066-.088.182-.08.276-.023.517.322.674 1.437.713 2.004.023.346.034.866.034.866s.24-.007.51-.01h.232c.076 0 .15.001.216.003.355.008.746.064 1.114.123.471.075 1.39.276 1.916.543.434.22.84.59.971.982.123.36.104.608-.082.933-.21.366-.605.638-1.006.661-.12.007-.57-.053-.708-.16-.054-.043-.051-.12-.012-.172a4.08 4.08 0 01.349-.195.804.804 0 00.162-.115c.103-.09.196-.19.186-.307-.015-.152-.175-.246-.329-.306-.72-.286-2.155-.523-2.85-.564-.27-.016-.657-.03-.657-.03l.081 3.832s.32.061.572.102c.144.022.756.077.919.081 1.238.033 2.62-.078 3.757-.615.499-.234.957-.527 1.303-.922a2.68 2.68 0 00.633-1.99c-.07-.817-.645-1.787-1.104-2.378-1.214-1.561-3.295-2.846-5.126-3.598-1.869-.769-3.716-1.21-5.7-1.284-.511-.02-1.626.006-2.19.162-.08.023-.161.05-.236.067a.658.658 0 00-.178.074c-.014.012-.028.027-.028.027s.035.02.068.034c.024.01.079.019.144.027l.207.025c.033.004.064.008.09.013.117.022.238.083.286.168.045.081.05.145-.004.213-.127.155-.608.129-.82.095-.22-.035-.493-.102-.544-.293-.058-.226.05-.447.165-.651.232-.41.566-.622 1.053-.755a10.72 10.72 0 012.222-.35c1.481-.055 2.883.204 4.317.64zm26.82 5.68s.5-.048.932.817c0 0 .21.35-.147.433-.693.16-2.517.25-2.517.25l-.23.72s.911-.078 1.574-.01c0 0 .215-.024.24.245.01.25-.02.52-.02.52s-.015.162-.245.204c-.25.041-1.964.108-1.964.108l-.278.938s-.103.217.128.156c.094-.026.49-.104.927-.18l.377-.064c.437-.071.839-.124.941-.102.25.062.528.396.448.7-.096.378-1.888 1.521-2.98 1.442 0 0-.574.037-1.059-.738-.451-.737.171-2.134.171-2.134s-.285-.652-.078-.874c0 0 .123-.111.482-.137l.44-.909s-.501.035-.8-.333c-.276-.35-.3-.51-.087-.607.227-.112 2.312-.492 3.746-.444zm11.481-1.668c.11 0 .204.078.225.186.197 1.046.323 2.062.385 3.104h3.067a.25.25 0 01.25.25v.637a.25.25 0 01-.25.25h-3.026c.002.157.004.299.004.43 0 .938-.039 1.704-.128 2.564a.248.248 0 01-.247.224h-.656a.23.23 0 01-.17-.077.229.229 0 01-.06-.18c.093-.854.132-1.611.132-2.53l-.003-.431h-2.993a.25.25 0 01-.25-.25v-.637c0-.137.112-.249.25-.249h2.95a22.45 22.45 0 00-.39-3.043.209.209 0 01.203-.248zm-28.121 1.835a.513.513 0 01.087.025c.26.099.366.34.43.603.148.613.212 1.969.236 2.5.018.398.028.79.045 1.183.014.333.04.777-.029 1.09a.513.513 0 01-.208.309c-.123.079-.404.085-.558.053-.38-.079-.503-.323-.558-.699-.129-.897-.067-2.657.01-3.4.025-.245.117-1.031.245-1.36.044-.112.137-.336.3-.304zm6.885.16c.127.069.191.132.165.267-.053.254-.244.418-.476.49-.242.077-.745.107-.965.12-.988.056-2.183.027-3.124.284-.074.02-.201.055-.243.102-.147.16.274.205.364.223a.353.353 0 00.06.01l2.08.246.061.008c.45.062.893.143 1.231.294.314.139.498.314.666.627.256.474.273 1.138.042 1.64-.173.375-.551.689-.897.855a3.327 3.327 0 01-1.118.303 3.981 3.981 0 01-2.114-.378c-.377-.184-.838-.502-1.07-.91a.907.907 0 01.042-.975c.331-.454 1.042-.554 1.577-.535.408.016 1.142.142 1.53.28.107.038.503.193.572.263.049.05.08.121.058.187-.088.27-.746.414-.936.442-.508.078-.772-.114-1.35-.343a1.987 1.987 0 00-.481-.132c-.263-.025-.58.049-.63.335-.025.148.149.286.28.344.31.133.563.181.868.185.902.015 1.915-.133 2.652-.656.101-.072.2-.177.202-.31.003-.269-.468-.433-.468-.433-.497-.207-1.415-.308-1.887-.347-.497-.043-1.277-.107-1.465-.134a2.21 2.21 0 01-.57-.142.71.71 0 01-.38-.433c-.087-.339.023-.754.211-1.025.493-.708 1.647-.977 2.51-1.084.834-.104 2.183-.103 3.003.333zm3.721-1.14s.98.492 1.456 2.087c.473 1.596.155 3.036-.031 3.472-.184.432-.67.894-1.273.607-.595-.288-1.544-2.229-1.544-2.229s-.36-.724-.43-.705c0 0-.077-.141-.125.65-.05.787.01 2.323-.304 2.565-.298.242-.658.146-.845-.137-.17-.28-.24-.942-.148-2.107.109-1.166.38-2.408.726-2.794.346-.384.623-.105.732-.004 0 0 .462.419 1.225 1.65l.134.228s.694 1.163.766 1.16c0 0 .057.053.107.015.073-.02.043-.394.043-.394s-.143-1.267-.776-3.412c0 0-.095-.268-.03-.518.064-.254.317-.135.317-.135zM6.39 28.806s-.565.04-.955.083c-.495.054-1.426.214-1.963.406-.161.058-.489.195-.517.36-.03.172.077.307.195.446.069.08.457.454.566.544.456.381 1.38.968 2.061 1.253.234.097.622.236.622.236s-.02-.766-.024-1.649v-.358a55.035 55.035 0 01.015-1.32zm33.226.133c-.433.478-1.214 1.375-1.842 2.593.66-.074 1.296-.432 1.488-.614.313-.277 1.041-1.03.924-2.032 0 0-.067-.514-.57.053zm-19.733-6.935c.185.063.442.22.572.386.027.034.05.07.078.089.025.016.091.022.144.032.18.031.442.169.548.26.214.185.332.361.386.617.109.516-.188 1.081-.526 1.425-.58.593-1.15 1.009-1.891 1.299-.326.127-.832.246-1.201.212-.115-.01-.232-.04-.344-.047a1.575 1.575 0 01-.287-.073c-.028-.022-.064-.04-.07-.033-.05.053-.103.18-.157.273a.544.544 0 01-.12.138c-.126.093-.233.097-.354-.01a.865.865 0 01-.277-.612c-.003-.099.014-.208-.005-.292-.031-.141-.172-.286-.248-.421a1.654 1.654 0 01-.171-.615c-.03-.557.263-1.071.645-1.476.385-.41.888-.75 1.435-.982.517-.218 1.275-.367 1.843-.17zm.172 1.28c-.171.05-.249.08-.41.173-.476.276-1.15.867-1.515 1.338-.085.111-.17.236-.237.32-.042.053-.075.102-.07.115.014.053.513.048.702.035a3.237 3.237 0 001.36-.407c.415-.232 1.024-.684.961-1.215a.447.447 0 00-.274-.362c-.185-.08-.28-.068-.517.003zm-1.692-.166s-.189.02-.296.041c-.253.05-.625.297-.811.456-.307.263-.644.69-.491 1.069.022.053.056.125.056.125l.007-.01.05-.076c.06-.086.154-.223.238-.338a7.63 7.63 0 011.024-1.08c.102-.088.223-.187.223-.187zm7.962-12.313c4.287 0 8.413 1.275 11.932 3.687a21.09 21.09 0 017.643 9.483.23.23 0 01-.212.316h-.656a.288.288 0 01-.266-.177 20.04 20.04 0 00-7.253-8.805 19.9 19.9 0 00-11.188-3.42c-3.32 0-6.607.832-9.509 2.403a20.201 20.201 0 00-7.05 6.371.306.306 0 01-.353.12l-.55-.186a.253.253 0 01-.155-.156.247.247 0 01.029-.218 21.089 21.089 0 0117.588-9.418z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;