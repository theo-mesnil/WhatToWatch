import { createContext, type PropsWithChildren, useContext } from 'react';

import { useStorageState } from '../hooks/useStorageState';

const SessionContext = createContext<{
  createSession: (token: string) => void;
  isLoading: boolean;
  removeSession: () => void;
  session?: string | null;
}>({
  createSession: () => null,
  removeSession: () => null,
  session: null,
  isLoading: false
});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <SessionContext.Provider
      value={{
        createSession: (token) => {
          setSession(token);
        },
        removeSession: () => {
          setSession(null);
        },
        session,
        isLoading
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
