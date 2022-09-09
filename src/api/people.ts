import * as React from 'react';

import { errorLog } from 'utils/logger';

import { GetApi, Params, useApiUrl } from './api';

type PeopleCredit = {
  id: string;
  job?: string;
  character?: string;
};

type PeopleCredits = { [key: string]: PeopleCredit[] };

export const useGetPeople = (peopleID: number) => {
  const apiUrl = useApiUrl();

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: `person/${peopleID}`, params })
        );

        const dataResponse = await response.json();
        const {
          biography,
          birthday,
          deathday,
          known_for_department,
          name,
          place_of_birth,
          profile_path
        } = dataResponse;

        const data = {
          profilePicture: profile_path,
          name,
          department: known_for_department,
          birthday,
          deathday,
          biography,
          placeOfBirth: place_of_birth
        };

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, peopleID]
  );

  return handleData;
};

export const useGetPeopleImages = (peopleID: number) => {
  const apiUrl = useApiUrl();
  let imagesFormatted = React.useMemo(() => [], []);

  const handleData = React.useCallback(
    async ({ callback, params }: Omit<GetApi, 'type'>) => {
      try {
        const response = await fetch(
          apiUrl({ query: `person/${peopleID}/images`, params })
        );

        const dataResponse = await response.json();
        const { profiles } = dataResponse;

        profiles?.map((profile) =>
          imagesFormatted.push({
            aspectRatio: profile?.aspect_ratio,
            source: profile.file_path
          })
        );

        const data = imagesFormatted.length > 0 ? imagesFormatted : undefined;

        callback(data);
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, imagesFormatted, peopleID]
  );

  return handleData;
};

type GetPeople = {
  callback: (data: any) => void;
  department: string;
  params?: Params;
};

export const useGetPeopleKnowFor = (peopleID: number) => {
  const apiUrl = useApiUrl();

  function returnForArray(array) {
    return array?.length > 0 ? array?.splice(0, 15) : undefined;
  }

  const handleData = React.useCallback(
    async ({ callback, department, params }: GetPeople) => {
      const isAnActing = department === 'Acting';
      let dataSorted = {};

      try {
        const response = await fetch(
          apiUrl({ query: `person/${peopleID}/combined_credits`, params })
        );
        const dataResponse = await response.json();
        const { cast, crew } = dataResponse;

        if (isAnActing) {
          dataSorted = cast
            ?.filter((item) => !!item?.backdrop_path)
            .sort(function (a, b) {
              return b.popularity - a.popularity;
            });
        } else {
          dataSorted = crew
            ?.filter((item) => item?.department === department)
            .sort(function (a, b) {
              return b.popularity - a.popularity;
            });
        }

        callback(returnForArray(dataSorted));
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, peopleID]
  );

  return handleData;
};

export const useGetPeopleCredits = (peopleID: number) => {
  const apiUrl = useApiUrl();

  function removeDuplicate(entries: PeopleCredits) {
    let values = {};

    if (Object.entries(entries).length === 0) {
      return undefined;
    }

    Object.entries(entries)?.map(
      ([key, value]) =>
        (values[`${key}`] = value.reduce((previous, current) => {
          const equal = previous.find((item) => item.id === current.id);
          if (!equal) {
            return previous.concat([current]);
          } else {
            if (current.job) {
              previous[previous?.length - 1].job = `${
                previous[previous?.length - 1].job
              } & ${current.job}`;
            }
            if (current.character) {
              previous[previous?.length - 1].character = `${
                previous[previous?.length - 1].character
              } & ${current.character}`;
            }
            return previous;
          }
        }, []))
    );

    return values;
  }

  const handleData = React.useCallback(
    async ({ callback, department, params }: GetPeople) => {
      const isAnActing = department === 'Acting';

      try {
        const response = await fetch(
          apiUrl({ query: `person/${peopleID}/combined_credits`, params })
        );
        const dataResponse = await response.json();
        const { cast, crew } = dataResponse;

        // Data sorted by year
        const data = isAnActing ? cast : crew;
        const dataFormatted = data?.reduce(
          (acc, value) => {
            if (value.media_type === 'movie') {
              if (value.release_date) {
                const year = value.release_date.substring(0, 4);
                if (acc.movies[`${year}`]) {
                  acc.movies[`${year}`].push(value);
                } else {
                  acc.movies[`${year}`] = [{ ...value }];
                }
              } else {
                if (acc.movies.noDate) {
                  acc.movies.noDate.push(value);
                } else {
                  acc.movies.noDate = [{ ...value }];
                }
              }
            }
            if (value.media_type === 'tv') {
              if (value.first_air_date) {
                const year = value.first_air_date.substring(0, 4);
                if (acc.tvShows[`${year}`]) {
                  acc.tvShows[`${year}`].push(value);
                } else {
                  acc.tvShows[`${year}`] = [{ ...value }];
                }
              } else {
                if (acc.tvShows.noDate) {
                  acc.tvShows.noDate.push(value);
                } else {
                  acc.tvShows.noDate = [{ ...value }];
                }
              }
            }
            return acc;
          },
          { movies: {}, tvShows: {} }
        );

        callback({
          movies: removeDuplicate(dataFormatted.movies),
          tvShows: removeDuplicate(dataFormatted.tvShows)
        });
      } catch (error) {
        errorLog(error);
      }
    },
    [apiUrl, peopleID]
  );

  return handleData;
};
