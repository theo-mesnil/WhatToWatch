import type { UseQueryResult } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import { IntlMessages } from 'locales';
import * as React from 'react';

type AllTheProvidersProps = {
  children: React.ReactNode;
};

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false
      }
    }
  });

  return (
    <IntlMessages>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IntlMessages>
  );
};

const customRender = (ui: React.ReactElement, options?: unknown[]) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export function mockQuery<T>(data: T): UseQueryResult<T> {
  return {
    data,
    dataUpdatedAt: 1000000,
    // @ts-ignore
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 100000,
    failureCount: 0,
    // @ts-ignore
    failureReason: null,
    isError: false,
    isFetched: true,
    isFetchedAfterMount: false,
    isFetching: false,
    isLoading: false,
    isLoadingError: false,
    isPaused: false,
    isPending: false,
    isPlaceholderData: false,
    isRefetchError: false,
    isRefetching: false,
    isStale: false,
    isSuccess: true,
    refetch: jest.fn(),
    status: 'success',
    fetchStatus: 'idle',
    isInitialLoading: false
  };
}

export { customRender as render };
