export const getFontFamily = (weight?: 'bold' | 'regular' | string): string => {
  switch (weight) {
    case 'bold':
      return 'Poppins_600SemiBold';
    case 'regular':
      return 'Poppins_400Regular';
    default:
      return 'Poppins_400Regular';
  }
};
