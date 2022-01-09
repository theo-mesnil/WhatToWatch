import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image } from 'react-native';
import { FormattedMessage } from 'react-intl';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';
import { getImageUrl } from 'utils/images';
import { MovieFillIcon } from 'components/Icon';
import { NoCover } from 'components/NoCover';

export function MoviesList({ movies }) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="column-reverse">
      {Object.entries(movies)?.map(([key, value]) => (
        <Box mt="xxs" key={`movies_${key}`}>
          <>
            <Text
              fontWeight="bold"
              color="light900"
              variant="subtitle1"
              mb="xs"
            >
              {key === 'noDate' ? <FormattedMessage id="people.coming" /> : key}
            </Text>
            <Box height={1} mb="sm" width={1} backgroundColor="border" />
          </>
          {value.map((item, index) => {
            return (
              <Touchable
                key={`movies_${key}_${index}`}
                onPress={() => navigation.push('Movie', { id: item?.id })}
              >
                <Box
                  borderRadius="md"
                  backgroundColor="thumbBackground"
                  mb="sm"
                  flexDirection="row"
                  overflow="hidden"
                >
                  <Box aspectRatio={3 / 4}>
                    <Box
                      as={Image}
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
