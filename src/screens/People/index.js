import React, { useState } from 'react';
import { format } from 'date-fns';
import { ImageBackground } from 'react-native';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { FormattedMessage } from 'react-intl';

import { MoviesList } from './MoviesList';
import { TvShowsList } from './TvShowsList';
import { ListLoader } from './ListLoader';

import { blurRadius } from 'constants/styles';
import { Box } from 'components/Box';
import { Centered } from 'components/Centered';
import { ContentLayout } from 'layouts/Content';
import { getImageUrl } from 'utils/images';
import { Gradient } from 'components/Gradient';
import { ImageThumb } from 'components/ImageThumb';
import { List } from 'components/List';
import { Loader } from 'components/Loader';
import { MoreLessText } from 'components/MoreLessText';
import { ScreenSection } from 'components/ScreenSection';
import { Text } from 'components/Text';
import {
  useGetPeople,
  useGetPeopleCredits,
  useGetPeopleImages,
  useGetPeopleKnowFor
} from 'api/people';
import { MovieThumb } from 'components/MovieThumb';
import { TvShowThumb } from 'components/TvShowThumb';
import { Touchable } from 'components/Touchable';
import { useDateFnsLocale } from 'utils/dates';
import { NoCover } from 'components/NoCover';
import { PeopleFillIcon } from 'components/Icon';

const avatarSize = 150;

export function PeopleScreen() {
  const [titleOffset, setTitleOffset] = useState();
  const [people, setPeople] = useState({
    name: 'loading',
    biography: 'loading',
    birthday: 'loading',
    profilePicture: 'loading',
    department: 'loading'
  });
  const [images, setImages] = useState('loading');
  const [knowFor, setKnowFor] = useState('loading');
  const [credits, setCredits] = useState({
    movies: 'loading',
    tvShows: 'loading'
  });
  const navigation = useNavigation();
  const route = useRoute();
  const dateFnsLocale = useDateFnsLocale();
  const peopleID = route?.params?.id || 10966;
  const getPeople = useGetPeople(peopleID);
  const getImages = useGetPeopleImages(peopleID);
  const getCredits = useGetPeopleCredits(peopleID);
  const getKnowFor = useGetPeopleKnowFor(peopleID);
  const {
    biography,
    birthday,
    deathday,
    department,
    name,
    placeOfBirth,
    profilePicture
  } = people;
  const { movies, tvShows } = credits;
  const nameIsLoading = name === 'loading';
  const departmentIsLoading = department === 'loading';
  const birthdayIsLoading = birthday === 'loading';
  const imagesIsLoading = images === 'loading';
  const profilePictureUri = getImageUrl(profilePicture);

  useEffect(() => {
    getPeople(setPeople);
    getImages(setImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!department && !departmentIsLoading) {
      getKnowFor(setKnowFor, department);
      setTimeout(() => getCredits(setCredits, department), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  function knowForItem({ item, ...rest }) {
    const isMovie = item.media_type === 'movie';

    if (isMovie) {
      return <MovieThumb item={item} {...rest} />;
    }

    return <TvShowThumb item={item} {...rest} />;
  }

  return (
    <ContentLayout
      title={name}
      titleOffset={titleOffset}
      titleOffsetSubtraction={0}
    >
      <Box
        as={ImageBackground}
        width={1}
        source={{ uri: profilePictureUri }}
        blurRadius={blurRadius}
      >
        <Gradient
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          colors={['transparent', 'behind']}
        />
        <Gradient
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          colors={['transparent', 'behind']}
        />
        <Centered alignItems="center" pb="md" mt="xxl">
          <Touchable
            onPress={
              !imagesIsLoading && images?.length > 0
                ? () => {
                    navigation.push('Images', {
                      title: name,
                      images
                    });
                  }
                : undefined
            }
          >
            <Box
              as={ImageBackground}
              width={avatarSize}
              height={avatarSize}
              borderRadius={avatarSize / 2}
              overflow="hidden"
              source={{ uri: profilePictureUri }}
              backgroundColor="dark700"
            >
              {profilePicture === 'loading' && <Loader height="100%" />}
              {profilePicture !== 'loading' && !profilePictureUri && (
                <NoCover icon={PeopleFillIcon} opacity={0.7} />
              )}
            </Box>
          </Touchable>
          {nameIsLoading && <Loader mt="sm" width={200} height={30} />}
          {!nameIsLoading && !!name && (
            <Text
              mt="sm"
              variant="h1"
              numberOfLines={1}
              onLayout={({
                nativeEvent: {
                  layout: { y }
                }
              }) => setTitleOffset(y)}
            >
              {name}
            </Text>
          )}
          {departmentIsLoading && <Loader mt="xs" width={200} height={12} />}
          {!departmentIsLoading && !!department && (
            <Text mt="xs" variant="subtitle1" numberOfLines={1}>
              {department}
            </Text>
          )}
        </Centered>
      </Box>
      {(!!biography || !!birthday || !!placeOfBirth || !!deathday) && (
        <ScreenSection>
          <Centered>
            {birthdayIsLoading && <Loader height={10} width={0.7} />}
            {!birthdayIsLoading && !!birthday && (
              <Text mb={!!biography && 'sm'} variant="subtitle1">
                <FormattedMessage
                  id="people.born"
                  values={{
                    date: format(new Date(birthday), 'PPP', {
                      locale: dateFnsLocale
                    })
                  }}
                />
                {!!placeOfBirth && (
                  <FormattedMessage
                    id="people.placeOfBirth"
                    values={{
                      place: placeOfBirth
                    }}
                  />
                )}
                {!!deathday && (
                  <FormattedMessage
                    id="people.die"
                    values={{
                      date: format(new Date(deathday), 'PPP', {
                        locale: dateFnsLocale
                      })
                    }}
                  />
                )}
              </Text>
            )}
            {!!biography && (
              <MoreLessText maxWidth="90%" numberOfLines={5}>
                {biography}
              </MoreLessText>
            )}
          </Centered>
        </ScreenSection>
      )}
      {(!!images || !!knowFor) && (
        <ScreenSection>
          {!!knowFor && (
            <List
              data={knowFor === 'loading' ? undefined : knowFor}
              keyName="knowFor"
              title={<FormattedMessage id="people.knowFor" />}
              itemPerPage={4}
              onPress={({ id, mediaType }) =>
                navigation.push(mediaType === 'movie' ? 'Movie' : 'TvShow', {
                  id
                })
              }
              listItem={knowForItem}
            />
          )}
          {!!images && images?.length > 1 && (
            <List
              data={images === 'loading' ? undefined : images}
              keyName="images"
              title={<FormattedMessage id="people.images" />}
              mt={!!knowFor && 'lg'}
              itemPerPage={5}
              onPress={({ index }) =>
                navigation.push('Images', {
                  title: name,
                  images,
                  startAt: index
                })
              }
              listItem={ImageThumb}
            />
          )}
        </ScreenSection>
      )}
      {!!movies && (
        <ScreenSection>
          <Centered>
            <Text numberOfLines={1} variant="h2" mb="xs">
              <FormattedMessage id="common.movies" />
            </Text>
            {movies === 'loading' ? (
              <ListLoader />
            ) : (
              <MoviesList movies={movies} />
            )}
          </Centered>
        </ScreenSection>
      )}
      {!!tvShows && (
        <ScreenSection>
          <Centered>
            {tvShows === 'loading' ? (
              <ListLoader />
            ) : (
              <TvShowsList tvShows={tvShows} />
            )}
          </Centered>
        </ScreenSection>
      )}
    </ContentLayout>
  );
}
