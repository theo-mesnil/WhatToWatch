export const getGenreBorderClassName = (genreId: number) => {
  switch (genreId) {
    // adventure
    case 12:
      return 'border-genre-adventure/60'
    // fantasy
    case 14:
      return 'border-genre-fantasy/60'
    // animation
    case 16:
      return 'border-genre-animation/60'
    // drama
    case 18:
      return 'border-genre-drama/60'
    // horror
    case 27:
      return 'border-genre-horror/60'
    // action
    case 28:
      return 'border-genre-action/60'
    // comedy
    case 35:
      return 'border-genre-comedy/60'
    // history
    case 36:
      return 'border-genre-history/60'
    // western
    case 37:
      return 'border-genre-western/60'
    // thriller
    case 53:
      return 'border-genre-thriller/60'
    // crime
    case 80:
      return 'border-genre-crime/60'
    // documentary
    case 99:
      return 'border-genre-documentary/60'
    // sci-fi
    case 878:
      return 'border-genre-sci-fi/60'
    // mystery
    case 9648:
      return 'border-genre-mystery/60'
    // music
    case 10402:
      return 'border-genre-music/60'
    // romance
    case 10749:
      return 'border-genre-romance/60'
    // family
    case 10751:
      return 'border-genre-family/60'
    // war
    case 10752:
      return 'border-genre-war/60'
    // action & adventure
    case 10759:
      return 'border-genre-action-adventure/60'
    // kids
    case 10762:
      return 'border-genre-kids/60'
    // news
    case 10763:
      return 'border-genre-news/60'
    // reality
    case 10764:
      return 'border-genre-reality/60'
    // sci-fi & fantasy
    case 10765:
      return 'border-genre-sci-fi-fantasy/60'
    // soap
    case 10766:
      return 'border-genre-soap/60'
    // talk
    case 10767:
      return 'border-genre-talk/60'
    // war & politics
    case 10768:
      return 'border-genre-war-politics/60'
    // tv movie
    case 10770:
      return 'border-genre-tv-movie/60'
    default:
      return undefined
  }
}
