import type { UseQueryResult } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react-native'
import * as React from 'react'

import { IntlMessages } from '~/locales'

type AllTheProvidersProps = {
  children: React.ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  })

  return (
    <IntlMessages>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IntlMessages>
  )
}

const customRender = (ui: React.ReactElement, options?: unknown[]) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'

export function mockQuery<T>(data: T): UseQueryResult<T> {
  return {
    data,
    dataUpdatedAt: 1000000,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 100000,
    failureCount: 0,
    failureReason: null,
    fetchStatus: 'idle',
    isError: false,
    isFetched: true,
    isFetchedAfterMount: false,
    isFetching: false,
    isInitialLoading: false,
    isLoading: false,
    isLoadingError: false,
    isPaused: false,
    isPending: false,
    isPlaceholderData: false,
    isRefetchError: false,
    isRefetching: false,
    isStale: false,
    isSuccess: true,
    // @ts-expect-error (mocking a function)
    promise: jest.fn(() => Promise.resolve({ data })),
    refetch: jest.fn(),
    status: 'success',
  }
}

export { customRender as render }
