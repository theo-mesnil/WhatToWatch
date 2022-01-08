export const getFontFamily = (weight) => {
  switch (weight) {
    case 'bold':
      return 'Poppins_600SemiBold';
    default:
      return 'Poppins_400Regular';
  }
};
