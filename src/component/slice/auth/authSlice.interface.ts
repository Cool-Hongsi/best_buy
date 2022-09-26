// Auth Data => State X / LocalStorage O

import { NavigateFunction } from 'react-router-dom';

export interface AuthState {
  loading?: boolean;
  error?: Error | null | string;
  isLoggedIn: boolean;
}

export type LoginRequestPayload = {
  email: string;
  password: string;
  navigate: NavigateFunction;
};
