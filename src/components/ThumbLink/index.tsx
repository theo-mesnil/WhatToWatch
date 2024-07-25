import { Link } from 'expo-router';
import type { LinkProps } from 'expo-router/build/link/Link';
import * as React from 'react';

import type { TouchableProps } from 'components/Touchable';
import { Touchable } from 'components/Touchable';

export type ThumbLinkProps = Pick<TouchableProps, 'style'> & {
  children: React.ReactElement;
  href: LinkProps['href'];
  isLoading?: boolean;
};

export function ThumbLink({
  children,
  href,
  isLoading,
  style
}: ThumbLinkProps) {
  if (isLoading) {
    return React.cloneElement(children, { isLoading, style });
  }

  return (
    <Link href={href} asChild push>
      <Touchable style={style}>{children}</Touchable>
    </Link>
  );
}
