import * as React from 'react';
import { Animated, ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Box, BoxProps } from 'components/Box';
import { Text } from 'components/Text';
import { fakeData10 } from 'constants/mocks';
import { screenWidth } from 'constants/screen';

import * as S from './styles';

type Item = {
  id?: number;
  index: number;
  media_type?: string;
  name?: string;
  type?: string;
};

type ListItem = React.ElementType;

export type ListProps = BoxProps & {
  actions?: React.ReactNode;
  onPress?: (params: any) => any;
  aspectRatio?: number;
  data?: any;
  imageWidth?: number;
  itemPerPage?: number;
  autoWidthOnItem?: boolean;
  keyName: string;
  listItem: ListItem;
  pagingEnabled?: boolean;
  title?: React.ReactElement | string;
  withBackdropImage?: boolean;
  withNumber?: boolean;
  withTitleOnCover?: boolean;
  itemProps?: {
    [key: string]: any;
  };
  withMargin?: boolean;
};

export const List = React.memo(
  ({
    actions,
    aspectRatio,
    data,
    imageWidth,
    itemPerPage = 3,
    keyName,
    listItem: ListItem,
    onPress,
    pagingEnabled,
    title,
    withBackdropImage,
    withNumber,
    withTitleOnCover,
    itemProps = {},
    autoWidthOnItem,
    ...rest
  }: ListProps) => {
    const theme = useTheme();
    const isLoading = !data;
    const dataFormatted = data || fakeData10;
    const marginList = theme.space.lg;
    const marginItem = theme.space.sm;
    const width = React.useMemo(
      () =>
        screenWidth / itemPerPage -
        (marginItem - marginItem / itemPerPage) -
        (marginItem + marginItem) / itemPerPage -
        (marginItem + marginList) / itemPerPage,
      [itemPerPage, marginItem, marginList]
    );

    const renderItem: ListRenderItem<Item> = ({ index, item }) => {
      return (
        <ListItem
          aspectRatio={aspectRatio}
          item={item}
          imageWidth={imageWidth}
          onPress={() =>
            onPress &&
            onPress({
              id: item?.id,
              type: item?.type,
              name: item?.name,
              index,
              mediaType: item?.media_type
            })
          }
          isTag={autoWidthOnItem}
          width={!autoWidthOnItem ? `${width}px` : undefined}
          isLoading={isLoading}
          number={!!withNumber && index + 1}
          withTitleOnCover={withTitleOnCover}
          withBackdropImage={withBackdropImage}
          {...itemProps}
        />
      );
    };

    return (
      <Box {...rest}>
        {(!!title || !!actions) && (
          <Box
            flex={1}
            justifyContent="space-between"
            flexDirection="row"
            px="lg"
            mb="sm"
          >
            {!!title && (
              <Text numberOfLines={1} variant="h2">
                {title}
              </Text>
            )}
            {!!actions && (
              <Box flexGrow={0} flexDirection="row" alignItems="center">
                {actions}
              </Box>
            )}
          </Box>
        )}
        <Box flex={1}>
          <Animated.FlatList
            initialNumToRender={itemPerPage + 1}
            horizontal
            data={dataFormatted}
            keyExtractor={(item, index) =>
              `${isLoading ? item : item.id}_${keyName}_${index}`
            }
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={withNumber ? undefined : S.Separator}
            ListHeaderComponent={S.BeforeAndAfter}
            ListFooterComponent={withNumber ? S.BeforeAndAfter : undefined}
            renderItem={renderItem}
            decelerationRate={pagingEnabled ? 'fast' : undefined}
            pagingEnabled={pagingEnabled}
            snapToInterval={pagingEnabled ? width + marginItem / 2 : undefined}
          />
        </Box>
      </Box>
    );
  }
);
