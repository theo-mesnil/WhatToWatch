import { FormattedDate } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';
import type { ContentType } from 'types/content';

export type ItemThumbProps = {
  date?: string;
  isLoading?: boolean;
  overview?: string;
  posterUrl: string;
  subtitle?: string;
  title: string;
  type: ContentType;
};

export function ItemThumb({
  date,
  overview,
  posterUrl,
  subtitle,
  title,
  type
}: ItemThumbProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.thumb}>
        <Thumb type={type} imageUrl={posterUrl} />
      </View>
      <View style={styles.content}>
        <View style={styles.infos}>
          <Text variant="h3">{title}</Text>
          {subtitle && (
            <Text variant="h3" style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
          {date && (
            <Text>
              <FormattedDate value={new Date(date)} />
            </Text>
          )}
        </View>
        {overview && (
          <Text style={styles.overview} numberOfLines={4}>
            {overview}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: theme.space.md
  },
  thumb: {
    width: 100
  },
  subtitle: {
    color: theme.colors.text
  },
  content: {
    flex: 1
  },
  infos: {
    gap: theme.space.xxs
  },
  overview: {
    marginTop: theme.space.md
  }
});
