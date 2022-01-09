import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';

export function InformationCredits({ credits }) {
  const navigation = useNavigation();

  return credits?.map((credit, index) => {
    return (
      <Touchable
        onPress={() => navigation.push('People', { id: credit?.id })}
        key={`${credit?.name}_${credit?.job}`}
      >
        <Text>
          {credit?.name}
          {index < credits?.length - 1 && ', '}
        </Text>
      </Touchable>
    );
  });
}
