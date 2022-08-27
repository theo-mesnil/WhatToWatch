import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { useGetTvShowSeason } from 'api/tvshow';
import { Box } from 'components/Box';
import { EpisodeThumb } from 'components/EpisodeThumb';
import { Header } from 'components/Header';

const Separator = () => <Box py="sm" />;
const Footer = () => <Box pb="xl" />;

export function SeasonScreen() {
  const route = useRoute();
  const [season, setSeason] = useState('loading');
  const { seasonNumber, seasonTitle, tvID, tvShowTitle } = route?.params;
  const getTvShowSeason = useGetTvShowSeason(tvID, seasonNumber);

  useEffect(() => {
    getTvShowSeason(setSeason);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ index, item }) => (
    <EpisodeThumb mt={index === 0 && 110} {...item} />
  );

  return (
    <>
      <Header
        withCrossIcon
        opacity={1}
        title={seasonTitle}
        subtitle={tvShowTitle}
      />
      <Box px="lg">
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={season}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.episode}_${index}`}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={Footer}
        />
      </Box>
    </>
  );
}
