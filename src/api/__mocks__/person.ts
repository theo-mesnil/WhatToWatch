import type { UseGetPerson } from '~/api/person'

export const MOCK_PERSON: UseGetPerson['data'] = {
  biography:
    "Daniel Jacob Radcliffe (born July 23, 1989) is an English actor. He rose to fame at age twelve, when he began portraying Harry Potter in the film series of the same name; and has held various other film and theatre roles. Over his career, Radcliffe has received various awards and nominations. Radcliffe made his acting debut at age 10 in the BBC One television film David Copperfield (1999), followed by his feature film debut in The Tailor of Panama (2001). The same year, he starred as Harry Potter in the film adaptation of the J.K. Rowling fantasy novel, Harry Potter and the Philosopher's Stone. Over the next decade, he played the eponymous role in seven sequels, culminating with Harry Potter and the Deathly Hallows – Part 2 (2011). During this period, he became one of the world's highest-paid actors and gained worldwide fame, popularity, and critical acclaim. Following the success of Harry Potter, Radcliffe starred in the romantic comedy What If? (2013), and played the lawyer Arthur Kipps in the horror film The Woman in Black (2012), poet Allen Ginsberg in the drama film Kill Your Darlings (2013), Igor in the science-fiction horror film Victor Frankenstein (2015), a sentient corpse in the comedy-drama film Swiss Army Man (2016), technological prodigy Walter Mabry in the heist thriller film Now You See Me 2 (2016), and FBI agent Nate Foster in the critically acclaimed thriller film Imperium (2016). Since 2019, he has starred in the TBS anthology series Miracle Workers. In 2022, he starred in the action comedy The Lost City and portrayed Weird Al Yankovic in Weird: The Al Yankovic Story. Radcliffe branched out to stage acting in 2007, starring in the West End and Broadway productions of Equus. From 2011 to 2012 he portrayed J. Pierrepont Finch in the Broadway revival of the musical How to Succeed in Business Without Really Trying. He continued in Martin McDonagh's dark comedy The Cripple of Inishmaan (2013-2014) in the West End and Broadway and a revival of Tom Stoppard's play Rosencrantz and Guildenstern Are Dead (2017) at The Old Vic. He also starred in the satirical plays Privacy (2016) and The Lifespan of a Fact (2018), respectively off and on Broadway. In 2022 starred in the New York Theatre Workshop revival of Stephen Sondheim's Merrily We Roll Along.",
  birthday: '1989-07-23',
  coverUrl: '/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg',
  deathday: undefined,
  department: 'Acting',
  name: 'Daniel Radcliffe',
  placeOfBirth: 'Hammersmith, London, England, UK',
}

export const MOCK_PERSON_MOVIES = [
  {
    adult: false,
    backdrop_path: '/hziiv14OpD73u9gAak4XDDfBKa2.jpg',
    character: 'Harry Potter',
    credit_id: '52fe4267c3a36847f801be91',
    genre_ids: [12, 14],
    id: 671,
    order: 0,
    original_language: 'en',
    original_title: "Harry Potter and the Philosopher's Stone",
    overview:
      "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.",
    popularity: 183.788,
    poster_path: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
    release_date: '2001-11-16',
    title: "Harry Potter and the Philosopher's Stone",
    video: false,
    vote_average: 7.914,
    vote_count: 26930,
  },
]

export const MOCK_PERSON_TV = [
  {
    adult: false,
    backdrop_path: '/nABc2EP7CQWaODt8sJXmMfGs4v4.jpg',
    character: 'Self - Guest',
    credit_id: '525716a4760ee3776a149fe2',
    episode_count: 2,
    first_air_date: '2001-11-02',
    genre_ids: [35, 10767],
    id: 1834,
    name: 'Friday Night with Jonathan Ross',
    origin_country: ['GB'],
    original_language: 'en',
    original_name: 'Friday Night with Jonathan Ross',
    overview:
      "Jonathan Ross's take on current topics of conversation, guest interviews and live music from both a guest music group and the house band.",
    popularity: 35.232,
    poster_path: '/dweqcAMlpidmoJcLu4omwuwsnef.jpg',
    vote_average: 5.8,
    vote_count: 22,
  },
]
