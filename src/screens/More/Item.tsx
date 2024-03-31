import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { CheckFillIcon, Icon, IconElement } from 'components/Icon';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';

type Item = Pick<TouchableProps, 'onPress'> & {
  description?: string | JSX.Element;
  icon?: IconElement;
  isCheckable?: boolean;
  isChecked?: boolean;
  key: string;
  name?: string | JSX.Element;
};

type ItemProps = BoxProps & {
  items: Item[];
  title: string | JSX.Element;
};

export function Item({ items, title, ...rest }: ItemProps) {
  return (
    <Box backgroundColor="ahead" py="xxs" {...rest}>
      <Text weight="bold" mt="sm" mb="md" ml="md">
        {title}
      </Text>
      {items?.map((item) => (
        <Box key={item?.key} borderTopWidth="1px" borderTopColor="border">
          <Touchable
            flexDirection="row"
            alignItems="center"
            p="md"
            withoutScale
            onPress={item?.onPress ?? undefined}
          >
            {item?.icon && <Icon color="light400" icon={item.icon} />}
            {item?.isCheckable && (
              <Icon
                color={item?.isChecked ? 'primary300' : 'dark400'}
                icon={CheckFillIcon}
              />
            )}
            <Box ml={(item?.icon || item?.isCheckable) && 'md'}>
              <Text>{item?.name}</Text>
              {item?.description && (
                <Text variant="subtitle1">{item?.description}</Text>
              )}
            </Box>
          </Touchable>
        </Box>
      ))}
    </Box>
  );
}
