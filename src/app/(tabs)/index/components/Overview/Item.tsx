import { Link } from 'expo-router';
import { FormattedMessage } from 'react-intl';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { globalStyles } from 'styles';
import { theme } from 'theme';

import { useGetContentLogo } from 'api/logo';
import { Button } from 'components/Button';
import { Gradient } from 'components/Gradient';
import { ArrowNextIcon } from 'components/Icon';
import { Text } from 'components/Text';
import type { ContentType } from 'types/content';
import { getImageUrl } from 'utils/images';

export type ItemProps = {
  description?: string;
  id: number;
  imageUrl: string;
  title: string;
  type: ContentType;
};

export function Item({ description, id, imageUrl, title, type }: ItemProps) {
  const { data: logo, isLoading: isLoadingLogo } = useGetContentLogo({
    id,
    type
  });

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={{
          uri: getImageUrl(imageUrl, 'w1280')
        }}
        style={globalStyles.absoluteFill}
      />
      <View style={styles.content}>
        <Gradient colors={['transparent', theme.colors.behind]} />
        {!isLoadingLogo && logo && (
          <Image
            style={[styles.logo, { aspectRatio: logo.aspectRatio }]}
            src={getImageUrl(logo.url, 'w500')}
          />
        )}
        {!isLoadingLogo && !logo && (
          <Text style={styles.title} variant="h0">
            {title}
          </Text>
        )}
        <Text style={styles.subtitle} numberOfLines={3}>
          {description}
        </Text>
        <Link href={`${type}/${id}`} asChild>
          <Button
            style={styles.cta}
            variant="secondary"
            size="lg"
            icon={ArrowNextIcon}
          >
            <FormattedMessage defaultMessage="Discover" id="discover" />
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 600,
    justifyContent: 'flex-end'
  },
  content: {
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: theme.space.xxl
  },
  title: {
    textAlign: 'center'
  },
  subtitle: {
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: theme.space.sm
  },
  cta: {
    marginTop: theme.space.lg
  },
  logo: {
    width: 250,
    maxHeight: 150
  }
});
