import * as React from 'react';

import { Loader } from 'components/Loader';

export function ListLoader() {
  return (
    <>
      <Loader mt="sm" height={10} />
      <Loader mt="sm" height={40} />
      <Loader mt="sm" height={40} />
      <Loader mt="md" height={10} />
      <Loader mt="sm" height={40} />
    </>
  );
}
