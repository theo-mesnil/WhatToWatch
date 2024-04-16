import { useNavigation } from 'expo-router';
import React from 'react';
import { Animated, View } from 'react-native';

import { Header } from 'components/Header';
import { Text } from 'components/Text';
import { BasicLayout } from 'layouts/Basic';
import type { HeaderOptions } from 'types/navigation';

export default function Search() {
  const [scrollYPosition] = React.useState(new Animated.Value(0));
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      header: ({ options: { title } }: HeaderOptions) => (
        <Header title={title} scrollY={scrollYPosition} />
      ),
      headerShown: true
    });
  }, [navigation, scrollYPosition]);

  return (
    <BasicLayout isView>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Tab Search</Text>
      </View>
    </BasicLayout>
  );
}
