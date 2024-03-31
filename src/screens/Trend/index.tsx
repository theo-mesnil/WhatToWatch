import { useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';
import { useIntl } from 'react-intl';

import { useGetPopular } from 'api/popular';
import { useGetTrending } from 'api/trending';
import { Header } from 'components/Header';
import { RenderItemList } from 'components/RenderItemList';
import { VerticalList } from 'components/VerticalList';
import { useHandlePressItemList } from 'utils/lists';
import { useGetTrendTitle } from 'utils/trends';

export function TrendScreen() {
  const { formatMessage } = useIntl();
  const route = useRoute<RootStackScreenProps<'Trend'>['route']>();
  const getTrendTitle = useGetTrendTitle();
  const getTrending = useGetTrending();
  const getPopular = useGetPopular();
  const type = route?.params?.type;
  const handlePressItemList = useHandlePressItemList(type);
  const isPeople = type === 'person';

  function renderItem(props) {
    return <RenderItemList data={props} type={type} />;
  }

  return (
    <>
      <Header
        opacity={1}
        position="relative"
        subtitle={formatMessage({ id: 'common.trends' })}
        title={getTrendTitle(type)}
      />
      <VerticalList
        getApi={isPeople ? getPopular : getTrending}
        renderItem={renderItem}
        type={type}
        onPress={handlePressItemList}
      />
    </>
  );
}
