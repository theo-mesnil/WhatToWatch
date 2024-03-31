import { useNavigation } from '@react-navigation/core';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';
import { useIntl } from 'react-intl';

import { Box } from 'components/Box';
import { TvFillIcon } from 'components/Icon';
import { Image } from 'components/Image';
import { NoCover } from 'components/NoCover';
import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';
import { getImageUrl } from 'utils/images';

type TvShow = {
  character: string;
  id: number;
  job: string;
  name: string;
  poster_path?: string;
};

export type TvShows = {
  [key: number]: TvShow[];
};

type TvShowsListProps = {
  tvShows: TvShows;
};

export function TvShowsList({ tvShows }: TvShowsListProps) {
  const { formatMessage } = useIntl();
  const navigation =
    useNavigation<RootStackScreenProps<'TvShow'>['navigation']>();

  return (
    <>
      <Text numberOfLines={1} variant="h2" mb="xs">
        {formatMessage({ id: 'common.tvShows' })}
      </Text>
      <Box flexDirection="column-reverse">
        {Object.entries(tvShows)?.map(([key, value]) => (
          <Box mt="xxs" key={`tvShows_${key}`}>
            <>
              <Text weight="bold" color="light900" variant="subtitle1" mb="xs">
                {key === 'noDate'
                  ? formatMessage({ id: 'people.coming' })
                  : key}
              </Text>
              <Box height={1} mb="sm" width={1} backgroundColor="border" />
            </>
            {value.map((item, index) => {
              return (
                <Touchable
                  key={`tvShows_${key}_${index}`}
                  onPress={() =>
                    navigation.push('TvShow', {
                      id: item?.id,
                      name: item?.name
                    })
                  }
                >
                  <Box
                    borderRadius={4}
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
                        <NoCover withGradient icon={TvFillIcon} />
                      )}
                    </Box>
                    <Box py="sm" px="md" flex={1} justifyContent="center">
                      <Text numberOfLines={1}>{item?.name}</Text>
                      <Text numberOfLines={1} variant="subtitle1">
                        {item?.character
                          ? formatMessage(
                              {
                                id: 'people.as'
                              },
                              { character: item.character }
                            )
                          : item?.job}
                      </Text>
                    </Box>
                  </Box>
                </Touchable>
              );
            })}
          </Box>
        ))}
      </Box>
    </>
  );
}
