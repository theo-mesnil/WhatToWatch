import { Link } from 'expo-router';
import * as React from 'react';

import { Touchable } from 'components/Touchable';

export type ThumbLinkProps = {
  children: React.ReactElement;
  href: string;
  isLoading?: boolean;
};

export function ThumbLink({ children, href, isLoading }: ThumbLinkProps) {
  if (isLoading) {
    return React.cloneElement(children, { isLoading });
  }

  return (
    <Link href={href} asChild>
      <Touchable>{children}</Touchable>
    </Link>
  );
}
