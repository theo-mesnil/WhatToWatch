import { Link } from 'expo-router';
import type { LinkProps } from 'expo-router/build/link/Link';
import * as React from 'react';

import { Touchable } from 'components/Touchable';

export type ThumbLinkProps = {
  children: React.ReactElement;
  href: LinkProps['href'];
  isLoading?: boolean;
};

export function ThumbLink({ children, href, isLoading }: ThumbLinkProps) {
  if (isLoading) {
    return React.cloneElement(children, { isLoading });
  }

  return (
    <Link href={href} asChild push>
      <Touchable>{children}</Touchable>
    </Link>
  );
}
