import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import { IntlMessages } from 'locales';
import * as React from 'react';

type AllTheProvidersProps = {
  children: React.ReactNode;
};

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <IntlMessages>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IntlMessages>
  );
};

const customRender = (ui: React.ReactElement, options?: unknown[]) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
