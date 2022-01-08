const primary100 = '#adb8ef';
const primary500 = '#2742C4';

const colors = {
  primary100,
  primary300: '#2D52FF',
  primary500,
  dark400: '#383D49',
  dark600: '#22252C',
  dark700: '#17191E',
  dark800: '#121418',
  dark900: '#010101',
  light400: '#AFB1B6',
  light600: '#C3C4C8',
  light700: '#D7D8DA',
  light800: '#EBEBEC',
  light900: '#FFFFFF',
  yellow: '#FFDB00',
  genres: {
    default: [primary500, primary100],
    // action adventure
    10759: ['#6400b6', '#00a308'],
    // adventure
    12: ['#00a308', '#54ff5d'],
    // action
    28: ['#6400b6', '#b254ff'],
    // animation
    16: ['#fcc009', '#fdcf43'],
    // comedy
    35: ['#09bffc', '#6ad8fd'],
    // crime
    80: ['#c60022', '#ff294e'],
    // documentary
    99: ['#179f7b', '#1dcc9e'],
    // drama
    18: ['#fb61e2', '#fdb9f2'],
    // family
    10751: ['#0022c6', '#294eff'],
    // fantasy
    14: ['#eece01', '#fee12c'],
    // history
    36: ['#ed4e00', '#ff7c3c'],
    // horror
    27: ['#ef233c', '#f2485c'],
    // kids
    10762: ['#66cc00', '#8dff1c'],
    // mystery
    9648: ['#80503e', '#a86951'],
    // music
    10402: ['#66cc00', '#8dff1c'],
    // news
    10763: ['#708b97', '#9cafb7'],
    // reality
    10764: ['#7251b5', '#a06cd5'],
    // romance
    10749: ['#c60085', '#ff29b9'],
    // soap
    10766: ['#c60085', '#ff29b9'],
    // sci
    878: ['#6ead8f', '#a0c9b5'],
    // sci & fantasy
    10765: ['#6ead8f', '#fee12c'],
    // talk
    10767: ['#004e98', '#006cd3'],
    // thriller
    53: ['#003e1f', '#006533'],
    // tv movie
    10770: ['#004e98', '#006cd3'],
    // war
    10752: ['#a4931e', '#d6c027'],
    // war & politics
    10768: ['#a4931e', '#d6c027'],
    // western
    37: ['#fe4e00', '#ff763a']
  }
};

export const coreTheme = {
  colors: {
    ...colors,
    behind: colors.dark800,
    behindRgba: 'rgba(18, 20, 24, 1)',
    behindOpacityRgba: 'rgba(18, 20, 24, 0.5)',
    ahead: colors.dark700,
    border: colors.dark600,
    opacity: 'rgba(1, 1, 1, 0.2)',
    thumbBackground: colors.dark600
  },
  fontSizes: {
    h1: 20,
    h2: 16,
    h3: 12,
    h4: 10,
    subtitle1: 12,
    subtitle2: 11,
    subtitle3: 9,
    link: 12,
    text: 13
  },
  fontWeights: {
    h1: 'bold',
    h2: 'bold',
    h3: 'bold',
    h4: 'bold',
    subtitle1: 'regular',
    subtitle2: 'regular',
    subtitle3: 'regular',
    link: 'regular',
    text: 'regular'
  },
  fontColors: {
    subtitle1: colors.light400,
    subtitle2: colors.light400,
    subtitle3: colors.light400
  },
  space: {
    xxs: 3,
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
    xxl: 50
  },
  radii: {
    md: 4
  }
};
