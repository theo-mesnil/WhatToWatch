import { useNavigation } from '@react-navigation/core';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';

import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';

type Credit = {
  name: string;
  job: string;
  id: number;
};

type InformationCreditsProps = {
  credits: Credit[];
};

export function InformationCredits({ credits }: InformationCreditsProps) {
  const navigation =
    useNavigation<RootStackScreenProps<'People'>['navigation']>();

  return credits?.map((credit, index) => {
    const navigateToPeople = () =>
      navigation.push('People', { id: credit?.id });

    return (
      <Touchable
        onPress={navigateToPeople}
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
