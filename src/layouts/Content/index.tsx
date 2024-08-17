import { useNavigation } from 'expo-router';
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Text } from 'components/Text';
import { COVER_HEIGHT } from 'constants/cover';
import { BasicLayout } from 'layouts/Basic';

import { Cover } from './Cover';
import { Header } from './Header';

export type ContentLayoutProps = {
  badges?: React.ReactNode;
  children: React.ReactNode;
  imageUrl?: string;
  isLoading?: boolean;
  isPersonContent?: boolean;
  logo?: {
    aspectRatio: number;
    url: string;
  };
  subtitle?: string;
  title?: string;
};

export function ContentLayout({
  badges,
  children,
  imageUrl,
  isLoading,
  isPersonContent,
  logo,
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
      header: HeaderComponent
    });
  }, [HeaderComponent, navigation]);

  return (
    <BasicLayout
      getScrollYPosition={getScrollYPosition}
      contentContainerStyle={{ paddingBottom: theme.space.xl }}
    >
      <Cover
        isLoading={isLoading}
        imageUrl={imageUrl}
        title={title}
        logo={logo}
        isPerson={isPersonContent}
      />
      <View style={styles.infos}>
        {badges && <View style={styles.badges}>{badges}</View>}
        {subtitle && <Text testID="subtitle">{subtitle}</Text>}
      </View>
      {children}
    </BasicLayout>
  );
}

const styles = StyleSheet.create({
  infos: {
    marginTop: COVER_HEIGHT + theme.space.lg,
    paddingHorizontal: theme.space.xxl,
    paddingBottom: theme.space.lg,
    alignItems: 'center',
    gap: theme.space.sm
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.space.xs
  }
});
