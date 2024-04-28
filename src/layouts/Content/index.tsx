import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Animated } from 'react-native';

import { BasicLayout } from 'layouts/Basic';

import { Cover } from './Cover';
import { Header } from './Header';

export type ContentLayoutProps = {
  children: React.ReactNode;
  imageUrl?: string;
  isLoading?: boolean;
  subtitle?: string;
  title?: string;
};

export function ContentLayout({
  children,
  imageUrl,
  isLoading,
  subtitle,
  title
}: ContentLayoutProps) {
  const [scrollYPosition, getScrollYPosition] = React.useState(
    new Animated.Value(0)
  );
  const navigation = useNavigation();

  const HeaderComponent = React.useCallback(
    () => <Header title={title} scrollY={scrollYPosition} />,
    [scrollYPosition, title]
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true
    });
  }, [navigation]);

  React.useEffect(() => {
    navigation.setOptions({
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout getScrollYPosition={getScrollYPosition}>
      <Cover
        subtitle={subtitle}
        title={title}
        isLoading={isLoading}
        imageUrl={imageUrl}
      />
      {children}
    </BasicLayout>
  );
}
