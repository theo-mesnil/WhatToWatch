export const getGenreBorderClassName = (genreId: number) => {
  switch (genreId) {
    // adventure
    case 12:
      return 'border-genre-adventure/40'
    // fantasy
    case 14:
      return 'border-genre-fantasy/40'
    // animation
    case 16:
      return 'border-genre-animation/40'
    // drama
    case 18:
      return 'border-genre-drama/40'
    // horror
    case 27:
      return 'border-genre-horror/40'
    // action
    case 28:
      return 'border-genre-action/40'
    // comedy
    case 35:
      return 'border-genre-comedy/40'
    // history
    case 36:
      return 'border-genre-history/40'
    // western
    case 37:
      return 'border-genre-western/40'
    // thriller
    case 53:
      return 'border-genre-thriller/40'
    // crime
    case 80:
      return 'border-genre-crime/40'
    // documentary
    case 99:
      return 'border-genre-documentary/40'
    // sci-fi
    case 878:
      return 'border-genre-sci-fi/40'
    // mystery
    case 9648:
      return 'border-genre-mystery/40'
    // music
    case 10402:
      return 'border-genre-music/40'
    // romance
    case 10749:
      return 'border-genre-romance/40'
    // family
    case 10751:
      return 'border-genre-family/40'
    // war
    case 10752:
      return 'border-genre-war/40'
    // action & adventure
    case 10759:
      return 'border-genre-action-adventure/40'
    // kids
    case 10762:
      return 'border-genre-kids/40'
    // news
    case 10763:
      return 'border-genre-news/40'
    // reality
    case 10764:
      return 'border-genre-reality/40'
    // sci-fi & fantasy
    case 10765:
      return 'border-genre-sci-fi-fantasy/40'
    // soap
    case 10766:
      return 'border-genre-soap/40'
    // talk
    case 10767:
      return 'border-genre-talk/40'
    // war & politics
    case 10768:
      return 'border-genre-war-politics/40'
    // tv movie
    case 10770:
      return 'border-genre-tv-movie/40'
    default:
      return undefined
  }
}
