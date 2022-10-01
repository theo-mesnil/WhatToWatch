import { useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { useGetTvShowSeason } from 'api/tvshow';
import { Box } from 'components/Box';
import { EpisodeThumb } from 'components/EpisodeThumb';

const Separator = () => <Box py="sm" />;
const Footer = () => <Box pb="xl" />;

export function SeasonScreen() {
  const route = useRoute<RootStackScreenProps<'Season'>['route']>();
  const [season, setSeason] = useState<any[] | 'loading'>('loading');
  const { seasonNumber, tvID } = route?.params;
  const getTvShowSeason = useGetTvShowSeason(tvID, seasonNumber);

  useEffect(() => {
    getTvShowSeason({ callback: setSeason });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ index, item }) => (
    <EpisodeThumb mt={index === 0 && 80} {...item} />
  );

  return (
    <>
      <Box px="lg">
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={season === 'loading' ? undefined : season}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.episode}_${index}`}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={Footer}
        />
      </Box>
    </>
  );
}
