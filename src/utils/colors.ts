import { useTheme } from 'styled-components/native';

export const useTransformColors = () => {
  const theme = useTheme();

  function transformColors(colors) {
    let colorsFormatted = [];

    colors.map((color) => {
      colorsFormatted.push(theme.colors[color] || color);
    });

    return colorsFormatted;
  }

  return transformColors;
};
