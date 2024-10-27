const Link = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const useNavigation = jest.fn().mockReturnValue({ setOptions: jest.fn() });
const useLocalSearchParams = jest.fn().mockReturnValue({ id: '1' });

export { Link, useNavigation, useLocalSearchParams };
