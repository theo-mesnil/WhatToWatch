import type { LinearGradientProps } from 'expo-linear-gradient'

export const genresColor: { [key: number]: LinearGradientProps['colors'] } = {
  // adventure
  12: ['#005e05', '#00b109'],
  // fantasy
  14: ['#988401', '#bea501'],
  // animation
  16: ['#c89703', '#d3ab35'],
  // drama
  18: ['#a4617e', '#b68198'],
  // horror
  27: ['#cc0f26', '#ef263f'],
  // action
  28: ['#8000e9', '#8b4cbf'],
  // comedy
  35: ['#02749b', '#03a8e1'],
  // history
  36: ['#be3e00', '#fe5300'],
  // western
  37: ['#cb3e00', '#ff5409'],
  // thriller
  53: ['#006533', '#32835b'],
  // crime
  80: ['#9e001b', '#e40027'],
  // documentary
  99: ['#127f62', '#1bbf93'],
  // sci
  878: ['#529173', '#6ead8f'],
  // mystery
  9648: ['#A84927', '#b96d52'],
  // music
  10402: ['#428200', '#69ce00'],
  // romance
  10749: ['#e3147a', '#e84294'],
  // family
  10751: ['#002BFE', '#3255fe'],
  // war
  10752: ['#a4931e', '#d6c027'],
  // action adventure
  10759: ['#00b109', '#03a8e1'],
  // kids
  10762: ['#428200', '#69ce00'],
  // news
  10763: ['#59707a', '#758f9a'],
  // reality
  10764: ['#5a3f93', '#7657b7'],
  // sci & fantasy
  10765: ['#529173', '#988401'],
  // soap
  10766: ['#e3147a', '#e84294'],
  // talk
  10767: ['#004e98', '#006cd3'],
  // war & politics
  10768: ['#a4931e', '#d6c027'],
  // tv movie
  10770: ['#004e98', '#006cd3'],
}
