import React, { memo, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

import { screenWidth } from 'constants/screen';
import { Text } from 'components/Text';
import { Box } from 'components/Box';
import { fakeData10 } from 'constants/mocks';

export const List = memo(
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
    ...rest
  }) => {
    const theme = useTheme();
    const isLoading = !data;
    const dataFormatted = data || fakeData10;
    const marginList = theme.space.lg;
    const marginItem = theme.space.sm;
    const width = useMemo(
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
          snapToAlignment: 'start',
          snapToInterval: width + marginItem / 2,
          decelerationRate: 'fast'
        }
      : {};

    function renderItem({ index, item }) {
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
          width={`${width}px`}
          isLoading={isLoading}
          number={!!withNumber && index + 1}
          withTitleOnCover={withTitleOnCover}
          withBackdropImage={withBackdropImage}
        />
      );
    }

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
          <Text numberOfLines={1} variant="h2">
            {title}
          </Text>
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
