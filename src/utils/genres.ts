import type { LinearGradientProps } from 'expo-linear-gradient'

export const getGenreBackgroundClassName = (genreId: number) => {
  switch (genreId) {
    // adventure
    case 12:
      return 'bg-genre-adventure'
    // fantasy
    case 14:
      return 'bg-genre-fantasy'
    // animation
    case 16:
      return 'bg-genre-animation'
    // drama
    case 18:
      return 'bg-genre-drama'
    // horror
    case 27:
      return 'bg-genre-horror'
    // action
    case 28:
      return 'bg-genre-action'
    // comedy
    case 35:
      return 'bg-genre-comedy'
    // history
    case 36:
      return 'bg-genre-history'
    // western
    case 37:
      return 'bg-genre-western'
    // thriller
    case 53:
      return 'bg-genre-thriller'
    // crime
    case 80:
      return 'bg-genre-crime'
    // documentary
    case 99:
      return 'bg-genre-documentary'
    // sci-fi
    case 878:
      return 'bg-genre-sci-fi'
    // mystery
    case 9648:
      return 'bg-genre-mystery'
    // music
    case 10402:
      return 'bg-genre-music'
    // romance
    case 10749:
      return 'bg-genre-romance'
    // family
    case 10751:
      return 'bg-genre-family'
    // war
    case 10752:
      return 'bg-genre-war'
    // action & adventure
    case 10759:
      return 'bg-genre-action-adventure'
    // kids
    case 10762:
      return 'bg-genre-kids'
    // news
    case 10763:
      return 'bg-genre-news'
    // reality
    case 10764:
      return 'bg-genre-reality'
    // sci-fi & fantasy
    case 10765:
      return 'bg-genre-sci-fi-fantasy'
    // soap
    case 10766:
      return 'bg-genre-soap'
    // talk
    case 10767:
      return 'bg-genre-talk'
    // war & politics
    case 10768:
      return 'bg-genre-war-politics'
    // tv movie
    case 10770:
      return 'bg-genre-tv-movie'
    default:
      return undefined
  }
}

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
