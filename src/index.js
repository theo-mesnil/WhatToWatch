import { registerRootComponent } from 'expo';
import React from 'react';
import { Text, View } from 'react-native';

class App extends React.Component {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>coco</Text>
      </View>
    );
  }
}

registerRootComponent(App);
