import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import type { paths } from '../api/types';

type User =
  paths['/3/account/{account_id}']['get']['responses']['200']['content']['application/json'];

interface UserContextType {
  isLoading: boolean;
  isLogged: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const setSessionId = async (value?: string) => {
  try {
    if (value) {
      await AsyncStorage.setItem('session-id', value);
    } else {
      await AsyncStorage.removeItem('session-id');
    }
  } catch (e) {
    // saving error
  }
};

const getSessionId = async () => {
  try {
    return await AsyncStorage.getItem('session-id');
  } catch (e) {
    // error reading value
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  let user = null;
  let isLoading = false;
  let isLogged = false;

  const login = async () => {
    alert('Login');
  };

  const logout = () => {
    isLogged = false;
    user = null;
    setSessionId();
  };

  return (
    <UserContext.Provider value={{ user, isLoading, isLogged, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  return context;
}
