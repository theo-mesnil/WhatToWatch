import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { NetworkThumb } from 'components/NetworkThumb';
import { VerticalList } from 'components/VerticalList';
import { networksList } from 'constants/networks';
import { useHeaderHeights } from 'constants/statusBar';
import { BasicLayout } from 'layouts/Basic';

export function NetworksScreen() {
  const navigation = useNavigation();
  const { headerHeight } = useHeaderHeights();

  function renderItem(props) {
    return <NetworkThumb {...props} isSquare />;
  }

  return (
    <BasicLayout>
      <VerticalList
        contentContainerStyle={{ paddingTop: headerHeight }}
        resultsData={networksList}
        renderItem={renderItem}
        onPress={({ id }) => navigation.navigate('Network', { id })}
      />
    </BasicLayout>
  );
}
