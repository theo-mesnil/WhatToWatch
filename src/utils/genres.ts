import type { LinearGradientProps } from 'expo-linear-gradient';

export const genresColor: { [key: number]: LinearGradientProps['colors'] } = {
  // action adventure
  10759: ['#00b109', '#03a8e1'],
  // adventure
  12: ['#005e05', '#00b109'],
  // action
  28: ['#8000e9', '#8b4cbf'],
  // animation
  16: ['#c89703', '#d3ab35'],
  // comedy
  35: ['#02749b', '#03a8e1'],
  // crime
  80: ['#9e001b', '#e40027'],
  // documentary
  99: ['#127f62', '#1bbf93'],
  // drama
  18: ['#a4617e', '#b68198'],
  // family
  10751: ['#002BFE', '#3255fe'],
  // fantasy
  14: ['#988401', '#bea501'],
  // history
  36: ['#be3e00', '#fe5300'],
  // horror
  27: ['#cc0f26', '#ef263f'],
  // kids
  10762: ['#428200', '#69ce00'],
  // mystery
  9648: ['#A84927', '#b96d52'],
  // music
  10402: ['#428200', '#69ce00'],
  // news
  10763: ['#59707a', '#758f9a'],
  // reality
  10764: ['#5a3f93', '#7657b7'],
  // romance
  10749: ['#e3147a', '#e84294'],
  // soap
  10766: ['#e3147a', '#e84294'],
  // sci
  878: ['#529173', '#6ead8f'],
  // sci & fantasy
  10765: ['#529173', '#988401'],
  // talk
  10767: ['#004e98', '#006cd3'],
  // thriller
  53: ['#006533', '#32835b'],
  // tv movie
  10770: ['#004e98', '#006cd3'],
  // war
  10752: ['#a4931e', '#d6c027'],
  // war & politics
  10768: ['#a4931e', '#d6c027'],
  // western
  37: ['#cb3e00', '#ff5409']
};
