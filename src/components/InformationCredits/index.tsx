import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';

type Credit = {
  name: string;
  job: string;
  id: string;
};

type InformationCreditsProps = {
  credits: Credit[];
};

export function InformationCredits({ credits }: InformationCreditsProps) {
  const navigation = useNavigation();

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
