import * as React from 'react';

import { Text } from 'components/Text';

type Company = {
  name: string;
};

type InformationCompaniesProps = {
  companies: Company[];
};

export function InformationCompanies({ companies }: InformationCompaniesProps) {
  return (
    <>
      {companies?.map((company, index) => (
        <Text key={company?.name}>
          {company?.name}
          {index < companies?.length - 1 && ', '}
        </Text>
      ))}
    </>
  );
}
