import * as React from 'react';

import { Text } from 'components/Text';
import { Box } from 'components/Box';
import { CheckFillIcon, Icon } from 'components/Icon';
import { Touchable } from 'components/Touchable';

export function Item({ items, title, ...rest }) {
  return (
    <Box backgroundColor="ahead" borderRadius="md" py="xxs" {...rest}>
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
