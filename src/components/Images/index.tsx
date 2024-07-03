import { FormattedMessage } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import type { UseGetMovieImagesApiResponse } from 'api/movie';
import type { UseGetPersonImagesApiResponse } from 'api/person';
import { ListTitle } from 'components/ListTitle';
import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import { ThumbLink } from 'components/ThumbLink';
import type { ContentType } from 'types/content';

export type ImagesProps = {
  backdrops?: UseGetMovieImagesApiResponse['backdrops'];
  id: number;
  isLoading: boolean;
  posters?: UseGetMovieImagesApiResponse['posters'];
  profiles?: UseGetPersonImagesApiResponse['profiles'];
  type: ContentType;
};

export function Images({
  backdrops,
  id,
  isLoading,
  posters,
  profiles,
  type
}: ImagesProps) {
  if (
    isLoading ||
    (backdrops?.length > 0 && posters?.length > 0) ||
    profiles.length > 0
  ) {
    return (
      <View>
        <ListTitle>
          <FormattedMessage id="images" defaultMessage="Images" />
        </ListTitle>
        <View style={styles.images}>
          {profiles?.length > 0 && (
            <View style={styles.profiles}>
              <ThumbLink href={`${type}/images/${id}`}>
                <>
                  <Thumb
                    aspectRatio={16 / 9}
                    height="100%"
                    isLoading={isLoading}
                    type="person"
                    imageUrl={profiles?.[0]?.file_path}
                    imageWidth="w780"
                  />
                  <View style={[globalStyles.absoluteFill, styles.content]}>
                    <View style={styles.overlay} />
                    <Text style={styles.title} variant="h3">
                      <FormattedMessage
                        id="pictures"
                        defaultMessage="Pictures"
                      />
                    </Text>
                  </View>
                </>
              </ThumbLink>
            </View>
          )}
          {backdrops?.length > 0 && (
            <View style={styles.backdrops}>
              <ThumbLink href={`${type}/images/${id}/backdrops`}>
                <>
                  <Thumb
                    aspectRatio={backdrops?.[0]?.aspect_ratio}
                    height="100%"
                    isLoading={isLoading}
                    type="movie"
                    imageUrl={backdrops?.[0]?.file_path}
                    imageWidth="w780"
                  />
                  <View style={[globalStyles.absoluteFill, styles.content]}>
                    <View style={styles.overlay} />
                    <Text style={styles.title} variant="h3">
                      <FormattedMessage
                        id="backdrops"
                        defaultMessage="Backdrops"
                      />
                    </Text>
                  </View>
                </>
              </ThumbLink>
            </View>
          )}
          {posters?.length > 0 && (
            <View style={styles.posters}>
              <ThumbLink href={`${type}/images/${id}/posters`}>
                <>
                  <Thumb
                    aspectRatio={posters?.[0]?.aspect_ratio}
                    height="100%"
                    isLoading={isLoading}
                    type="movie"
                    imageUrl={posters?.[0]?.file_path}
                    imageWidth="w780"
                  />
                  <View style={[globalStyles.absoluteFill, styles.content]}>
                    <View style={styles.overlay} />
                    <Text style={styles.title} variant="h3">
                      <FormattedMessage id="posters" defaultMessage="Posters" />
                    </Text>
                  </View>
                </>
              </ThumbLink>
            </View>
          )}
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    gap: theme.space.lg,
    aspectRatio: 16 / 9
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radii.md
  },
  overlay: {
    backgroundColor: theme.colors.behind,
    opacity: 0.5,
    ...globalStyles.absoluteFill
  },
  title: {
    backgroundColor: theme.colors['brand-800'],
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.sm,
    borderRadius: 100,
    textAlign: 'center'
  },
  profiles: {
    height: '100%',
    borderRadius: theme.space.md,
    overflow: 'hidden'
  },
  backdrops: {
    height: '100%',
    width: '60%',
    borderRadius: theme.space.md,
    overflow: 'hidden'
  },
  posters: {
    height: '100%',
    flex: 1,
    borderRadius: theme.space.md,
    overflow: 'hidden'
  }
});
