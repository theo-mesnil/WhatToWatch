import * as React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
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
  title?: React.ReactElement;
  withBackdropImage?: boolean;
  withNumber?: boolean;
  withTitleOnCover?: boolean;
  itemProps?: {
    [key: string]: any;
  };
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
    const propsForPagingEnabled = pagingEnabled
      ? {
          pagingEnabled: true,
          snapToInterval: width + marginItem / 2
        }
      : {};

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
      <>
        <Box
          flex={1}
          justifyContent="space-between"
          flexDirection="row"
          px="lg"
          mb="sm"
          {...rest}
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
        <Box flex={1}>
          <FlatList
            initialNumToRender={itemPerPage + 1}
            horizontal
            data={dataFormatted}
            keyExtractor={(item, index) =>
              `${isLoading ? item : item.id}_${keyName}_${index}`
            }
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={S.Separator}
            ListHeaderComponent={S.BeforeAndAfter}
            ListFooterComponent={S.BeforeAndAfter}
            renderItem={renderItem}
            {...propsForPagingEnabled}
          />
        </Box>
      </>
    );
  }
);
