import * as React from 'react';
import { Animated, ListRenderItem } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Box, BoxProps } from 'components/Box';
import { Centered } from 'components/Centered';
import { fakeData10 } from 'constants/mocks';
import { screenWidth } from 'constants/screen';

import * as S from './styles';

type ListItem = React.ElementType;

type Item = {
  id?: number;
  index: number;
  media_type?: string;
  name?: string;
  type?: string;
};

export type SpotlightListProps = BoxProps & {
  onPress?: (params: any) => any;
  aspectRatio?: number;
  listItem: ListItem;
  getActiveSlide: (activeSlide: number) => void;
  data?: any;
  keyName: string;
};

export const SpotlightList = React.memo(
  ({
    data,
    getActiveSlide,
    keyName,
    listItem: ListItem,
    onPress,
    ...rest
  }: SpotlightListProps) => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const theme = useTheme();
    const itemPerPage = 1;
    const imageWidth = 780;
    const aspectRatio = 10 / 7;
    const isLoading = !data;
    const dataFormatted = data || fakeData10;
    const marginList = theme.space.lg;
    const width = React.useMemo(
      () => screenWidth - marginList * 2,
      [marginList]
    );

    function handlePress({ index, item }) {
      onPress &&
        onPress({
          id: item?.id,
          type: item?.type || item?.media_type,
          name: item?.name || item?.title,
          index
        });
    }

    const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
      const active = viewableItems?.[0]?.index;

      if (active || active === 0) {
        setActiveSlide(active);
        getActiveSlide(active);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderItem: ListRenderItem<Item> = ({ index, item }) => {
      return (
        <ListItem
          aspectRatio={aspectRatio}
          imageWidth={imageWidth}
          item={item}
          onPress={() => handlePress({ index, item })}
          width={`${width}px`}
          isLoading={isLoading}
          withTitleOnCover
          withBackdropImage
        />
      );
    };

    return (
      <Box {...rest}>
        <Box flex={1}>
          <Animated.FlatList
            initialNumToRender={itemPerPage}
            horizontal
            data={dataFormatted}
            keyExtractor={(item, index) =>
              `${isLoading ? item : item.id}_${keyName}_${index}`
            }
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={S.Separator}
            ListHeaderComponent={S.Separator}
            ListFooterComponent={S.Separator}
            renderItem={renderItem}
            decelerationRate="fast"
            pagingEnabled
            snapToInterval={width + marginList}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 60
            }}
          />
          <Centered flexDirection="row" justifyContent="center" mt="sm">
            {[...Array(data?.length || 5)].map((item, index) => (
              <Box
                key={index}
                width={10}
                height={10}
                borderRadius={10}
                backgroundColor={index === activeSlide ? 'light900' : 'dark400'}
                ml={index === 0 ? undefined : 'md'}
              />
            ))}
          </Centered>
        </Box>
      </Box>
    );
  }
);
