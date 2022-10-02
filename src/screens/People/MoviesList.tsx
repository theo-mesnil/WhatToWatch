import { useNavigation } from '@react-navigation/core';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { Box } from 'components/Box';
import { MovieFillIcon } from 'components/Icon';
import { Image } from 'components/Image';
import { NoCover } from 'components/NoCover';
import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';
import { getImageUrl } from 'utils/images';

type Movie = {
  id: number;
  poster_path?: string;
  title: string;
  character: string;
  job: string;
};

export type Movies = {
  [key: number]: Movie[];
};

type MoviesListProps = {
  movies: Movies;
};

export function MoviesList({ movies }: MoviesListProps) {
  const navigation =
    useNavigation<RootStackScreenProps<'Movie'>['navigation']>();

  return (
    <Box flexDirection="column-reverse">
      {Object.entries(movies)?.map(([key, value]) => (
        <Box mt="xxs" key={`movies_${key}`}>
          <>
            <Text weight="bold" color="light900" variant="subtitle1" mb="xs">
              {key === 'noDate' ? <FormattedMessage id="people.coming" /> : key}
            </Text>
            <Box height={1} mb="sm" width={1} backgroundColor="border" />
          </>
          {value.map((item, index) => {
            return (
              <Touchable
                key={`movies_${key}_${index}`}
                onPress={() =>
                  navigation.push('Movie', { id: item?.id, name: item?.title })
                }
              >
                <Box
                  borderRadius="md"
                  backgroundColor="thumbBackground"
                  mb="sm"
                  flexDirection="row"
                  overflow="hidden"
                >
                  <Box aspectRatio={3 / 4}>
                    <Image
                      source={{
                        uri: getImageUrl(item?.poster_path, 92)
                      }}
                      aspectRatio={3 / 4}
                    />
                    {!item?.poster_path && (
                      <NoCover withGradient icon={MovieFillIcon} />
                    )}
                  </Box>
                  <Box py="sm" px="md" flex={1} justifyContent="center">
                    <Text numberOfLines={1}>{item?.title}</Text>
                    <Text numberOfLines={1} variant="subtitle1">
                      {item?.character ? (
                        <FormattedMessage
                          id="people.as"
                          values={{ character: item.character }}
                        />
                      ) : (
                        item?.job
                      )}
                    </Text>
                  </Box>
                </Box>
              </Touchable>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
