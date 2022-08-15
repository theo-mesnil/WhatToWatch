import * as React from 'react';
import { useRoute } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

import { Header } from 'components/Header';
import { VerticalList } from 'components/VerticalList';
import { useGetTrending } from 'api/trending';
import { getTrendTitle } from 'utils/trends';
import { useHandlePressItemList } from 'utils/lists';
import { RenderItemList } from 'components/RenderItemList';

export function TrendScreen() {
  const route = useRoute();
  const getTrending = useGetTrending();
  const type = route?.params?.type;
  const handlePressItemList = useHandlePressItemList(type);

  function renderItem(props) {
    return <RenderItemList data={props} type={type} />;
  }

  return (
    <>
      <Header
        offset={0}
        opacity={1}
        position="relative"
        subtitle={<FormattedMessage id="common.trends" />}
        title={getTrendTitle(type)}
      />
      <VerticalList
        getApi={getTrending}
        renderItem={renderItem}
        param={type === 'people' ? 'person' : type}
        onPress={handlePressItemList}
      />
    </>
  );
}
