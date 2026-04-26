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
