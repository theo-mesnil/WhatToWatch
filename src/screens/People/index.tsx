import { useNavigation, useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import { RootStackScreenProps } from 'navigation/types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  useGetPeople,
  useGetPeopleCredits,
  useGetPeopleImages,
  useGetPeopleKnowFor
} from 'api/people';
import { Centered } from 'components/Centered';
import { Gradient } from 'components/Gradient';
import { PeopleFillIcon } from 'components/Icon';
import { ImageBackground } from 'components/ImageBackground';
import { ImageThumb } from 'components/ImageThumb';
import { List } from 'components/List';
import { Loader } from 'components/Loader';
import { MoreLessText } from 'components/MoreLessText';
import { MovieThumb } from 'components/MovieThumb';
import { NoCover } from 'components/NoCover';
import { ScreenSection } from 'components/ScreenSection';
import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';
import { TvShowThumb } from 'components/TvShowThumb';
import { isAndroid } from 'constants/screen';
import { ContentLayout } from 'layouts/Content';
import { useDateFnsLocale } from 'utils/dates';
import { getImageUrl } from 'utils/images';

import { ListLoader } from './ListLoader';
import { Movies, MoviesList } from './MoviesList';
import { TvShows, TvShowsList } from './TvShowsList';

const avatarSize = 150;

export function PeopleScreen() {
  const [titleOffset, setTitleOffset] = useState(0);
  const [people, setPeople] = useState({
    name: 'loading',
    biography: 'loading',
    birthday: 'loading',
    profilePicture: 'loading',
    department: 'loading',
    placeOfBirth: undefined,
    deathday: undefined
  });
  const [images, setImages] = useState<Images | 'loading'>('loading');
  const [knowFor, setKnowFor] = useState('loading');
  const [credits, setCredits] = useState<{
    movies: Movies | 'loading';
    tvShows: TvShows | 'loading';
  }>({
    movies: 'loading',
    tvShows: 'loading'
  });
  const navigation =
    useNavigation<
      RootStackScreenProps<'Movie' | 'TvShow' | 'Images'>['navigation']
    >();
  const route = useRoute<RootStackScreenProps<'People'>['route']>();
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
  const withImages = !imagesIsLoading && images?.length > 0;
  const profilePictureUri = getImageUrl(profilePicture);
  const blurRadius = isAndroid ? 3 : 7;

  useEffect(() => {
    getPeople({ callback: setPeople });
    getImages({ callback: setImages });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!department && !departmentIsLoading) {
      getKnowFor({ callback: setKnowFor, department });
      setTimeout(() => getCredits({ callback: setCredits, department }), 500);
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

  function handleImageClick() {
    if (withImages) {
      navigation.push('Images', {
        name,
        images
      });
    }
  }

  return (
    <ContentLayout titleOffset={titleOffset} titleOffsetSubtraction={0}>
      <ImageBackground
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
          <Touchable onPress={handleImageClick}>
            <ImageBackground
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
            </ImageBackground>
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
      </ImageBackground>
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
              onPress={({ id, name: mediaName, type }) => {
                if (withImages) {
                  navigation.push(type === 'movie' ? 'Movie' : 'TvShow', {
                    id,
                    name: mediaName
                  });
                }
              }}
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
              onPress={({ index }) => {
                if (withImages) {
                  navigation.push('Images', {
                    name,
                    images,
                    startAt: index
                  });
                }
              }}
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
