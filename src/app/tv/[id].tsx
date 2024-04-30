import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';

import { useGetTv } from 'api/tv';
import { Text } from 'components/Text';
import { ContentLayout } from 'layouts/Content';

export default function Tv() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const tvID = Number(params?.id);

  const [{ data, isLoading }, { data: images, isLoading: isLoadingImages }] =
    useGetTv({ id: tvID });

  const logoUrl = images?.logos?.[0]?.file_path;
  const logoAspectRatio = images?.logos?.[0]?.aspect_ratio;
  const backdropPath = data?.backdrop_path;
  const title = data?.name;
  const genres = data?.genres
    ?.slice(0, 2)
    .map((genre) => genre.name)
    .flat()
    .join(' - ');

  React.useEffect(() => {
    navigation.setOptions({
      presentation: 'modal'
    });
  }, [navigation]);

  return (
    <ContentLayout
      isLoading={isLoading || isLoadingImages}
      imageUrl={backdropPath}
      title={title}
      subtitle={genres}
      logo={
        logoUrl
          ? {
              url: logoUrl,
              aspectRatio: logoAspectRatio
            }
          : undefined
      }
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mauris
        nulla, condimentum sed tellus vel, molestie facilisis purus. Mauris
        vitae lectus risus. Pellentesque cursus ante nulla, varius accumsan
        massa tincidunt ac. Praesent ac elit tristique, maximus velit ut,
        vestibulum nulla. Morbi molestie maximus nulla, at consequat neque
        tristique eget. Suspendisse eget erat ut dolor porta lobortis. Interdum
        et malesuada fames ac ante ipsum primis in faucibus. Donec rutrum ligula
        eu elit volutpat, feugiat tincidunt felis tristique. Cras a aliquam
        magna. Aliquam ultricies dui eu pharetra scelerisque. Mauris tempor
        ullamcorper nulla ac accumsan. Curabitur ligula ante, rutrum vitae velit
        eget, tincidunt semper libero. In vulputate pulvinar lorem, eleifend
        pretium nisl iaculis sed. Donec eleifend nibh ac felis dignissim
        ullamcorper. Fusce in vestibulum quam. Suspendisse non magna quis ipsum
        vulputate euismod eget hendrerit elit. Sed nec enim vulputate urna
        vestibulum pretium eget eget felis. Sed ornare accumsan porta. Vivamus
        ut congue augue. Proin at ligula egestas leo condimentum fringilla.
        Suspendisse scelerisque posuere purus ac fringilla. Nulla facilisi.
        Praesent varius ipsum at odio lobortis, vitae ultrices purus interdum.
        Suspendisse eros nunc, elementum ut bibendum id, tempus eget purus.
        Integer pulvinar ipsum eu tellus posuere venenatis. Nulla eleifend quam
        velit, euismod feugiat tortor sollicitudin eget. Vivamus blandit, justo
        eget tincidunt convallis, orci mi viverra risus, id laoreet mauris eros
        sit amet enim. Proin feugiat, nulla ut ultrices vestibulum, turpis lorem
        fermentum nunc, vel pulvinar elit ipsum vehicula ex. Phasellus semper
        libero erat, ac eleifend mauris ornare ut. Morbi auctor in tortor in
        finibus. Vivamus convallis, massa eget consectetur consequat, ipsum est
        ultricies tortor, eget posuere quam sapien in eros. Nam accumsan ex a ex
        ultrices lobortis. Duis placerat feugiat est, quis pretium dolor
        ullamcorper quis. Cras eget placerat turpis, ut cursus mi. Suspendisse
        tempor sollicitudin enim eu interdum. Donec porttitor vehicula orci.
      </Text>
    </ContentLayout>
  );
}
