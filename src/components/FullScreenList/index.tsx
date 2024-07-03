import { useNavigation } from 'expo-router';
import type { ListRenderItemInfo } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import type { UseGetMovieImagesApiResponse } from 'api/movie';
import type { UseGetPersonImagesApiResponse } from 'api/person';
import type { UseGetTvImagesApiResponse } from 'api/tv';
import { Button } from 'components/Button';
import { CrossIcon, Icon } from 'components/Icon';
import { List } from 'components/List';
import { Thumb } from 'components/Thumb';
import type { ContentType } from 'types/content';

type Images =
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetMovieImagesApiResponse['backdrops']
  | UseGetTvImagesApiResponse['backdrops']
  | UseGetTvImagesApiResponse['backdrops']
  | UseGetPersonImagesApiResponse['profiles'];

export type FullScreenImagesProps = {
  images: Images;
  isLoading?: boolean;
  type: ContentType;
};

export default function FullScreenImages({
  images,
  isLoading,
  type
}: FullScreenImagesProps) {
  const navigation = useNavigation();

  const renderItem = ({
    item: { aspect_ratio, file_path }
  }: ListRenderItemInfo<Images[number]>) => (
    <Thumb
      aspectRatio={aspect_ratio}
      type={type}
      imageUrl={file_path}
      imageWidth="w780"
    />
  );

  return (
    <View style={styles.wrapper}>
      <Button
        isCustomChildren
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Icon icon={CrossIcon} />
      </Button>
      <View style={styles.list}>
        <List
          numberOfItems={1}
          isLoading={isLoading}
          id="images"
          renderItem={renderItem}
          results={images}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.behind },
  list: {
    width: '100%',
    alignSelf: 'center',
    height: '80%',
    marginTop: '10%',
    justifyContent: 'center'
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    paddingHorizontal: 0,
    backgroundColor: theme.colors['default-600'],
    position: 'absolute',
    right: 15,
    top: 15
  }
});
