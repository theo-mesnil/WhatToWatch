import { View } from 'react-native';

import { List } from 'components/List';
import { Text } from 'components/Text';

export function InTheaters() {
  function renderItem() {
    return (
      <View>
        <Text>item</Text>
      </View>
    );
  }

  return (
    <List
      title="In Theaters"
      id="in-theaters"
      renderItem={renderItem}
      isLoading
    />
  );
}
