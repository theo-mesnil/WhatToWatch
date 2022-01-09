import React from 'react';

import { Text } from 'components/Text';

export function InformationCompanies({ companies }) {
  return companies?.map((company, index) => {
    return (
      <Text key={company?.name}>
        {company?.name}
        {index < companies?.length - 1 && ', '}
      </Text>
    );
  });
}
